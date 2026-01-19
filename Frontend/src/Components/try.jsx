import "./Dashboard.css";
import { useRef, useState } from "react";

function UploadModal({ onClose }) {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    // Handle selected / dropped file
    const handleFile = (file) => {
        if (!file) return;
        console.log("Selected file:", file);
        // 👉 yahin PDF conversion call hogi
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

            {/* BACKGROUND (close modal) */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* UPLOAD BOX */}
            <div
                className="relative w-full max-w-md md:max-w-lg lg:max-w-xl"
                onClick={(e) => e.stopPropagation()} // IMPORTANT
            >
                <div
                    className={`
            border-2 border-dashed rounded-2xl p-8 md:p-10
            text-center cursor-pointer shadow-2xl
            transition-all duration-300
            ${isDragging
                            ? "border-emerald-500 bg-emerald-50 scale-105"
                            : "border-emerald-400 bg-white"}
          `}
                    onClick={() => fileInputRef.current.click()}

                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}

                    onDragLeave={() => setIsDragging(false)}

                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        handleFile(e.dataTransfer.files[0]);
                    }}
                >
                    {/* CLOSE BUTTON */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>

                    {/* ICON */}
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <i className="fas fa-image text-3xl md:text-4xl text-emerald-600"></i>
                    </div>

                    <p className="font-semibold text-lg md:text-xl mb-2">
                        Drag & Drop your image
                    </p>

                    <p className="text-sm text-gray-500 mb-5">
                        or <span className="text-emerald-600 font-medium">browse</span> from your device
                    </p>

                   <div className="flex flex-wrap justify-center gap-2">
                        <span className="text-xs bg-white px-3 py-1.5 rounded-full shadow">Max 100MB</span>
                        <span className="text-xs bg-white px-3 py-1.5 rounded-full shadow">AI Processing</span>
                        <span className="text-xs bg-white px-3 py-1.5 rounded-full shadow">Instant Output</span>
                    </div>

                    {/* HIDDEN INPUT */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files[0])}
                    />
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen">
            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Section */}
                <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 shadow-lg">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Text Section */}
                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome to PDF Tools</h2>
                            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0">
                                Powerful tools to manage your PDF documents efficiently
                            </p>
                        </div>

                        {/* Feature Icons */}
                        <div className="flex justify-center lg:justify-end gap-4 sm:gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-1 sm:mb-2">
                                    <i className="fas fa-bolt text-white text-lg sm:text-2xl"></i>
                                </div>
                                <p className="text-xs font-semibold text-gray-700">Fast</p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-1 sm:mb-2">
                                    <i className="fas fa-shield-alt text-white text-lg sm:text-2xl"></i>
                                </div>
                                <p className="text-xs font-semibold text-gray-700">Secure</p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-1 sm:mb-2">
                                    <i className="fas fa-star text-white text-lg sm:text-2xl"></i>
                                </div>
                                <p className="text-xs font-semibold text-gray-700">Quality</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 lg:mb-16">
                    <hr className="border-gray-300 my-8" />
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">

                    {/* Image to PDF */}
                    <div className="tool-card glass-card rounded-2xl shadow-xl p-6 cursor-pointer" onClick={() => setOpen(true)}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <i className="fas fa-image text-white text-2xl"></i>
                            </div>
                            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full badge-shimmer">Popular</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">Image to PDF</h4>
                        <p className="text-gray-600 text-sm mb-4">Convert images (JPG, PNG, GIF) into PDF format</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium">
                                <i className="fas fa-clock mr-1"></i> ~2 sec
                            </span>
                            <i className="fas fa-arrow-right text-blue-500 text-lg"></i>
                        </div>
                    </div>

                    {/* Merge PDF */}
                    <div className="tool-card glass-card rounded-2xl shadow-xl p-6 cursor-pointer" onClick={() => setOpen(true)}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <i className="fas fa-object-group text-white text-2xl"></i>
                            </div>
                            <span className="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">Essential</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">Merge PDF</h4>
                        <p className="text-gray-600 text-sm mb-4">Combine multiple PDFs into a single document</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium">
                                <i className="fas fa-clock mr-1"></i> ~3 sec
                            </span>
                            <i className="fas fa-arrow-right text-purple-500 text-lg"></i>
                        </div>
                    </div>

                    {/* Split PDF (NEW) */}
                    <div className="tool-card glass-card rounded-2xl shadow-xl p-6 cursor-pointer" onClick={() => setOpen(true)}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <i className="fas fa-cut text-white text-2xl"></i>
                            </div>
                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full badge-shimmer">New</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">Split PDF</h4>
                        <p className="text-gray-600 text-sm mb-4">Extract specific pages or split into multiple files</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium">
                                <i className="fas fa-clock mr-1"></i> ~2 sec
                            </span>
                            <i className="fas fa-arrow-right text-orange-500 text-lg"></i>
                        </div>
                    </div>

                    {/* Word to PDF */}
                    <div className="tool-card glass-card rounded-2xl shadow-xl p-6 cursor-pointer" onClick={() => setOpen(true)}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <i className="fas fa-file-word text-white text-2xl"></i>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">Word to PDF</h4>
                        <p className="text-gray-600 text-sm mb-4">Convert Word documents (.docx, .doc) to PDF</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium">
                                <i className="fas fa-clock mr-1"></i> ~2 sec
                            </span>
                            <i className="fas fa-arrow-right text-green-500 text-lg"></i>
                        </div>
                    </div>

                    {/* PDF to Word */}
                    <div className="tool-card glass-card rounded-2xl shadow-xl p-6 cursor-pointer" onClick={() => setOpen(true)}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <i className="fas fa-file-export text-white text-2xl"></i>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">PDF to Word</h4>
                        <p className="text-gray-600 text-sm mb-4">Convert PDF files back to editable Word format</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium">
                                <i className="fas fa-clock mr-1"></i> ~3 sec
                            </span>
                            <i className="fas fa-arrow-right text-teal-500 text-lg"></i>
                        </div>
                    </div>

                    {/* Compress PDF (NEW) */}
                    <div className="tool-card glass-card rounded-2xl shadow-xl p-6 cursor-pointer" onClick={() => setOpen(true)}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <i className="fas fa-compress-alt text-white text-2xl"></i>
                            </div>
                            <span className="bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full badge-shimmer">Hot</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">Compress PDF</h4>
                        <p className="text-gray-600 text-sm mb-4">Reduce PDF file size without quality loss</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium">
                                <i className="fas fa-clock mr-1"></i> ~4 sec
                            </span>
                            <i className="fas fa-arrow-right text-pink-500 text-lg"></i>
                        </div>
                    </div>

                    {/* Lock PDF */}
                    <div className="tool-card glass-card rounded-2xl shadow-xl p-6 cursor-pointer" onClick={() => setOpen(true)}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <i className="fas fa-lock text-white text-2xl"></i>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">Lock PDF</h4>
                        <p className="text-gray-600 text-sm mb-4">Secure PDF files with password protection</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium">
                                <i className="fas fa-clock mr-1"></i> ~1 sec
                            </span>
                            <i className="fas fa-arrow-right text-red-500 text-lg"></i>
                        </div>
                    </div>

                    {/* Unlock PDF */}
                    <div className="tool-card glass-card rounded-2xl shadow-xl p-6 cursor-pointer" onClick={() => setOpen(true)}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <i className="fas fa-unlock text-white text-2xl"></i>
                            </div>
                            <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">Smart</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">Unlock PDF</h4>
                        <p className="text-gray-600 text-sm mb-4">Remove password protection automatically</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium">
                                <i className="fas fa-clock mr-1"></i> ~2 sec
                            </span>
                            <i className="fas fa-arrow-right text-yellow-500 text-lg"></i>
                        </div>
                    </div>
                </div>



                {/* Features Section */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why Choose PDF Tools Pro?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-rocket text-white text-2xl"></i>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-2">Lightning Fast</h4>
                            <p className="text-sm text-gray-600">Process files in seconds with our optimized algorithms</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-user-shield text-white text-2xl"></i>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-2">100% Secure</h4>
                            <p className="text-sm text-gray-600">Your files are processed locally in your browser</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-magic text-white text-2xl"></i>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-2">Easy to Use</h4>
                            <p className="text-sm text-gray-600">Simple drag & drop interface for everyone</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {open && <UploadModal onClose={() => setOpen(false)} />}
        </div>
    );
}
