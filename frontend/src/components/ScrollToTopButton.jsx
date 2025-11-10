import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          title="Scroll To Top"
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 rounded-full text-white bg-red-600  cursor-pointer"
        >
          <FaArrowUp className='animate-bounce' />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
