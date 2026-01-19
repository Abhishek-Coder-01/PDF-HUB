import { useEffect, useState } from "react";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8
        w-14 h-14
        bg-gradient-to-r from-indigo-600 to-purple-600
        text-white rounded-full
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        transform hover:-translate-y-1
        z-40 flex items-center justify-center
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      <i className="fas fa-arrow-up text-xl"></i>
    </button>
  );
}

export default ScrollToTop;