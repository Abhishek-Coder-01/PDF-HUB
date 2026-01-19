import "./Dashboard.css";
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import mammoth from 'mammoth';
import html2canvas from 'html2canvas';
import { VscLoading } from "react-icons/vsc";
// ========== UTILITY FUNCTIONS ==========

// Multiple images ko PDF mein convert karna
const convertMultipleImagesToPDF = async (files) => {
    const pdf = new jsPDF();
    let isFirstPage = true;

    for (const file of files) {
        const img = await loadImage(file);

        if (!isFirstPage) {
            pdf.addPage();
        }

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgRatio = img.width / img.height;
        const pageRatio = pageWidth / pageHeight;

        let finalWidth, finalHeight;

        if (imgRatio > pageRatio) {
            finalWidth = pageWidth;
            finalHeight = pageWidth / imgRatio;
        } else {
            finalHeight = pageHeight;
            finalWidth = pageHeight * imgRatio;
        }

        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;

        pdf.addImage(img.src, 'JPEG', x, y, finalWidth, finalHeight);
        isFirstPage = false;
    }

    return pdf.output('blob');
};

// Image load helper
const loadImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// PDF Merge function
const mergePDFs = async (files) => {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    return await mergedPdf.save();
};

// PDF Split function
const splitPDF = async (file, pageRanges) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const results = [];

    for (const range of pageRanges) {
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(pdfDoc, range);
        pages.forEach(page => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        results.push({
            blob: new Blob([pdfBytes], { type: 'application/pdf' }),
            name: `split_${range.join('-')}.pdf`
        });
    }

    return results;
};

// Word to PDF conversion - Backend API call
const wordToPDF = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:5000/convert", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Word to PDF conversion failed');
    }

    return await response.blob();
};

// PDF to Word conversion - Backend API call
const pdfToWord = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:5000/pdf-to-word", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'PDF to Word conversion failed');
    }

    return await response.blob();
};



// Compress PDF
// Compress PDF - Backend API call
const compressPDF = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:5000/compress", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'PDF compression failed');
    }

    return await response.blob();
};



// zip PDF
// zip PDF with password - Backend API call
const zipfile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);


    const response = await fetch("http://127.0.0.1:5000/zip", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'PDF zip failed');
    }

    return await response.blob();
};



// remove page pdf
// remove PDF pages - Backend API call
const removePDFPages = async (file) => {
    const formData = new FormData();
    formData.append("file", file);


    const response = await fetch("http://127.0.0.1:5000/remove", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'PDF removal failed');
    }

    return await response.blob();
};

// PDF Text Replace - Backend API call
const pdfTextReplace = async (file, oldText, newText) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("old_text", oldText);
    formData.append("new_text", newText);

    const response = await fetch("http://127.0.0.1:5000/pdf-text-replace", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'PDF text replacement failed');
    }

    return await response.blob();
};



// pdf to image
// pdf to image - Backend API call
// PDF to Image conversion - Backend API call
const pdfToImage = async (file, pages, downloadType) => {
    const formData = new FormData();
    formData.append("file", file);
    if (pages) formData.append("pages", pages);
    formData.append("download", downloadType);

    const response = await fetch("http://127.0.0.1:5000/pdf-to-image", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'PDF to image conversion failed');
    }

    // Check if response is JSON (individual files) or blob (ZIP)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json(); // Returns {images: [...]}
    } else {
        return await response.blob(); // Returns ZIP blob
    }
};




// Lock PDF with password
// Lock PDF with password - Backend API call
const lockPDF = async (file, password) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    const response = await fetch("http://127.0.0.1:5000/lock", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'PDF locking failed');
    }

    return await response.blob();
};

// Unlock PDF
// Unlock PDF with password - Backend API call
const unlockPDF = async (file, password) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    const response = await fetch("http://127.0.0.1:5000/unlock", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'PDF unlocking failed');
    }

    return await response.blob();
};



// ========== MODAL COMPONENTS ==========

