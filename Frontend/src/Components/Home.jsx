import { useEffect, useRef, useState } from "react";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import howItWorks from "../assets/Demo_video.mp4";


function Home() {
  const colors = [
    "#667eea", "#764ba2", "#f093fb", "#4facfe",
    "#43e97b", "#fa709a", "#fee140", "#30cfd0",
    "#a8edea", "#fed6e3", "#ff6b6b", "#4ecdc4",
    "#45b7d1", "#f38181", "#aa4b6b", "#3a1c71",
  ];


  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const getRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];


    const [open, setOpen] = useState(false);
    const closeButtonRef = useRef(null);
  
    useEffect(() => {
      function onKey(e) {
        if (e.key === 'Escape' && open) setOpen(false);
      }
      if (open) {
        document.addEventListener('keydown', onKey);
        // move focus to close button for accessibility
        setTimeout(() => closeButtonRef.current?.focus(), 0);
      }
      return () => document.removeEventListener('keydown', onKey);
   }, [open]);

   

function CountUp({ target, suffix = "+", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const hasRun = useRef(false); // 🔥 important

  useEffect(() => {
    // Don't animate if already started
    if (hasRun.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true; // ✅ mark as executed

          let start = 0;
          const increment = target / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          observer.disconnect(); // 👈 stop observing after first run
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);

    return () => observer.disconnect();
  }, [target, duration]);



  return (
    <span ref={countRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}


  return (
    <div id="home">
      <div className="relative">
            
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-12 md:py-20 relative overflow-hidden">


          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Content */}
              <div className="" data-aos-delay="300" data-aos-duration="900" data-aos="fade-right">
                <h1
                  className="hero-title text-gray-900 mb-6 text-[50px] lg:text-[75.4px] font-black leading-tight"
                  style={{
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    const letters = e.currentTarget.querySelectorAll('.hover-letter');
                    letters.forEach((letter) => {
                      letter.addEventListener('mouseenter', function () {
                        this.style.color = getRandomColor();
                        setTimeout(() => {
                          this.style.color = '';
                        }, 2000);
                      });
                    });
                  }}
                >
                  <span className="block">
                    {"The super fast".split("").map((char, i) => (
                      <span
                        key={i}
                        className="hover-letter inline-block transition-colors duration-300"
                        style={{ cursor: 'pointer' }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                  <span className="block">
                    {"PDF tools".split("").map((char, i) => (
                      <span
                        key={`pdf-${i}`}
                        className="hover-letter inline-block transition-colors duration-300"
                        style={{ cursor: 'pointer' }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                  <span className="block">
                    {"generator!".split("").map((char, i) => (
                      <span
                        key={`gen-${i}`}
                        className="hover-letter inline-block transition-colors duration-300"
                        style={{ cursor: 'pointer' }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                </h1>

                <div className="relative inline-block mb-8">
                  <span className="handwritten text-2xl text-gray-600 dark:text-gray-400">AND MUCH MORE</span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M2 5C50 2 150 2 198 5" stroke="#667eea" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>

                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl dark:text-gray-400">
                  Create the perfect PDF or get inspired by powerful tools for fast and secure document processing.
                </p>

                {/* Stats Section - FIXED COUNT */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0 px-4 sm:px-0 font-[system-ui,sans-serif] mb-10">
                  <div className="text-center lg:text-left">
                    <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                      <CountUp target={10000} suffix="+" />
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium dark:text-gray-400">
                      PDFs Processed
                    </div>
                  </div>

                  <div className="text-center lg:text-left">
                    <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                      <CountUp target={99} suffix="%" />
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium dark:text-gray-400">
                      Success Rate
                    </div>
                  </div>

                  <div className="text-center lg:text-left">
                    <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                      Instant
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium dark:text-gray-400">
                      Results
                    </div>
                  </div>
                </div>


                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5">

                  {/* START FREE TRIAL / DASHBOARD */}
                  {!isSignedIn ? (
                    <SignInButton mode="modal">
                      <button className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 text-sm sm:text-base md:text-lg rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:scale-105">
                        Start Free Trial
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </SignInButton>
                  ) : (
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 text-sm sm:text-base md:text-lg rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                      Visit Dashboard

                    </button>
                  )}

                  {/* WATCH VIDEO */}
                  <button
                   onClick={() => setOpen(true)}
                    aria-haspopup="dialog"
                    aria-controls="howItWorksModal"
                    type="button"
                   className="bg-white text-gray-800 font-semibold px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 text-sm sm:text-base md:text-lg rounded-lg shadow-md border border-gray-200 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5">
                      <path fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
                        clipRule="evenodd" />
                    </svg>
                    Watch Video
                  </button>



                  {open && (
                    <div id="howItWorksModal" role="dialog" aria-modal="true" aria-labelledby="howItWorksTitle" className="fixed inset-0 z-50 flex items-center justify-center p-4">
                      {/* backdrop */}
                      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

                      <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden transform transition-all">
                        <div className="flex items-center justify-between p-1 md:p-3 border-b border-gray-100">
                          <h3 id="howItWorksTitle" className="text-md md:text-lg font-black text-gray-900 pl-2 md:pl-0">How It Works</h3>
                          <button
                            ref={closeButtonRef}
                            onClick={() => setOpen(false)}
                            aria-label="Close video"
                            className="ml-3 bg-gray-100 active:scale-90 hover:bg-gray-200 mr-2 md:mr-0 text-gray-800 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                          >
                            <i className="fa-solid fa-xmark text-red-500 text-sm md:text-lg"></i>
                          </button>
                        </div>

                        <div className="bg-black">
                          <video controls autoPlay className="w-full max-h-[80vh] bg-black">
                            <source src={howItWorks} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    </div>
                  )}




                </div>
              </div>

              {/* ✨ RIGHT SIDE - COMPLETELY NEW DESIGN ✨ */}
              <div className="relative hidden lg:flex items-center justify-center" data-aos="fade-left" data-aos-delay="300" data-aos-duration="900">
                <div className="relative w-full max-w-xl">

                  {/* Animated Gradient Card Stack */}
                  <div className="relative">

                    {/* Card 1 - Back */}
                    <div className="absolute top-8 left-8 w-full h-96 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-3xl shadow-2xl transform rotate-6 opacity-20"></div>

                    {/* Card 2 - Middle */}
                    <div className="absolute top-4 left-4 w-full h-96 bg-gradient-to-br from-pink-400 to-purple-600 rounded-3xl shadow-2xl transform rotate-3 opacity-40"></div>

                    {/* Card 3 - Front (Main) */}
                    <div className="relative w-full h-96 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden">

                      {/* Decorative Circles */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white opacity-10 rounded-full"></div>
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>

                      {/* Top Section */}
                      <div className="relative z-10">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold mb-6">
                          ⚡ Lightning Fast
                        </div>

                        <h3 className="text-white text-3xl font-black mb-3">
                          Transform Your PDFs
                        </h3>
                        <p className="text-white/90 text-lg">
                          Instantly convert, merge, split & compress your documents
                        </p>
                      </div>

                      {/* Middle Section - Features Grid */}
                      <div className="relative z-10 grid grid-cols-2 gap-3">
                        {[
                          { icon: "📄", label: "Convert", desc: "To any format" },
                          { icon: "🔗", label: "Merge", desc: "Multiple files" },
                          { icon: "✂️", label: "Split", desc: "Pages easily" },
                          { icon: "🗜️", label: "Compress", desc: "Reduce size" }
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="bg-white/10 backdrop-blur-md rounded-xl p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
                          >
                            <div className="text-2xl mb-1">{item.icon}</div>
                            <div className="text-white font-bold text-sm">{item.label}</div>
                            <div className="text-white/70 text-xs">{item.desc}</div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Section */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex -space-x-3">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm"
                            >
                              {i === 4 ? '+' : '👤'}
                            </div>
                          ))}
                        </div>
                        <div className="text-white text-right">
                          <div className="text-2xl font-black">10K+</div>
                          <div className="text-xs text-white/80">Happy Users</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-8 -left-8 bg-white rounded-2xl shadow-xl p-4 animate-bounce-slow">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-2xl">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-800">Secure</div>
                        <div className="text-xs text-gray-500">256-bit encryption</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce-slower">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl">
                        🚀
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-800">Fast</div>
                        <div className="text-xs text-gray-500">&lt; 2 seconds</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              {/* ✨ END OF RIGHT SIDE ✨ */}


          



            </div>
          </div>
        </section>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-slower {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-bounce-slower {
          animation: bounce-slower 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;
