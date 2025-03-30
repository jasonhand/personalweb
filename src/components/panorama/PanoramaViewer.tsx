import React, { useState } from 'react';

const PanoramaViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Sample panorama images - replace with your actual panoramas
  const panoramas = [
    {
      src: '/images/panoramas/panorama1.jpg',
      alt: 'Mountain Vista'
    },
    {
      src: '/images/panoramas/panorama2.jpg',
      alt: 'Ocean Sunset'
    },
    {
      src: '/images/panoramas/panorama3.jpg',
      alt: 'City Skyline'
    },
    {
      src: '/images/panoramas/panorama5.jpg',
      alt: 'City Skyline'
    },
    {
      src: '/images/panoramas/panorama6.jpg',
      alt: 'City Skyline'
    },
  ];

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % panoramas.length);
  };

  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + panoramas.length) % panoramas.length);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const currentPanorama = panoramas[currentIndex];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {/* Image container */}
      <div className="relative w-full h-full flex justify-center items-center px-8 md:px-16">
        <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500">
          <img 
            src={currentPanorama.src} 
            alt={currentPanorama.alt} 
            className="max-w-full max-h-full object-contain rounded-lg cursor-pointer transition-all duration-700 hover:scale-105 hover:rotate-1 transform-gpu"
            onClick={toggleFullScreen}
          />
        </div>
        
        {/* Navigation arrows overlaid on image */}
        <button 
          onClick={goToPrevImage}
          className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full p-2 transition-all z-10"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <button 
          onClick={goToNextImage}
          className="absolute right-10 md:right-20 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full p-2 transition-all z-10"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      
      {/* Simple dot indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {panoramas.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Full screen overlay */}
      {isFullScreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" 
          onClick={toggleFullScreen}
        >
          <button 
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
            aria-label="Close full screen view"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullScreen();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Full screen navigation */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              goToPrevImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full p-3 transition-all"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              goToNextImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full p-3 transition-all"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          
          <img 
            src={currentPanorama.src} 
            alt={currentPanorama.alt}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent clicks on the image from closing the modal
          />
        </div>
      )}
    </div>
  );
};

export default PanoramaViewer; 