// Image to PDF Modal
function ImageToPDFModal({ onClose }) {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [processedFile, setProcessedFile] = useState(null);

    const handleFiles = (files) => {
        const imageFiles = Array.from(files).filter(f =>
            f.type.startsWith('image/')
        );

        if (imageFiles.length === 0) {
            alert("Kripya sirf image files select karein!");
            return;
        }

        setSelectedFiles((prev) => [...prev, ...imageFiles]);
    };


    const convertToPDF = async () => {
        if (selectedFiles.length === 0) return;

        setIsProcessing(true);
        try {
            const pdfBlob = await convertMultipleImagesToPDF(selectedFiles);
            const pdfUrl = URL.createObjectURL(pdfBlob);

            setProcessedFile({
                url: pdfUrl,
                name: `images_${Date.now()}.pdf`,
                blob: pdfBlob
            });
        } catch (error) {
            alert("Error: " + error.message);
        }
        setIsProcessing(false);
    };

    const handleDownload = () => {
        saveAs(processedFile.blob, processedFile.name);
    };

    const reset = () => {
        if (processedFile) URL.revokeObjectURL(processedFile.url);
        setProcessedFile(null);
        setSelectedFiles([]);
    };

    // image remove on select file
    const removeFile = (index) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index)
        );
    };


    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl">✕</button>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    <i className="fas fa-image text-green-500 mr-2"></i>
                    Image to PDF Converter
                </h3>

                {!processedFile ? (
                    <>
                        <div
                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging ? 'border-green-500 bg-blue-50 dark:bg-blue-900/30' : 'border-green-300 dark:border-green-700'
                                }`}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragging(false);
                                handleFiles(e.dataTransfer.files);
                            }}
                        >
                            <i className="fas fa-image text-5xl text-green-500 mb-4"></i>
                            <p className="font-semibold mb-2 dark:text-white">Drag & Drop Multiple Images</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">or click to browse</p>
                            <button className="flex items-center justify-center gap-2
                           text-white px-6 py-2 mx-auto mt-4
                              rounded-lg transition-all
                           bg-green-500 dark:bg-green-600
    hover:bg-green-600 dark:hover:bg-green-700"><i class="fa-solid fa-image"></i>Select Images</button>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                ref={fileInputRef}
                                className="hidden"
                                onChange={(e) => handleFiles(e.target.files)}
                            />
                        </div>

                        {selectedFiles.length > 0 && (
                            <div className="mt-6">
                                <p className="font-semibold mb-3 dark:text-white">{selectedFiles.length} images selected:</p>
                                <div className="max-h-40 overflow-y-auto space-y-2 mb-4">
                                    {selectedFiles.map((file, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded">
                                            <i className="fas fa-image text-green-500"></i>
                                            <span className="flex-1 truncate dark:text-gray-200">{file.name}</span>
                                            <span className="text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                                            <span onClick={() => removeFile(idx)} className="text-gray-400 dark:text-gray-500 cursor-pointer text-[17px] hover:scale-105 transition duration-200"><i className="fa-solid fa-trash-arrow-up text-red-500"></i>
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={convertToPDF}
                                    disabled={isProcessing}
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600
                                       text-white font-semibold py-3 rounded-lg
                                       hover:shadow-lg transition-all disabled:opacity-50"
                                >
                                    <span className="flex items-center justify-center">
                                        {isProcessing ? (
                                            <>
                                                <VscLoading className="animate-spin mr-2" />
                                                Downloading...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-file-pdf mr-2"></i>
                                                Convert to PDF
                                            </>
                                        )}
                                    </span>
                                </button>

                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-8">
                        <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                        <h4 className="text-xl font-bold mb-2 dark:text-white">PDF Ready!</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">{processedFile.name}</p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">
                            <button
                                onClick={handleDownload}
                                className="w-full sm:w-auto flex items-center justify-center
               bg-gradient-to-r from-green-500 to-green-600
               dark:from-green-600 dark:to-green-700
               text-white px-6 py-3 rounded-lg font-semibold
               hover:shadow-lg transition-all"
                            >
                                <i className="fas fa-download mr-2"></i>
                                Download PDF
                            </button>

                            <button
                                onClick={reset}
                                className="w-full sm:w-auto flex items-center justify-center
               bg-gray-200 dark:bg-gray-700
               text-gray-700 dark:text-gray-200
               px-6 py-3 rounded-lg font-semibold
               hover:bg-gray-300 dark:hover:bg-gray-600
               transition-all"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Convert Another
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

// Merge PDF Modal
function MergePDFModal({ onClose }) {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedFile, setProcessedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (files) => {
        const pdfFiles = Array.from(files).filter(f => f.type === 'application/pdf');
        if (pdfFiles.length === 0) {
            alert("Kripya sirf PDF files select karein!");
            return;
        }
        setSelectedFiles(prev => [...prev, ...pdfFiles]);
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const mergePDFFiles = async () => {
        if (selectedFiles.length < 2) {
            alert("Kam se kam 2 PDF files select karein!");
            return;
        }

        setIsProcessing(true);
        try {
            const mergedBytes = await mergePDFs(selectedFiles);
            const blob = new Blob([mergedBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            setProcessedFile({
                url,
                name: `merged_${Date.now()}.pdf`,
                blob
            });
        } catch (error) {
            alert("Merge error: " + error.message);
        }
        setIsProcessing(false);
    };

    const handleDownload = () => {
        saveAs(processedFile.blob, processedFile.name);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl z-10">✕</button>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    <i className="fas fa-object-group text-purple-500 mr-2"></i>
                    Merge PDF Files
                </h3>

                {!processedFile ? (
                    <>
                        <div
                            className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 cursor-pointer transition-all ${isDragging
                                ? 'border-purple-500 bg-blue-50 dark:bg-blue-900/30'
                                : 'border-purple-300 dark:border-purple-700'
                                }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                            }}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragging(false);
                                handleFiles(e.dataTransfer.files);
                            }}
                        >

                            {/* TOP ICON */}
                            <div className="flex justify-center mb-4">
                                <i className="fa-solid fa-file-pdf text-5xl text-purple-500"></i>
                            </div>

                            <p className="font-semibold mb-2 dark:text-white">Drag & Drop PDF Files Here</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to browse</p>

                            {/* BUTTON */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                className="flex items-center justify-center gap-2
               bg-purple-500 dark:bg-purple-600 text-white px-6 py-2
               mx-auto mt-4
               rounded-lg hover:bg-purple-600 dark:hover:bg-purple-700 transition-all"
                            >
                                <i className="fa-solid fa-file-circle-plus"></i>
                                Select PDF Files
                            </button>

                            {/* INPUT */}
                            <input
                                type="file"
                                accept="application/pdf"
                                multiple
                                ref={fileInputRef}
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        handleFiles(e.target.files);
                                        e.target.value = '';
                                    }
                                }}
                            />
                        </div>


                        {selectedFiles.length > 0 && (
                            <>
                                <div className="mb-6">
                                    <p className="font-semibold mb-3 dark:text-white">Selected PDFs ({selectedFiles.length}):</p>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {selectedFiles.map((file, idx) => (
                                            <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                                <span className="w-8 h-8 bg-purple-500 dark:bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                                                    {idx + 1}
                                                </span>
                                                <i className="fas fa-file-pdf text-red-500"></i>
                                                <span className="flex-1 truncate dark:text-gray-200">{file.name}</span>
                                                <button
                                                    onClick={() => removeFile(idx)}
                                                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                                >
                                                    <i className="fa-solid fa-trash-arrow-up text-red-500 hover:scale-105 transition duration-200"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={mergePDFFiles}
                                    disabled={isProcessing || selectedFiles.length < 2}
                                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
                                >
                                    {isProcessing ? (
                                        <>
                                            <VscLoading className="animate-spin mr-2" />
                                            <span>Merging PDFs...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-compress-arrows-alt mr-2"></i>
                                            <span>Merge {selectedFiles.length} PDFs</span>
                                        </>
                                    )}
                                </button>

                            </>
                        )}
                    </>
                ) : (
                    <div className="text-center py-6 sm:py-8 px-4">
                        {/* Success Icon */}
                        <i className="fas fa-check-circle text-5xl sm:text-6xl text-green-500 mb-4"></i>

                        {/* Title */}
                        <h4 className="text-lg sm:text-xl font-bold mb-2 dark:text-white">
                            PDFs Merged Successfully!
                        </h4>

                        {/* File name */}
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 break-all">
                            {processedFile.name}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <button
                                onClick={handleDownload}
                                className="w-full sm:w-auto flex items-center justify-center
        bg-gradient-to-r from-green-500 to-green-600
        dark:from-green-600 dark:to-green-700
        text-white px-5 sm:px-6 py-3 rounded-lg font-semibold
        hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                <i className="fas fa-download mr-2"></i>
                                Download PDF
                            </button>

                            <button
                                onClick={() => {
                                    URL.revokeObjectURL(processedFile.url);
                                    setProcessedFile(null);
                                    setSelectedFiles([]);
                                }}
                                className="w-full sm:w-auto flex items-center justify-center
        bg-gray-200 dark:bg-gray-700
        text-gray-700 dark:text-gray-200
        px-5 sm:px-6 py-3 rounded-lg font-semibold
        hover:bg-gray-300 dark:hover:bg-gray-600
        focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Merge More
                            </button>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
}

// Split PDF Modal
function SplitPDFModal({ onClose }) {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [splitRanges, setSplitRanges] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedFiles, setProcessedFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = async (file) => {
        if (file.type !== 'application/pdf') {
            alert("Kripya PDF file select karein!");
            return;
        }

        setSelectedFile(file);

        // Get page count
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setPageCount(pdfDoc.getPageCount());
    };

    const splitPDFFile = async () => {
        if (!selectedFile || !splitRanges.trim()) {
            alert("Please provide split ranges (e.g., 1-3, 4-6, 7-10)");
            return;
        }

        setIsProcessing(true);
        try {
            // Parse ranges: "1-3, 4-6" -> [[0,1,2], [3,4,5]]
            const ranges = splitRanges.split(',').map(range => {
                const [start, end] = range.trim().split('-').map(n => parseInt(n) - 1);
                const pageIndices = [];
                for (let i = start; i <= (end || start); i++) {
                    if (i >= 0 && i < pageCount) pageIndices.push(i);
                }
                return pageIndices;
            }).filter(r => r.length > 0);

            const results = await splitPDF(selectedFile, ranges);
            setProcessedFiles(results);
        } catch (error) {
            alert("Split error: " + error.message);
        }
        setIsProcessing(false);
    };

    const downloadAll = () => {
        processedFiles.forEach(file => {
            saveAs(file.blob, file.name);
        });
    };

    const splitConfig = {
        icon: 'fa-cut',
        color: 'orange',
        title: 'Split PDF'
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl">✕</button>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    <i className={`
                        fa ${splitConfig.icon} text-${splitConfig.color}-500 mr-2
                        `}></i>
                    {splitConfig.title}
                </h3>

                {processedFiles.length === 0 ? (
                    <>
                        {!selectedFile ? (
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging
                                    ? 'border-orange-500 bg-blue-50 dark:bg-blue-900/30'
                                    : 'border-orange-300 dark:border-orange-700'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]);
                                }}
                            >


                                <i className="fa fa-cut text-5xl text-orange-500 mb-4"></i>

                                <p className="font-semibold mb-2 dark:text-white">Drag & Drop PDF File Here</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to browse</p>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                    className="flex items-center justify-center gap-2
               bg-orange-500 dark:bg-orange-600 text-white px-6 py-2
               mx-auto mt-4
               rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition"
                                >
                                    <i className="fa-solid fa-file-arrow-up"></i>
                                    Select PDF File
                                </button>


                                <input
                                    type="file"
                                    accept="application/pdf"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files[0]) {
                                            handleFile(e.target.files[0]);
                                            e.target.value = '';
                                        }
                                    }}
                                />
                            </div>

                        ) : (
                            <div>
                                <div className="relative bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-4 rounded-xl mb-4 shadow-sm">
                                    <button
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setPageCount(0);
                                            setSplitRanges('');
                                        }}
                                        className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-transform hover:scale-110"
                                        title="Remove file"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                    <div className="flex items-center gap-3 sm:gap-4 w-full max-w-full">
                                        {/* Icon */}
                                        <i className="fas fa-file-pdf text-orange-500 text-2xl sm:text-2xl md:text-3xl lg:text-4xl flex-shrink-0" />

                                        {/* Text Content */}
                                        <div className="flex flex-col min-w-0">
                                            <p className="font-semibold text-sm sm:text-sm md:text-base truncate dark:text-gray-100">
                                                {selectedFile.name}
                                            </p>

                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                Total {pageCount} Pages
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                <div className="mb-4">
                                    <label className="block font-semibold mb-2 dark:text-white">
                                        Enter Page Ranges:
                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(e.g., 1-3, 4-6, 7-10)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={splitRanges}
                                        onChange={(e) => setSplitRanges(e.target.value)}
                                        placeholder="1-3, 4-6, 7-10"
                                        className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:border-orange-500 dark:focus:border-orange-500 outline-none dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                <button
                                    onClick={splitPDFFile}
                                    disabled={isProcessing}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500
             text-white font-semibold py-3 rounded-lg
             hover:shadow-lg disabled:opacity-50"
                                >
                                    <span className="flex items-center justify-center">
                                        {isProcessing ? (
                                            <>
                                                <VscLoading className="animate-spin mr-2" />
                                                Splitting...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-cut mr-2"></i>
                                                Split PDF
                                            </>
                                        )}
                                    </span>
                                </button>

                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-6">
                        <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                        <h4 className="text-xl font-bold mb-4 dark:text-white">PDF Split Successfully!</h4>

                        <div className="space-y-2 mb-6">
                            {processedFiles.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <span className="font-medium dark:text-gray-200">{file.name}</span>
                                    <button
                                        onClick={() => saveAs(file.blob, file.name)}
                                        className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                    >
                                        <i className="fas fa-download"></i>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">
                            <button
                                onClick={downloadAll}
                                className="w-full sm:w-auto flex items-center justify-center
               bg-gradient-to-r from-green-500 to-green-600
               dark:from-green-600 dark:to-green-700
               text-white px-6 py-3 rounded-lg font-semibold
               hover:shadow-lg transition-all"
                            >
                                <i className="fas fa-download mr-2"></i>
                                Download All
                            </button>

                            <button
                                onClick={() => {
                                    setProcessedFiles([]);
                                    setSelectedFile(null);
                                    setSplitRanges('');
                                }}
                                className="w-full sm:w-auto flex items-center justify-center
               bg-gray-300 dark:bg-gray-700
               text-gray-700 dark:text-gray-200
               px-6 py-3 rounded-lg font-semibold
               hover:bg-gray-400 dark:hover:bg-gray-600
               transition-all"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Split More
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

// Remove PDF Pages Modal
function RemovePDFModal({ onClose }) {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [pagesToRemove, setPageToRemove] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedFile, setProcessedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = async (file) => {
        if (file.type !== 'application/pdf') {
            alert("Kripya PDF file select karein!");
            return;
        }

        setSelectedFile(file);

        // Get page count
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setPageCount(pdfDoc.getPageCount());
    };

    const removePDFPagesFile = async () => {
        if (!selectedFile || !pagesToRemove.trim()) {
            alert("Please enter page numbers to remove (e.g., 1, 3, 5 or 1, 3-5, 7)");
            return;
        }

        setIsProcessing(true);
        try {
            // Parse page numbers: "1, 3, 5-7" -> [0, 2, 4, 5, 6]
            const pagesToRemoveSet = new Set();
            pagesToRemove.split(',').forEach(item => {
                const trimmed = item.trim();
                if (trimmed.includes('-')) {
                    const [start, end] = trimmed.split('-').map(n => parseInt(n) - 1);
                    for (let i = start; i <= end; i++) {
                        if (i >= 0 && i < pageCount) pagesToRemoveSet.add(i);
                    }
                } else {
                    const pageNum = parseInt(trimmed) - 1;
                    if (pageNum >= 0 && pageNum < pageCount) pagesToRemoveSet.add(pageNum);
                }
            });

            // Get pages to keep (all pages except removed ones)
            const pagesToKeep = [];
            for (let i = 0; i < pageCount; i++) {
                if (!pagesToRemoveSet.has(i)) pagesToKeep.push(i);
            }

            if (pagesToKeep.length === 0) {
                alert("❌ Error: Cannot remove all pages!");
                setIsProcessing(false);
                return;
            }

            // Split the PDF keeping only the pages we want
            const results = await splitPDF(selectedFile, [pagesToKeep]);

            const result = results[0];
            if (!result || result.blob.size === 0) {
                alert("❌ Conversion failed: Empty result received.");
                setIsProcessing(false);
                return;
            }

            setProcessedFile({
                url: URL.createObjectURL(result.blob),
                name: `${selectedFile.name.replace(/\.[^/.]+$/, "")}_removed.pdf`,
                blob: result.blob
            });
        } catch (error) {
            alert("❌ Remove Pages Failed:\n\n" + (error.message || "Unknown error"));
        }
        setIsProcessing(false);
    };

    const removeConfig = {
        icon: 'fa-trash-can',
        color: 'gray',
        title: 'Remove PDF Pages'
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl">✕</button>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    <i className={`
                        fa ${removeConfig.icon} text-${removeConfig.color}-500 mr-2
                        `}></i>
                    {removeConfig.title}
                </h3>

                {!processedFile ? (
                    <>
                        {!selectedFile ? (
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging
                                    ? 'border-gray-500 bg-blue-50 dark:bg-blue-900/30'
                                    : 'border-gray-300 dark:border-gray-700'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]);
                                }}
                            >

                                <i className="fa fa-trash-can text-5xl text-gray-500 mb-4"></i>

                                <p className="font-semibold mb-2 dark:text-white">Drag & Drop PDF File Here</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to browse</p>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                    className="flex items-center justify-center gap-2
               bg-gray-500 dark:bg-gray-600 text-white px-6 py-2
               mx-auto mt-4
               rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition"
                                >
                                    <i className="fa-solid fa-file-arrow-up"></i>
                                    Select PDF File
                                </button>

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files[0]) {
                                            handleFile(e.target.files[0]);
                                            e.target.value = '';
                                        }
                                    }}
                                />
                            </div>

                        ) : (
                            <div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                                    <p className="font-semibold dark:text-white">{selectedFile.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Pags: {pageCount}</p>
                                </div>

                                <div className="mb-4">
                                    <label className="block font-semibold mb-2 dark:text-white">
                                        Pages to Remove:
                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(e.g., 1, 3, 5-7)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={pagesToRemove}
                                        onChange={(e) => setPageToRemove(e.target.value)}
                                        placeholder="1, 3, 5-7"
                                        className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:border-gray-500 dark:focus:border-gray-500 outline-none dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                <button
                                    onClick={removePDFPagesFile}
                                    disabled={isProcessing}
                                    className="w-full bg-gradient-to-r from-gray-500 to-gray-600
             text-white font-semibold py-3 rounded-lg
             hover:shadow-lg disabled:opacity-50"
                                >
                                    <span className="flex items-center justify-center">
                                        {isProcessing ? (
                                            <>
                                                <VscLoading className="animate-spin mr-2" />
                                                Removing Pages...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-trash-can mr-2"></i>
                                                Remove Pages
                                            </>
                                        )}
                                    </span>
                                </button>

                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-6 flex flex-col items-center">
                        <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>

                        <h4 className="text-xl font-bold mb-2 dark:text-white">
                            Pages Removed Successfully!
                        </h4>

                        <p className="text-gray-600 dark:text-gray-400 mb-6 break-all">
                            {processedFile.name}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                            <button
                                onClick={() => saveAs(processedFile.blob, processedFile.name)}
                                className="w-full sm:w-auto flex items-center justify-center
                 bg-gradient-to-r from-green-500 to-green-600
                 dark:from-green-600 dark:to-green-700
                 text-white px-6 py-3 rounded-lg font-semibold
                 hover:shadow-lg transition-all"
                            >
                                <i className="fas fa-download mr-2"></i>
                                Download PDF
                            </button>

                            <button
                                onClick={() => {
                                    setProcessedFile(null);
                                    setSelectedFile(null);
                                    setPageToRemove('');
                                }}
                                className="w-full sm:w-auto flex items-center justify-center
                 bg-gray-300 dark:bg-gray-700
                 text-gray-700 dark:text-gray-200
                 px-6 py-3 rounded-lg font-semibold
                 hover:bg-gray-400 dark:hover:bg-gray-600
                 transition-all"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Remove More
                            </button>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
}

// PDF Text Replace Modal
function TextReplacePDFModal({ onClose }) {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [oldText, setOldText] = useState('');
    const [newText, setNewText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedFile, setProcessedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = async (files) => {
        const pdfFile = Array.from(files).find(f => f.type === 'application/pdf');
        if (!pdfFile) {
            alert("Kripya sirf PDF file select karein!");
            return;
        }
        setSelectedFile(pdfFile);

        // Get page count
        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setPageCount(pdfDoc.getPageCount());
    };

    const replaceText = async () => {
        if (!selectedFile || !oldText || !newText) {
            alert("Please fill all fields!");
            return;
        }

        setIsProcessing(true);
        try {
            const pdfBlob = await pdfTextReplace(selectedFile, oldText, newText);
            setProcessedFile({
                blob: pdfBlob,
                name: `edited_${selectedFile.name}`
            });
        } catch (error) {
            alert("Error: " + error.message);
        }
        setIsProcessing(false);
    };

    const reset = () => {
        setProcessedFile(null);
        setSelectedFile(null);
        setOldText('');
        setNewText('');
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl">✕</button>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    <i className="fas fa-edit text-cyan-500 mr-2"></i>
                    PDF Text Replace
                </h3>

                {!processedFile ? (
                    <>
                        {!selectedFile ? (
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30' : 'border-cyan-300 dark:border-cyan-700'}`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    handleFiles(e.dataTransfer.files);
                                }}
                            >

                                <i className="fas fa-edit text-cyan-500 text-5xl mb-4"></i>
                                <p className="font-semibold mb-2 dark:text-white">Drag & Drop PDF File</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">or click to browse</p>
                                <button className="flex items-center justify-center gap-2 text-white px-6 py-2 mx-auto mt-4 rounded-lg transition-all bg-cyan-500 dark:bg-cyan-600 hover:bg-cyan-600 dark:hover:bg-cyan-700">
                                    <i className="fa-solid fa-file-pdf"></i>Select PDF File
                                </button>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={(e) => handleFiles(e.target.files)}
                                />
                            </div>
                        ) : (
                            <div>
                                <div className="relative bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-4 rounded-xl mb-4 shadow-sm">
                                    <button
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setPageCount(0);
                                        }}
                                        className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-transform hover:scale-110"
                                        title="Remove file"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>

                                    <div className="flex items-center gap-3 sm:gap-4 w-full max-w-full">
                                        {/* Icon */}
                                        <i className="fas fa-file-pdf text-cyan-500 text-2xl sm:text-2xl md:text-3xl lg:text-4xl flex-shrink-0" />

                                        {/* Text Content */}
                                        <div className="flex flex-col min-w-0">
                                            <p className="font-semibold text-sm sm:text-sm md:text-base truncate dark:text-gray-100">
                                                {selectedFile.name}
                                            </p>

                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                Total {pageCount} Pages
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">

                                        {/* Old Text */}
                                        <div className="flex flex-col">
                                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                <i className="fas fa-search text-blue-500 text-sm"></i>
                                                Old Text (Search For)
                                            </label>

                                            <textarea
                                                value={oldText}
                                                onChange={(e) => setOldText(e.target.value)}
                                                placeholder="Enter text to find..."
                                                rows={4}
                                                className="
        w-full resize-none
        px-4 py-3 text-sm
        border border-gray-300 dark:border-gray-600
        rounded-xl
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
        transition
      "
                                            />
                                        </div>

                                        {/* New Text */}
                                        <div className="flex flex-col">
                                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                <i className="fas fa-pen-fancy text-green-500 text-sm"></i>
                                                New Text (Replace With)
                                            </label>

                                            <textarea
                                                value={newText}
                                                onChange={(e) => setNewText(e.target.value)}
                                                placeholder="Enter replacement text..."
                                                rows={4}
                                                className="
        w-full resize-none
        px-4 py-3 text-sm
        border border-gray-300 dark:border-gray-600
        rounded-xl
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
        transition
      "
                                            />
                                        </div>

                                    </div>


                                    <button
                                        onClick={replaceText}
                                        disabled={isProcessing || !oldText || !newText}
                                        className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                                    >
                                        <span className="flex items-center justify-center">
                                            {isProcessing ? (
                                                <>
                                                    <VscLoading className="animate-spin mr-2" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-exchange-alt mr-2"></i>
                                                    Replace Text
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-8">
                        <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                        <h4 className="text-xl font-bold mb-2 dark:text-white">Text Replaced Successfully!</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">{processedFile.name}</p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">
                            <button
                                onClick={() => saveAs(processedFile.blob, processedFile.name)}
                                className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                                <i className="fas fa-download mr-2"></i>
                                Download PDF
                            </button>

                            <button
                                onClick={reset}
                                className="w-full sm:w-auto flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Replace More
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Generic Tool Modal (for Word, Compress, Lock, Unlock)
function GenericToolModal({ onClose, tool }) {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [password, setPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedFile, setProcessedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const toolConfig = {
        'word-to-pdf': {
            title: 'Word to PDF',
            icon: 'fa-file-word',
            color: 'blue',
            uicon: 'file-word',
            ucolor: 'blue',
            accept: '.doc,.docx',
            process: wordToPDF,
            outputExt: 'pdf'
        },
        'pdf-to-word': {
            title: 'PDF to Word',
            icon: 'fa-file-export',
            uicon: 'file-export',
            ucolor: 'teal',
            color: 'teal',
            accept: 'application/pdf',
            process: pdfToWord,
            outputExt: 'docx'
        },
        'compress': {
            title: 'Compress PDF',
            icon: 'fa-compress-alt',
            uicon: 'compress-alt',
            ucolor: 'pink',
            color: 'pink',
            accept: 'application/pdf',
            process: compressPDF,
            outputExt: 'pdf'
        },
        'lock': {
            title: 'Lock PDF',
            icon: 'fa-lock',
            uicon: 'lock',
            ucolor: 'red',
            color: 'red',
            accept: 'application/pdf',
            process: (file) => lockPDF(file, password),
            outputExt: 'pdf',
            needsPassword: true
        },
        'unlock': {
            title: 'Unlock PDF',
            icon: 'fa-unlock',
            uicon: 'unlock',
            ucolor: 'yellow',
            color: 'yellow',
            accept: 'application/pdf',
            process: (file) => unlockPDF(file, password),
            outputExt: 'pdf',
            needsPassword: true
        },
        'zip': {
            title: 'Zip PDF',
            icon: 'fa-file-zipper',
            uicon: 'file-zipper',
            ucolor: 'indigo',
            color: 'indigo',
            accept: 'application/pdf',
            process: zipfile,
            outputExt: 'zip'
        },
        'remove': {
            title: 'Remove PDF Pages',
            icon: 'fa-trash-can',
            uicon: 'trash-can',
            ucolor: 'gray',
            color: 'gray',
            accept: 'application/pdf',
            process: removePDFPages,
            outputExt: 'pdf'
        },
        'pdf-to-image': {
            title: 'PDF to Image',
            icon: 'fa-file-image',
            uicon: 'file-image',
            ucolor: 'purple',
            color: 'purple',
            accept: 'application/pdf',
            process: pdfToImage,
            outputExt: 'png'
        },

    }


    const buttonColorMap = {
        blue: {
            bg: "from-blue-500 to-blue-600",
            hover: "hover:shadow-lg",
            border: "border-blue-300",
        },
        teal: {
            bg: "from-teal-500 to-teal-600",
            hover: "hover:shadow-lg",
            border: "border-teal-300",
        },
        pink: {
            bg: "from-pink-500 to-pink-600",
            hover: "hover:shadow-lg",
            border: "border-pink-300",
        },
        red: {
            bg: "from-red-500 to-red-600",
            hover: "hover:shadow-lg",
            border: "border-red-300",
        },
        yellow: {
            bg: "from-yellow-400 to-yellow-500",
            hover: "hover:shadow-lg",
            border: "border-yellow-300",
        },
        green: {
            bg: "from-green-500 to-green-600",
            hover: "hover:shadow-lg",
            border: "border-green-300",
        },
        purple: {
            bg: "from-purple-500 to-purple-600",
            hover: "hover:shadow-lg",
            border: "border-purple-300",
        },
        indigo: {
            bg: "from-indigo-500 to-indigo-600",
            hover: "hover:shadow-lg",
            border: "border-indigo-300",
        },
        gray: {
            bg: "from-gray-500 to-gray-600",
            hover: "hover:shadow-lg",
            border: "border-gray-300",
        },
        purple: {
            bg: "from-purple-500 to-purple-600",
            hover: "hover:shadow-lg",
            border: "border-purple-300",
        },
        cyan: {
            bg: "from-cyan-500 to-cyan-600",
            hover: "hover:shadow-lg",
            border: "border-cyan-300",
        },
    };




    const config = toolConfig[tool];

    const handleFile = (file) => {
        setSelectedFile(file);
    };

    const processFile = async () => {
        if (!selectedFile) return;
        if (config.needsPassword && !password) {
            alert("Password enter karein!");
            return;
        }

        setIsProcessing(true);
        try {
            const result = await config.process(selectedFile);

            // Check if result is empty
            if (!result || result.size === 0) {
                alert("❌ Conversion failed: Empty result received.\n\n✓ Check karein:\n- File valid hai?\n- Password sahi hai?\n- File corrupt to nahi?");
                setIsProcessing(false);
                return;
            }

            const url = URL.createObjectURL(result);

            setProcessedFile({
                url,
                name: `${selectedFile.name.replace(/\.[^/.]+$/, "")}_${tool}.${config.outputExt}`,
                blob: result
            });
        } catch (error) {
            const errorMsg = error.message || "Unknown error occurred";
            alert(`❌ ${config.title} Failed:

${errorMsg}

✓ Please try:
- Selecting a different file
- Checking if the file is password protected
- Verifying the file size`);

        }
        setIsProcessing(false);
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
        setPassword("");
    };


    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl">✕</button>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    <i className={`fas ${config.icon} text-${config.color}-500 mr-2`}></i>
                    {config.title}
                </h3>

                {!processedFile ? (
                    <>
                        {!selectedFile ? (
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 cursor-pointer transition-all ${isDragging
                                    ? `border-${config.color}-500 bg-blue-50 dark:bg-blue-900/30`
                                    : `${buttonColorMap[config.color].border} dark:border-opacity-50`
                                    }`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]);
                                }}
                            >


                                <div className="flex justify-center mb-4">
                                    <i
                                        className={`fas ${config.icon}
                  text-5xl text-${config.color}-500`}
                                    ></i>
                                </div>


                                <p className="font-semibold mb-2 dark:text-white">Drag & Drop File Here</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to browse</p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                    className={`flex items-center justify-center gap-2
    text-white px-6 py-2 mx-auto mt-4
    rounded-lg transition-all bg-gradient-to-r
    ${buttonColorMap[config.color].bg}
    ${buttonColorMap[config.color].hover} dark:opacity-90 dark:hover:opacity-100`}
                                >
                                    <i className="fa-solid fa-file-arrow-up"></i>
                                    Select Word File
                                </button>



                                <input
                                    type="file"
                                    accept={config.accept}
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={(e) =>
                                        e.target.files[0] && handleFile(e.target.files[0])
                                    }
                                />
                            </div>

                        ) : (
                            <div>

                                {/* SELECTED FILE CARD */}
                                <div className="relative bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-4 rounded-xl mb-4 shadow-sm">
                                    {/* CUT / REMOVE ICON */}
                                    <button
                                        onClick={removeSelectedFile}
                                        className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400
                 transition-transform hover:scale-110"
                                        title="Remove file"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>

                                    <div className="flex items-center gap-3 sm:gap-4">

                                        {/* ICON – ALWAYS CENTER */}
                                        <i className={`
                                        
                                        
                                            fa-solid fa-${config.uicon}
                                             text-${config.ucolor}-500
                                          text-[22px] sm:text-3xl md:text-4xl
                                               flex-shrink-0`}>
                                        </i>

                                        {/* TEXT – CENTERED HEIGHT */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <p className="font-semibold text-sm sm:text-base truncate leading-tight dark:text-gray-100">
                                                {selectedFile.name}
                                            </p>

                                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-tight">
                                                {(selectedFile.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>

                                    </div>


                                </div>

                                {/* PASSWORD FIELD */}
                                {config.needsPassword && (
                                    <div className="mb-4">
                                        <label className="block font-semibold mb-2 dark:text-white">
                                            <i className="fa-solid fa-lock mr-2 text-gray-600 dark:text-gray-400"></i>
                                            Password
                                        </label>

                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter password"
                                                className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-12
          focus:border-blue-500 dark:focus:border-blue-500 outline-none transition
          dark:bg-gray-700 dark:text-white"
                                            />

                                            {/* Eye Icon */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2
          text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                                            >
                                                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                )}


                                {/* PROCESS BUTTON */}
                                <button
                                    onClick={processFile}
                                    disabled={isProcessing}
                                    className={`w-full flex items-center justify-center gap-2
                                             bg-gradient-to-r ${buttonColorMap[config.color].bg} ${buttonColorMap[config.color].hover}
                                            text-white font-semibold py-3 rounded-lg
                                                hover:shadow-lg disabled:opacity-50 transition dark:opacity-90 dark:hover:opacity-100`}
                                >
                                    {isProcessing ? (
                                        <>
                                            <VscLoading className="animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <i className={`fas ${config.icon}`}></i>
                                            Process File
                                        </>
                                    )}
                                </button>

                            </div>

                        )}
                    </>
                ) : (
                    <div className="text-center py-8 flex flex-col items-center">
                        <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>

                        <h4 className="text-xl font-bold mb-2 dark:text-white">
                            Done!
                        </h4>

                        <p className="text-gray-600 dark:text-gray-400 mb-6 break-all">
                            {processedFile.name}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                            <button
                                onClick={() => saveAs(processedFile.blob, processedFile.name)}
                                className="w-full sm:w-auto flex items-center justify-center
                 bg-gradient-to-r from-green-500 to-green-600
                 dark:from-green-600 dark:to-green-700
                 text-white px-6 py-3 rounded-lg font-semibold
                 hover:shadow-lg transition-all"
                            >
                                <i className="fas fa-download mr-2"></i>
                                Download PDF
                            </button>

                            <button
                                onClick={() => {
                                    setProcessedFile(null);
                                    setSelectedFile(null);
                                    setPassword('');
                                }}
                                className="w-full sm:w-auto flex items-center justify-center
                 bg-gray-300 dark:bg-gray-700
                 text-gray-700 dark:text-gray-200
                 px-6 py-3 rounded-lg font-semibold
                 hover:bg-gray-400 dark:hover:bg-gray-600
                 transition-all"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Convert Another
                            </button>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
}




// PDF to Image Modal
function PDFToImageModal({ onClose }) {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [pageRange, setPageRange] = useState('');
    const [downloadType, setDownloadType] = useState('zip');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedFiles, setProcessedFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = async (file) => {
        if (file.type !== 'application/pdf') {
            alert("Kripya PDF file select karein!");
            return;
        }

        setSelectedFile(file);

        // Get page count
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setPageCount(pdfDoc.getPageCount());
    };

    const convertToImages = async () => {
        if (!selectedFile) return;

        setIsProcessing(true);
        try {
            const result = await pdfToImage(selectedFile, pageRange, downloadType);

            // If individual PNG download
            if (result.images) {
                setProcessedFiles(result.images);
            }
            // If ZIP download
            else {
                const url = URL.createObjectURL(result);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${selectedFile.name.replace('.pdf', '')}_images.zip`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                // Reset after ZIP download
                setTimeout(() => {
                    setSelectedFile(null);
                    setPageRange('');
                    setIsProcessing(false);
                }, 1000);
                return;
            }
        } catch (error) {
            alert("❌ Conversion Failed:\n\n" + (error.message || "Unknown error"));
        }
        setIsProcessing(false);
    };

    const downloadSingleImage = async (url, filename) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000${url}`);
            if (!response.ok) throw new Error('Download failed');
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    const downloadAllImages = () => {
        processedFiles.forEach((url, index) => {
            const filename = url.split('/').pop() || 'image.png';
            setTimeout(() => {
                downloadSingleImage(url, filename);
            }, index * 500);
        });
    };

    const imageConfig = {
        icon: 'fa-file-image',
        color: 'purple',
        title: 'PDF to Image'
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl">✕</button>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    <i className={`fa ${imageConfig.icon} text-${imageConfig.color}-500 mr-2`}></i>
                    {imageConfig.title}
                </h3>

                {processedFiles.length === 0 ? (
                    <>
                        {!selectedFile ? (
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging ? 'border-purple-500 bg-blue-50 dark:bg-blue-900/30' : 'border-purple-300 dark:border-purple-700'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]);
                                }}
                            >
                                <i className="fa fa-file-image text-5xl text-purple-500 mb-4"></i>
                                <p className="font-semibold mb-2 dark:text-white">Drag & Drop PDF File Here</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to browse</p>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                    className="flex items-center justify-center gap-2 bg-purple-500 dark:bg-purple-600 text-white px-6 py-2 mx-auto mt-4 rounded-lg hover:bg-purple-600 dark:hover:bg-purple-700 transition"
                                >
                                    <i className="fa-solid fa-file-arrow-up"></i>
                                    Select PDF File
                                </button>

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files[0]) {
                                            handleFile(e.target.files[0]);
                                            e.target.value = '';
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <div>
                                <div className="relative bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-4 rounded-xl mb-4 shadow-sm">
                                    <button
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setPageCount(0);
                                        }}
                                        className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-transform hover:scale-110"
                                        title="Remove file"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>

                                    <div className="flex items-center gap-3 sm:gap-4 w-full max-w-full">
                                        {/* Icon */}
                                        <i className="fas fa-file-pdf text-purple-500 text-2xl sm:text-2xl md:text-3xl lg:text-4xl flex-shrink-0" />

                                        {/* Text Content */}
                                        <div className="flex flex-col min-w-0">
                                            <p className="font-semibold text-sm sm:text-sm md:text-base truncate dark:text-gray-100">
                                                {selectedFile.name}
                                            </p>

                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                Total {pageCount} Pages
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block font-semibold mb-2 dark:text-white">
                                        Page Range (Optional):
                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(e.g., 1-5 or leave empty for all pages)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={pageRange}
                                        onChange={(e) => setPageRange(e.target.value)}
                                        placeholder="1-5"
                                        className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:border-purple-500 dark:focus:border-purple-500 outline-none dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block font-semibold mb-2 dark:text-white">Download Options:</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 dark:text-gray-200">
                                            <input
                                                type="radio"
                                                name="download"
                                                value="zip"
                                                checked={downloadType === 'zip'}
                                                onChange={(e) => setDownloadType(e.target.value)}
                                            />
                                            Download ZIP
                                        </label>
                                        <label className="flex items-center gap-2 dark:text-gray-200">
                                            <input
                                                type="radio"
                                                name="download"
                                                value="png"
                                                checked={downloadType === 'png'}
                                                onChange={(e) => setDownloadType(e.target.value)}
                                            />
                                            Download PNG
                                        </label>
                                    </div>
                                </div>

                                <button
                                    onClick={convertToImages}
                                    disabled={isProcessing}
                                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg disabled:opacity-50"
                                >
                                    <span className="flex items-center justify-center">
                                        {isProcessing ? (
                                            <>
                                                <VscLoading className="animate-spin mr-2" />
                                                Converting...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-file-image mr-2"></i>
                                                Convert to Images
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-6">
                        <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                        <h4 className="text-xl font-bold mb-4 dark:text-white">Conversion Successful!</h4>

                        <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
                            {processedFiles.map((url, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <span className="font-medium dark:text-gray-200">page_{idx + 1}.png</span>
                                    <button
                                        onClick={() => downloadSingleImage(url, `page_${idx + 1}.png`)}
                                        className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                                    >
                                        <i className="fas fa-download"></i>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">
                            <button
                                onClick={downloadAllImages}
                                className="w-full sm:w-auto flex items-center justify-center
               bg-gradient-to-r from-green-500 to-green-600
               dark:from-green-600 dark:to-green-700
               text-white px-6 py-3 rounded-lg font-semibold
               hover:shadow-lg transition-all"
                            >
                                <i className="fas fa-download mr-2"></i>
                                Download All
                            </button>

                            <button
                                onClick={() => {
                                    setProcessedFiles([]);
                                    setSelectedFile(null);
                                    setPageRange('');
                                }}
                                className="w-full sm:w-auto flex items-center justify-center
               bg-gray-300 dark:bg-gray-700
               text-gray-700 dark:text-gray-200
               px-6 py-3 rounded-lg font-semibold
               hover:bg-gray-400 dark:hover:bg-gray-600
               transition-all"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Convert Another
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}




















// ========== MAIN DASHBOARD ==========



export default function Dashboard() {
    const [activeModal, setActiveModal] = useState(null);

    const tools = [
        { id: 'image-to-pdf', name: 'Image to PDF', icon: 'fa-image', color: 'green', badge: 'Popular', modal: 'image-to-pdf', time: 2 },
        { id: 'merge', name: 'Merge PDF', icon: 'fa-object-group', color: 'purple', badge: 'Essential', modal: 'merge', time: 2 },
        { id: 'split', name: 'Split PDF', icon: 'fa-cut', color: 'orange', badge: 'New', modal: 'split', time: 2 },
        { id: 'word-to-pdf', name: 'Word to PDF', icon: 'fa-file-word', color: 'blue', modal: 'word-to-pdf', time: 7 },
        { id: 'pdf-to-word', name: 'PDF to Word', icon: 'fa-file-export', color: 'teal', badge: 'Popular', modal: 'pdf-to-word', time: 9 },
        { id: 'compress', name: 'Compress PDF', icon: 'fa-compress-alt', color: 'pink', badge: 'Hot', modal: 'compress', time: 5 },
        { id: 'lock', name: 'Lock PDF', icon: 'fa-lock', color: 'red', modal: 'lock', time: 4 },
        { id: 'unlock', name: 'Unlock PDF', icon: 'fa-unlock', color: 'yellow', badge: 'Smart', modal: 'unlock', time: 4 },
        { id: 'zip', name: 'Zip File', icon: 'fa-solid fa-file-zipper', color: 'indigo', badge: 'New', modal: 'zip', time: 4 },
        { id: 'remove', name: 'Remove PDF Pages', icon: 'fa-regular fa-trash-can', color: 'gray', modal: 'remove', time: 3 },
        { id: 'image', name: 'PDF to Image', icon: 'fa-solid fa-clone', color: 'purple', badge: 'Popular', modal: 'pdf-to-image', time: 8 },
        { id: 'edit', name: 'Edit PDF', icon: 'fa-solid fa-edit', color: 'cyan', badge: 'Popular', modal: 'edit', time: 4 },
    ];




    const colorMap = {
        green: {
            gradient: "from-green-500 to-green-600",
            badgeBg: "bg-green-100",
            badgeText: "text-green-600",
        },
        purple: {
            gradient: "from-purple-500 to-purple-600",
            badgeBg: "bg-purple-100",
            badgeText: "text-purple-600",
        },
        orange: {
            gradient: "from-orange-500 to-orange-600",
            badgeBg: "bg-orange-100",
            badgeText: "text-orange-600",
        },
        blue: {
            gradient: "from-blue-500 to-blue-600",
            badgeBg: "bg-blue-100",
            badgeText: "text-blue-600",
        },
        teal: {
            gradient: "from-teal-500 to-teal-600",
            badgeBg: "bg-teal-100",
            badgeText: "text-teal-600",
        },
        pink: {
            gradient: "from-pink-500 to-pink-600",
            badgeBg: "bg-pink-100",
            badgeText: "text-pink-600",
        },
        red: {
            gradient: "from-red-500 to-red-600",
            badgeBg: "bg-red-100",
            badgeText: "text-red-600",
        },
        yellow: {
            gradient: "from-yellow-400 to-yellow-500",
            badgeBg: "bg-yellow-100",
            badgeText: "text-yellow-600",
        },
        indigo: {
            gradient: "from-indigo-500 to-indigo-600",
            badgeBg: "bg-indigo-100",
            badgeText: "text-indigo-600",
        },
        gray: {
            gradient: "from-gray-500 to-gray-600",
            badgeBg: "bg-gray-100",
            badgeText: "text-gray-600",
        },
        purple: {
            gradient: "from-purple-500 to-purple-600",
            badgeBg: "bg-purple-100",
            badgeText: "text-purple-600",
        },
        cyan: {
            gradient: "from-cyan-500 to-cyan-600",
            badgeBg: "bg-cyan-100",
            badgeText: "text-cyan-600",
        },
    };




    const renderModal = () => {
        if (!activeModal) return null;

        switch (activeModal) {
            case 'image-to-pdf':
                return <ImageToPDFModal onClose={() => setActiveModal(null)} />;
            case 'merge':
                return <MergePDFModal onClose={() => setActiveModal(null)} />;
            case 'split':
                return <SplitPDFModal onClose={() => setActiveModal(null)} />;
            case 'remove':
                return <RemovePDFModal onClose={() => setActiveModal(null)} />;
            case 'pdf-to-image':
                return <PDFToImageModal onClose={() => setActiveModal(null)} />;
            case 'edit':
                return <TextReplacePDFModal onClose={() => setActiveModal(null)} />;
            case 'word-to-pdf':
            case 'pdf-to-word':
            case 'compress':
            case 'lock':
            case 'unlock':
            case 'zip':
                return <GenericToolModal onClose={() => setActiveModal(null)} tool={activeModal} />;
            default:
                return null;
        }
    };



    return (
        <div className="min-h-screen mt-20 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Section */}
                <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 shadow-lg bg-white dark:bg-gray-800">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Text Section */}
                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome to PDF Tools</h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0">
                                Powerful tools to manage your PDF documents efficiently
                            </p>
                        </div>



                        {/* Feature Icons */}
                        <div className="flex justify-center lg:justify-end gap-4 sm:gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-1 sm:mb-2">
                                    <i className="fas fa-bolt text-white text-lg sm:text-2xl"></i>
                                </div>
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Fast</p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-1 sm:mb-2">
                                    <i className="fas fa-shield-alt text-white text-lg sm:text-2xl"></i>
                                </div>
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Secure</p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-1 sm:mb-2">
                                    <i className="fas fa-star text-white text-lg sm:text-2xl"></i>
                                </div>
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Quality</p>
                            </div>
                        </div>
                    </div>
                </div>



                <hr className="border-gray-300 dark:border-gray-700 my-8" />

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {tools.map(tool => (
                        <div
                            key={tool.id}
                            className="tool-card glass-card rounded-2xl shadow-xl p-6 cursor-pointer hover:scale-105 transition-transform bg-white dark:bg-gray-800"
                            onClick={() => setActiveModal(tool.modal)}
                        >
                            <div className="flex items-start justify-between mb-4">

                                {/* ICON BOX */}
                                <div
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg
          bg-gradient-to-br ${colorMap[tool.color].gradient}`}
                                >
                                    <i className={`fas ${tool.icon} text-white text-2xl`}></i>
                                </div>

                                {/* BADGE */}
                                {tool.badge && (
                                    <span
                                        className={`text-xs font-semibold px-3 py-1 rounded-full
          ${colorMap[tool.color].badgeBg}
         ${colorMap[tool.color].badgeText}`}
                                    >
                                        {tool.badge}
                                    </span>
                                )}

                            </div>

                            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{tool.name}</h4>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    <i className="fas fa-clock mr-1"></i> ~{tool.time} sec
                                </span>
                                <i className={`fas fa-arrow-right text-${tool.color}-500 text-lg`}></i>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Features Section */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl bg-white dark:bg-gray-800">



                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Why Choose PDF Tools Pro?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-rocket text-white text-2xl"></i>
                            </div>
                            <h4 className="font-bold text-gray-800 dark:text-white mb-2">Lightning Fast</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Process files in seconds with our optimized algorithms</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-user-shield text-white text-2xl"></i>
                            </div>
                            <h4 className="font-bold text-gray-800 dark:text-white mb-2">100% Secure</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Your files are processed locally in your browser</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-magic text-white text-2xl"></i>
                            </div>
                            <h4 className="font-bold text-gray-800 dark:text-white mb-2">Easy to Use</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Simple drag & drop interface for everyone</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render Active Modal */}
            {renderModal()}
        </div>
    );
}
