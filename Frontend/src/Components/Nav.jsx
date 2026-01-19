import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
} from "@clerk/clerk-react";

import { TbMenuDeep } from "react-icons/tb";
import {
  FiHome,
  FiZap,
  FiPlayCircle,
  FiSun,
  FiMoon,
  FiX,
  FiFileText,
  FiChevronRight
} from "react-icons/fi";
import {
  HiOutlineSparkles,
  HiOutlineLightBulb
} from "react-icons/hi";

function App() {
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  };

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try { localStorage.setItem("theme", theme); } catch { }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", id: "home", icon: <FiHome className="text-lg" /> },
    { label: "Features", id: "features", icon: <HiOutlineSparkles className="text-lg" /> },
    { label: "How It Works", id: "how-it-works", icon: <FiPlayCircle className="text-l " /> }
  ];

  return (
    <>
  <nav
  className={`dark:glass-card
    fixed top-3 left-1/2 -translate-x-1/2
    w-[94%] sm:w-[92%] md:w-[90%]
    max-w-7xl z-50 rounded-3xl
    transition-all duration-300
    border border-transparent
    dark:border dark:border-white/40
    ${
      scrolled
        ? "bg-white/10 shadow-xl backdrop-blur-md dark:bg-gray-800 dark:shadow-xl"
        : "bg-white/10 backdrop-blur-sm shadow-none dark:bg-gray-800"
    }
  `}
>

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

            {/* Logo */}
            <div
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="
                  w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 
                  rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
                  flex items-center justify-center shadow-lg
                  group-hover:shadow-emerald-200 group-hover:scale-105
                  transition-all duration-300 ease-out
                ">
                  <FiFileText className="text-white text-xl sm:text-2xl" />
                </div>

              </div>
              <div className="flex flex-col">
                <span className="
                  text-xl sm:text-2xl lg:text-3xl font-extrabold 
                 bg-gradient-to-r from-indigo-600 to-purple-600
                  bg-clip-text text-transparent
                ">
                  PDF HUB
                </span>
                <span className="text-xs text-indigo-600 font-medium opacity-80">
                  AI-Powered • Fast • Secure
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-8">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="
        relative flex items-center gap-2
        px-4 py-2.5 rounded-xl
        text-sm lg:text-base font-semibold

        text-gray-700 dark:text-gray-200
        hover:text-indigo-700 dark:hover:text-indigo-400

        hover:bg-indigo-50/50 dark:hover:bg-white/10

        cursor-pointer transition-all duration-300
        group
      "
                >
                  <span
                    className="
          text-indigo-500 dark:text-indigo-400
          opacity-80
          group-hover:opacity-100
          group-hover:scale-110
          transition-all
        "
                  >
                    {item.icon}
                  </span>

                  {item.label}

                  <span
                    className="
          absolute -bottom-1 left-1/2 -translate-x-1/2
          h-0.5 w-0
          bg-gradient-to-r from-indigo-600 to-purple-400
          group-hover:w-4/5
          transition-all duration-300
        "
                  />
                </button>
              ))}
            </div>


            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                title="Toggle theme"
                className="p-2 rounded-lg transition-all duration-300"
              >
                {theme === "dark" ? (
                  /* Moon → bg white, text black */
                  <div className="p-2 rounded-lg bg-white">
                    <FiMoon className="text-lg text-black" />
                  </div>
                ) : (
                  /* Sun → bg black, text white */
                  <div className="p-2 rounded-lg bg-black">
                    <FiSun className="text-lg text-white" />
                  </div>
                )}
              </button>

              <SignedOut>
                <button
                  onClick={() => openSignIn()}
                  className="
                    relative group
                    px-6 lg:px-8 py-2.5 lg:py-3
                    rounded-full
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    text-white text-sm lg:text-base font-bold
                    hover:shadow-2xl hover:shadow-indigo-200
                    hover:-translate-y-0.5
                    transition-all duration-300
                    overflow-hidden
                  "
                >

                  <span className="relative flex items-center gap-2 font-bold">
                    Get Started
                    <FiChevronRight className="
                      group-hover:translate-x-1 
                      transition-transform duration-300
                    " />
                  </span>
                  <div className="
                    absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                    translate-x-[-100%] group-hover:translate-x-[100%] 
                    transition-transform duration-1000
                  " />
                </button>
              </SignedOut>

              <SignedIn>
                <div className="
                  p-1 rounded-full 
                  
                  shadow-inner
                ">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 border-2 border-white shadow-md",
                        userButtonPopoverCard: "shadow-2xl",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="
                md:hidden 
                p-2.5 rounded-xl
                 bg-gradient-to-r from-indigo-600 to-purple-600
                text-white shadow-lg hover:shadow-xl
                hover:scale-105 active:scale-95
                transition-all duration-300
              "
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <FiX className="text-2xl" />
              ) : (
                <TbMenuDeep className="text-2xl" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`
              md:hidden overflow-hidden 
              transition-all duration-500 ease-in-out
              ${open
                ? "max-h-[500px] opacity-100 mt-4"
                : "max-h-0 opacity-0"
              }
            `}
          >
            <div
              className="
    bg-gradient-to-b
    from-white/95 to-indigo-50/80
    dark:from-gray-900/95 dark:to-gray-800/80
    backdrop-blur-xl rounded-2xl shadow-2xl
    border border-white/40 dark:border-gray-700/40
    p-6
  "
            >
              <div className="space-y-3">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      scrollToSection(item.id);
                      setOpen(false);
                    }}
                    className="
          w-full flex items-center gap-4 rounded-xl
          text-base font-semibold

          text-gray-700 dark:text-gray-200
          hover:text-indigo-700 dark:hover:text-indigo-400

          hover:bg-gradient-to-r
          hover:from-white hover:to-indigo-50
          dark:hover:from-gray-800 dark:hover:to-gray-700

          active:bg-indigo-100 dark:active:bg-gray-700
          border border-transparent hover:border-indigo-100 dark:hover:border-gray-600

          transition-all duration-300
          group
        "
                  >
                    <div
                      className="
            p-2.5 rounded-lg
            bg-gradient-to-br
            from-emerald-100 to-teal-100
            dark:from-emerald-900/40 dark:to-teal-900/40
            group-hover:from-emerald-200 group-hover:to-teal-200
            dark:group-hover:from-emerald-800/60 dark:group-hover:to-teal-800/60
            transition-all
          "
                    >
                      {item.icon}
                    </div>

                    {item.label}

                    <FiChevronRight
                      className="
            ml-auto
            text-emerald-400 dark:text-emerald-300
            opacity-0 group-hover:opacity-100
            group-hover:translate-x-1
            transition-all duration-300
          "
                    />
                  </button>
                ))}

                {/* Footer */}
                <div className="pt-4 border-t border-emerald-100 dark:border-gray-700">
                  <SignedOut>
                    <button
                      onClick={() => openSignIn()}
                      className="
            w-full flex items-center justify-center gap-2 sm:gap-3
            py-3 sm:py-3.5 md:py-4
            px-4 sm:px-6
            rounded-lg sm:rounded-xl

            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white font-semibold
            text-sm sm:text-base md:text-lg

            shadow-md sm:shadow-lg
            hover:shadow-xl hover:shadow-indigo-200/50
            dark:hover:shadow-indigo-500/30

            hover:-translate-y-0.5 active:translate-y-0
            transition-all duration-300
          "
                    >
                      <HiOutlineLightBulb className="text-lg sm:text-xl md:text-2xl" />
                      <span>Get Started Free</span>
                    </button>
                  </SignedOut>

                  <SignedIn>
                    <div className="flex justify-center">
                      <div className="p-1.5 rounded-full shadow-inner dark:shadow-black/40">
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox:
                                "w-12 h-12 border-2 border-white dark:border-gray-700 shadow-md",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </SignedIn>

                  {/* Theme Toggle */}
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Theme
                    </span>

                    <button
                      onClick={toggleTheme}
                      aria-label="Toggle color theme"
                      className="
            p-2 rounded-lg
            transition-all duration-300
            bg-black text-white
            dark:bg-white dark:text-black
          "
                    >
                      {theme === "dark" ? (
                        <FiMoon className="text-lg" />
                      ) : (
                        <FiSun className="text-lg" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}

export default App;