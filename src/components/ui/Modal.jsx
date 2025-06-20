import  { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const ImageSliderModal = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200 hover:scale-110"
        >
          <X size={24} />
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={goToPrevious}
            disabled={isAnimating}
            className="absolute left-6 z-20 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={goToNext}
            disabled={isAnimating}
            className="absolute right-6 z-20 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Image Container */}
        <div className="relative max-w-6xl max-h-full flex items-center justify-center">
          <div className="relative overflow-hidden rounded-lg shadow-2xl">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className={`max-w-full max-h-[85vh] object-contain transition-all duration-300 ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{ minHeight: '200px', minWidth: '200px' }}
            />
          </div>
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="px-4 py-2 bg-black bg-opacity-50 text-white rounded-full text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        )}

        {/* Thumbnail Navigation */}
        {images.length > 1 && images.length <= 10 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-2 bg-black bg-opacity-50 rounded-full p-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed ${
                    index === currentIndex 
                      ? 'border-white shadow-lg' 
                      : 'border-gray-500 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dot Navigation for many images */}
        {images.length > 10 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-2 bg-black bg-opacity-50 rounded-full px-4 py-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 disabled:cursor-not-allowed ${
                    index === currentIndex 
                      ? 'bg-white' 
                      : 'bg-gray-500 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ImageSliderModal;