import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 🔹 Scroll listener — check user scrolled or not
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {  // 300px scroll hone ke baad button dikhe
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Click pe page top par scroll
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-1 px-5 py-3 rounded-lg text-white bg-red-600 cursor-pointer"
         
        >
          <FaArrowUp/>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
