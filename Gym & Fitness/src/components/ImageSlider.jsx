import React, { useState, useRef, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      className="image-slider-container" 
      ref={containerRef}
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent text highlights
        setIsDragging(true);
      }}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Full Background) */}
      <img src={afterImage} alt="After" className="slider-img img-after" />
      <span className="slider-label label-after">{afterLabel}</span>

      {/* Before Image (Overlay clipped) */}
      <img 
        src={beforeImage} 
        alt="Before" 
        className="slider-img img-before" 
        style={{ 
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` 
        }}
      />
      <span 
        className="slider-label label-before"
        style={{ 
          opacity: sliderPosition > 15 ? 1 : 0 
        }}
      >
        {beforeLabel}
      </span>

      {/* Divider Line & Handle */}
      <div 
        className="slider-divider" 
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="slider-handle">
          <span className="handle-arrow">&#9664;&#9654;</span>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
