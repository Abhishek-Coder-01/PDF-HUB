from flask import Flask, request, send_file, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

from pypdf import PdfReader, PdfWriter
import fitz  # PyMuPDF

import os
import tempfile
import shutil
import subprocess
import uuid
import zipfile
import platform

from docx2pdf import convert
from pdf2docx import Converter

# Only available on Windows
if platform.system() == "Windows":
    import pythoncom

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = tempfile.mkdtemp(prefix="flask_upload_")
STATIC_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "static", "temp")
ALLOWED_EXTENSIONS = {"docx", "doc"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16MB max file size
os.makedirs(STATIC_FOLDER, exist_ok=True)

# Ghostscript detect (Windows + Linux)
if platform.system() == "Windows":
    GS_PATH = shutil.which("gswin64c") or shutil.which("gs")
else:
    GS_PATH = shutil.which("gs")


def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def lock_pdf(input_pdf, output_pdf, password):
    if GS_PATH is None:
        raise RuntimeError("Ghostscript not installed. Please install it first.")

    try:
        subprocess.run(
            [
                GS_PATH,
                "-sDEVICE=pdfwrite",
                "-dCompatibilityLevel=1.4",
                "-dNOPAUSE",
                "-dBATCH",
                f"-sOutputFile={output_pdf}",
                f"-sUserPassword={password}",
                f"-sOwnerPassword={password}",
                "-dEncryptionR=3",
                "-dKeyLength=128",
                "-dPermissions=-3904",
                input_pdf,
            ],
            check=True,
            capture_output=True,
            text=True,
        )
    except subprocess.CalledProcessError as e:
        raise Exception(f"PDF locking failed: {e.stderr or str(e)}")


def unlock_pdf(input_pdf, output_pdf, password):
    if GS_PATH is None:
        raise RuntimeError("Ghostscript not installed. Please install it first.")

    try:
        subprocess.run(
            [
                GS_PATH,
                "-sDEVICE=pdfwrite",
                "-dCompatibilityLevel=1.4",
                "-dNOPAUSE",
                "-dBATCH",
                f"-sPDFPassword={password}",
                f"-sOutputFile={output_pdf}",
                input_pdf,
            ],
            check=True,
            capture_output=True,
            text=True,
        )
    except subprocess.CalledProcessError:
        raise Exception("PDF unlocking failed: Wrong password or corrupted PDF")


def compress_pdf(input_pdf, output_pdf):
    if GS_PATH is None:
        raise RuntimeError("Ghostscript not installed. Please install it first.")

    try:
        subprocess.run(
            [
                GS_PATH,
                "-sDEVICE=pdfwrite",
                "-dCompatibilityLevel=1.4",
                "-dPDFSETTINGS=/screen",
                "-dNOPAUSE",
                "-dBATCH",
                "-dDownsampleColorImages=true",
                "-dColorImageResolution=72",
                "-dGrayImageResolution=72",
                "-dMonoImageResolution=72",
                f"-sOutputFile={output_pdf}",
                input_pdf,
            ],
            check=True,
            capture_output=True,
            text=True,
        )
    except subprocess.CalledProcessError as e:
        raise Exception(f"PDF compression failed: {e.stderr or str(e)}")


@app.route("/")
def home():
    return "Backend is working"


@app.route("/static/temp/<path:filename>")
def serve_temp_file(filename):
    return send_from_directory(STATIC_FOLDER, filename)


# ========== DOC/DOCX -> PDF ==========
@app.route("/convert", methods=["POST"])
def convert_to_pdf():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid file type. Only .docx and .doc files are allowed"}), 400

        uid = str(uuid.uuid4())
        filename = secure_filename(file.filename)

        input_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_{filename}")
        output_filename = os.path.splitext(filename)[0] + ".pdf"
        output_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_{output_filename}")

        file.save(input_path)

        # docx2pdf works best on Windows (uses Word). On Linux it typically requires MS Word
        # or may fail depending on environment. Keep try/except to report cleanly.
        if platform.system() == "Windows":
            pythoncom.CoInitialize()
            try:
                convert(input_path, output_path)
            finally:
                pythoncom.CoUninitialize()
        else:
            # Still attempt; may fail depending on deployment environment
            convert(input_path, output_path)

        response = send_file(
            output_path,
            as_attachment=True,
            download_name=output_filename,
            mimetype="application/pdf",
        )

        @response.call_on_close
        def cleanup():
            for p in (input_path, output_path):
                try:
                    if os.path.exists(p):
                        os.remove(p)
                except:
                    pass

        return response

    except Exception as e:
        return jsonify({"error": f"Conversion failed: {str(e)}"}), 500


# ========== PDF Lock ==========
@app.route("/lock", methods=["POST"])
def lock_pdf_route():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        password = request.form.get("password")
        if not password:
            return jsonify({"error": "Password required"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        if not file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Only PDF files are supported"}), 400

        uid = str(uuid.uuid4())
        filename = secure_filename(file.filename)
        input_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_input.pdf")
        output_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_locked.pdf")

        file.save(input_path)
        lock_pdf(input_path, output_path, password)

        response = send_file(
            output_path,
            as_attachment=True,
            download_name=f"locked_{filename}",
            mimetype="application/pdf",
        )

        @response.call_on_close
        def cleanup():
            for p in (input_path, output_path):
                try:
                    if os.path.exists(p):
                        os.remove(p)
                except:
                    pass

        return response

    except Exception as e:
        return jsonify({"error": f"PDF locking failed: {str(e)}"}), 500


# ========== PDF Unlock ==========
@app.route("/unlock", methods=["POST"])
def unlock_pdf_route():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        password = request.form.get("password")
        if not password:
            return jsonify({"error": "Password required"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        if not file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Only PDF files are supported"}), 400

        uid = str(uuid.uuid4())
        filename = secure_filename(file.filename)
        input_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_locked.pdf")
        output_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_unlocked.pdf")

        file.save(input_path)

        try:
            unlock_pdf(input_path, output_path, password)
        except Exception:
            try:
                if os.path.exists(input_path):
                    os.remove(input_path)
            except:
                pass
            return jsonify({"error": "Wrong password or corrupted PDF. Try again!"}), 400

        response = send_file(
            output_path,
            as_attachment=True,
            download_name=f"unlocked_{filename}",
            mimetype="application/pdf",
        )

        @response.call_on_close
        def cleanup():
            for p in (input_path, output_path):
                try:
                    if os.path.exists(p):
                        os.remove(p)
                except:
                    pass

        return response

    except Exception as e:
        return jsonify({"error": f"PDF unlock failed: {str(e)}"}), 500


# ========== PDF Compress ==========
@app.route("/compress", methods=["POST"])
def compress_pdf_route():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        if not file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Only PDF files are supported"}), 400

        uid = str(uuid.uuid4())
        filename = secure_filename(file.filename)
        input_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_input.pdf")
        output_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_compressed.pdf")

        file.save(input_path)
        compress_pdf(input_path, output_path)

        if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
            return jsonify({"error": "Compression failed: Output file is empty"}), 500

        response = send_file(
            output_path,
            as_attachment=True,
            download_name=f"compressed_{filename}",
            mimetype="application/pdf",
        )

        @response.call_on_close
        def cleanup():
            for p in (input_path, output_path):
                try:
                    if os.path.exists(p):
                        os.remove(p)
                except:
                    pass

        return response

    except Exception as e:
        return jsonify({"error": f"PDF compression failed: {str(e)}"}), 500


# ========== PDF ZIP ==========
@app.route("/zip", methods=["POST"])
def zip_pdf():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        if not file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Only PDF files allowed"}), 400

        uid = str(uuid.uuid4())
        filename = secure_filename(file.filename)

        pdf_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_{filename}")
        zip_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}.zip")

        file.save(pdf_path)

        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            zipf.write(pdf_path, arcname=filename)

        response = send_file(
            zip_path,
            as_attachment=True,
            download_name=f"{os.path.splitext(filename)[0]}.zip",
            mimetype="application/zip",
        )

        @response.call_on_close
        def cleanup():
            for p in (pdf_path, zip_path):
                try:
                    if os.path.exists(p):
                        os.remove(p)
                except:
                    pass

        return response

    except Exception as e:
        return jsonify({"error": f"Zipping failed: {str(e)}"}), 500


# ========== Remove pages PDF ==========
@app.route("/remove-pages", methods=["POST"])
def remove_pages_route():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        pages_input = request.form.get("pages")  # e.g. 1,3,5-7

        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        if not file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Only PDF files allowed"}), 400

        if not pages_input:
            return jsonify({"error": "Pages not specified"}), 400

        uid = str(uuid.uuid4())
        filename = secure_filename(file.filename)

        input_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_input.pdf")
        output_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_output.pdf")

        file.save(input_path)

        reader = PdfReader(input_path)
        writer = PdfWriter()
        total_pages = len(reader.pages)

        # Parse pages like: 1,3,5-7  (1-based input)
        pages_to_remove = set()
        for part in pages_input.split(","):
            part = part.strip()
            if not part:
                continue
            if "-" in part:
                start_s, end_s = part.split("-", 1)
                start = int(start_s)
                end = int(end_s)
                if start < 1 or end < 1 or start > end:
                    return jsonify({"error": f"Invalid range: {part}"}), 400
                pages_to_remove.update(range(start - 1, end))
            else:
                p = int(part)
                if p < 1:
                    return jsonify({"error": f"Invalid page: {part}"}), 400
                pages_to_remove.add(p - 1)

        # bounds check
        if any(p < 0 or p >= total_pages for p in pages_to_remove):
            return jsonify({"error": "Page range out of bounds"}), 400

        for i in range(total_pages):
            if i not in pages_to_remove:
                writer.add_page(reader.pages[i])

        if len(writer.pages) == 0:
            return jsonify({"error": "All pages removed"}), 400

        with open(output_path, "wb") as f:
            writer.write(f)

        response = send_file(
            output_path,
            as_attachment=True,
            download_name=f"removed_pages_{filename}",
            mimetype="application/pdf",
        )

        @response.call_on_close
        def cleanup():
            for p in (input_path, output_path):
                try:
                    if os.path.exists(p):
                        os.remove(p)
                except:
                    pass

        return response

    except Exception as e:
        return jsonify({"error": f"Removal failed: {str(e)}"}), 500


# ========== PDF text replace ==========
@app.route("/pdf-text-replace", methods=["POST"])
def pdf_text_replace():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        old_text = request.form.get("old_text")
        new_text = request.form.get("new_text", "")

        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        if not file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Only PDF files are supported"}), 400

        if not old_text:
            return jsonify({"error": "Old text is required"}), 400

        uid = str(uuid.uuid4())
        filename = secure_filename(file.filename)
        input_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_input.pdf")
        output_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_replaced.pdf")

        file.save(input_path)

        doc = fitz.open(input_path)
        text_found = False

        for page in doc:
            instances = page.search_for(old_text)
            if instances:
                text_found = True

            for rect in instances:
                page.draw_rect(rect, color=None, fill=(1, 1, 1))
                height = rect.y1 - rect.y0
                page.insert_text(
                    (rect.x0, rect.y0 + height * 0.75),
                    new_text,
                    fontsize=11,
                    color=(0, 0, 0),
                )

        if not text_found:
            doc.close()
            try:
                os.remove(input_path)
            except:
                pass
            return jsonify({"error": f'Invalid Text: "{old_text}" not found in the PDF'}), 400

        doc.save(output_path, garbage=4, deflate=True)
        doc.close()

        if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
            return jsonify({"error": "Text replacement failed: Output file is empty"}), 500

        response = send_file(
            output_path,
            as_attachment=True,
            download_name=f"replaced_{filename}",
            mimetype="application/pdf",
        )

        @response.call_on_close
        def cleanup():
            for p in (input_path, output_path):
                try:
                    if os.path.exists(p):
                        os.remove(p)
                except:
                    pass

        return response

    except Exception as e:
        return jsonify({"error": f"PDF text replacement failed: {str(e)}"}), 500


# ========== PDF TO WORD ==========
@app.route("/pdf-to-word", methods=["POST"])
def pdf_to_word():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        if not file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Only PDF files are supported"}), 400

        uid = str(uuid.uuid4())
        filename = secure_filename(file.filename)
        pdf_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_input.pdf")
        docx_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}_output.docx")

        file.save(pdf_path)

        cv = Converter(pdf_path)
        cv.convert(docx_path)
        cv.close()

        if not os.path.exists(docx_path) or os.path.getsize(docx_path) == 0:
            return jsonify({"error": "Conversion failed: Output file is empty"}), 500

        output_filename = os.path.splitext(filename)[0] + ".docx"
        response = send_file(
            docx_path,
            as_attachment=True,
            download_name=output_filename,
            mimetype="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        )

        @response.call_on_close
        def cleanup():
            for p in (pdf_path, docx_path):
                try:
                    if os.path.exists(p):
                        os.remove(p)
                except:
                    pass

        return response

    except Exception as e:
        return jsonify({"error": f"PDF to Word conversion failed: {str(e)}"}), 500


# ========== PDF TO IMAGE ==========
@app.route("/pdf-to-image", methods=["POST"])
def pdf_to_image():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        pages_input = request.form.get("pages")  # expects "1-5"
        download_type = request.form.get("download", "zip")  # "png" or "zip"

        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        if not file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Only PDF files allowed"}), 400

        uid = str(uuid.uuid4())
        filename = secure_filename(file.filename)

        pdf_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}.pdf")
        output_dir = os.path.join(STATIC_FOLDER, uid)
        zip_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{uid}.zip")

        os.makedirs(output_dir, exist_ok=True)
        file.save(pdf_path)

        doc = fitz.open(pdf_path)
        total_pages = len(doc)

        start_page = 1
        end_page = total_pages

        if pages_input:
            try:
                a, b = pages_input.split("-", 1)
                start_page = int(a)
                end_page = int(b)
            except:
                doc.close()
                return jsonify({"error": "Invalid page range (use 1-5)"}), 400

            if start_page < 1 or end_page > total_pages or start_page > end_page:
                doc.close()
                return jsonify({"error": "Page range out of bounds"}), 400

        zoom = 2
        mat = fitz.Matrix(zoom, zoom)

        images = []
        image_names = []

        for page_num in range(start_page - 1, end_page):
            page = doc.load_page(page_num)
            pix = page.get_pixmap(matrix=mat)

            img_filename = f"page_{page_num + 1}.png"
            img_path = os.path.join(output_dir, img_filename)
            pix.save(img_path)

            images.append(img_path)
            image_names.append(f"{uid}/{img_filename}")

        doc.close()

        if download_type == "png":
            image_urls = [f"/static/temp/{name}" for name in image_names]

            # remove only PDF; keep images temporarily
            try:
                if os.path.exists(pdf_path):
                    os.remove(pdf_path)
            except:
                pass

            return jsonify({"images": image_urls, "total": len(image_urls)})

        # ZIP / direct image download
        if len(images) == 1:
            response = send_file(
                images[0],
                as_attachment=True,
                download_name=os.path.basename(images[0]),
                mimetype="image/png",
            )
        else:
            with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
                for img in images:
                    zipf.write(img, arcname=os.path.basename(img))

            base_filename = os.path.splitext(filename)[0]
            response = send_file(
                zip_path,
                as_attachment=True,
                download_name=f"{base_filename}_images.zip",
                mimetype="application/zip",
            )

        @response.call_on_close
        def cleanup():
            for p in (pdf_path, zip_path):
                try:
                    if os.path.exists(p):
                        os.remove(p)
                except:
                    pass
            try:
                if os.path.exists(output_dir):
                    shutil.rmtree(output_dir)
            except:
                pass

        return response

    except Exception as e:
        return jsonify({"error": f"pdf-to-image conversion failed: {str(e)}"}), 500


@app.route("/health")
def health():
    return jsonify({"status": "healthy"}), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
