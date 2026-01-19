import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Features from "./Components/Feature";
import Work from "./Components/Work";
import Footer from "./Components/Footer";
import Scrollbar from "./Components/Scrollbar";
import Contact from "./Components/Contact";
import Dashboard from "./Components/Dashboard";


function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <Nav lenis={lenisRef} />

      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Features />
            <Work />
            <Contact />
            <Footer />
            <Scrollbar />
          </>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </>
  );
}

export default App;

