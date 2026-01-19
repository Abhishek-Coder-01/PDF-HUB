function Features() {
    return (
        <>
            {/* Features Section */}
            <section id="features" className="py-20 px-4  relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-20 fade-in">
                        <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-full mb-6 shadow-sm">

                            <i class="fa-solid fa-star text-indigo-600 mr-2 text-xs sm:text-sm"></i>
                            <span className="text-gray-700 font-semibold text-sm tracking-wide">Powerful Features</span>
                        </div>

                        <h2
                            style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight dark:text-white"
                          data-aos="fade-up" data-aos-offset="200" data-aos-duration="900"
                        >
                            Why Choose{' '}
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                                PDF Hub
                            </span>
                        </h2>

                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed dark:text-gray-400">
                            Experience the most advanced plant identification technology with features designed for botanists, gardeners, and nature enthusiasts worldwide.
                        </p>
                    </div>

                    {/* Main Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                        {/* Feature 1 - AI Powered */}
                        <div className="group feature-card bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200/50 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 fade-in relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-green-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                                    <i className="fas fa-brain text-white text-2xl"></i>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300 dark:text-gray-200">
                                    AI-Powered
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-sm dark:text-gray-400">
                                    Advanced document processing algorithms trained on millions of files for accurate and secure PDF handling.
                                </p>


                            </div>
                        </div>

                        {/* Feature 2 - Extensive Database */}
                        <div className="group feature-card bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200/50 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 fade-in relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 ">
                                    <i className="fas fa-database text-white text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 dark:text-gray-200">
                                    Powerful PDF Tools
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-sm dark:text-gray-400">
                                    Access a complete set of PDF tools to convert, merge, lock, and unlock documents securely.
                                </p>



                            </div>
                        </div>

                        {/* Feature 3 - Wikipedia Integration */}
                        <div className="group feature-card bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200/50 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 fade-in relative overflow-hidden">

                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="relative">


                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>


                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 dark:text-gray-200">
                                    All-in-One PDF Tools
                                </h3>


                                <p className="text-gray-600 leading-relaxed text-sm dark:text-gray-400">
                                    Convert, merge, lock, and unlock PDFs using fast, secure, and easy-to-use tools.
                                </p>

                            </div>
                        </div>


                        {/* Feature 4 - Instant Results */}
                        <div className="group feature-card bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200/50 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 fade-in relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-yellow-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 via-orange-500 to-orange-600 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 ">
                                    <i className="fas fa-bolt text-white text-2xl"></i>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 dark:text-gray-200">
                                    Instant Results
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-sm dark:text-gray-400">
                                    Get PDF results in seconds with accurate processing and secure document handling.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Features - Modern Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                        {/* Responsive Feature */}
                        <div className="
  group flex items-start gap-4 p-6 rounded-2xl
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-700
  hover:border-green-400 dark:hover:border-green-500
  hover:shadow-xl dark:hover:shadow-green-500/10
  transition-all duration-300 fade-in
">
                            <div className="
    w-14 h-14 rounded-xl
    bg-gradient-to-br
    from-green-100 to-emerald-100
    dark:from-green-900/40 dark:to-emerald-900/40
    flex items-center justify-center flex-shrink-0
  ">
                                <i className="
      fas fa-mobile-alt
      text-green-600 dark:text-green-400
      text-xl
    "></i>
                            </div>

                            <div>
                                <h4 className="
      font-bold text-lg mb-2
      text-gray-900 dark:text-gray-100
      group-hover:text-green-600 dark:group-hover:text-green-400
      transition-colors duration-300
    ">
                                    Fully Responsive
                                </h4>

                                <p className="
      text-sm leading-relaxed
      text-gray-600 dark:text-gray-400
    ">
                                    Works perfectly on all devices – mobile, tablet, and desktop with optimized performance.
                                </p>
                            </div>
                        </div>


                        {/* Privacy Feature */}
                        <div className="
  group flex items-start gap-4 p-6 rounded-2xl
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-700
  hover:border-blue-400 dark:hover:border-blue-500
  hover:shadow-xl dark:hover:shadow-blue-500/10
  transition-all duration-300 fade-in
">
                            <div className="
    w-14 h-14 rounded-xl
    bg-gradient-to-br
    from-blue-100 to-indigo-100
    dark:from-blue-900/40 dark:to-indigo-900/40
    flex items-center justify-center flex-shrink-0
  ">
                                <i className="
      fas fa-shield-alt
      text-blue-600 dark:text-blue-400
      text-xl
    "></i>
                            </div>

                            <div>
                                <h4 className="
      font-bold text-lg mb-2
      text-gray-900 dark:text-gray-100
      group-hover:text-blue-600 dark:group-hover:text-blue-400
      transition-colors duration-300
    ">
                                    Privacy First
                                </h4>

                                <p className="
      text-sm leading-relaxed
      text-gray-600 dark:text-gray-400
    ">
                                    Your images are processed securely and never stored permanently. Complete data protection.
                                </p>
                            </div>
                        </div>


                        {/* Unlimited Feature */}
                        <div className="
  group flex items-start gap-4 p-6 rounded-2xl
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-700
  hover:border-purple-400 dark:hover:border-purple-500
  hover:shadow-xl dark:hover:shadow-purple-500/10
  transition-all duration-300 fade-in
">
                            <div className="
    w-14 h-14 rounded-xl
    bg-gradient-to-br
    from-purple-100 to-pink-100
    dark:from-purple-900/40 dark:to-pink-900/40
    flex items-center justify-center flex-shrink-0
  ">
                                <i className="
      fas fa-infinity
      text-purple-600 dark:text-purple-400
      text-xl
    "></i>
                            </div>

                            <div>
                                <h4 className="
      font-bold text-lg mb-2
      text-gray-900 dark:text-gray-100
      group-hover:text-purple-600 dark:group-hover:text-purple-400
      transition-colors duration-300
    ">
                                    Unlimited Usage
                                </h4>

                                <p className="
      text-sm leading-relaxed
      text-gray-600 dark:text-gray-400
    ">
                                    Identify as many plants as you want without any restrictions or hidden fees.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Add these animations to your CSS file */}
            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </>
    );
}

export default Features;
