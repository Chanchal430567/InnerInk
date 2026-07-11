import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import heroLogo from "../assets/InnerInk.jpeg";

function Landing() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const brandWords = ["Inner", "Ink"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => navigate("/login"), 400);
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-page">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            className="splash-screen"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <motion.div
              className="splash-mark"
              initial={{ scale: 0.85, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <img src={heroLogo} alt="InnerInk logo" className="brand-logo" />
            </motion.div>

            <motion.h1
              className="splash-title"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {brandWords.map((word, index) => (
                <motion.span
                  key={word}
                  className="brand-word"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.18, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="splash-quote"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              “Write the life you want to remember.”
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            className="landing-container"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="landing-glow" />
            <img src={heroLogo} alt="InnerInk logo" className="landing-logo" />
            <h1 className="landing-title">
              {brandWords.map((word) => (
                <span key={word} className="brand-word">
                  {word}
                </span>
              ))}
            </h1>
            <p className="landing-tagline">A place to breathe, reflect, and grow.</p>
            <button className="start-btn" onClick={() => navigate("/login")}>
              Start Your Journey
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Landing;