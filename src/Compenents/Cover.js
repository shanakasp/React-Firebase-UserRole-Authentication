import React, { useState, useEffect } from 'react';

const Cover = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [timerId, setTimerId] = useState(null);
  useEffect(() => {
    // Load images from local storage (you can replace this with your own logic to fetch images)
    const imageUrls = [
      'https://st4.depositphotos.com/17769474/19843/i/600/depositphotos_198433440-stock-photo-fall-colors-wasatch-mountains-gold.jpg',
      'https://st4.depositphotos.com/17769474/19843/i/450/depositphotos_198433028-stock-photo-tropical-paradise-waipio-valley-big.jpg',
      'https://st4.depositphotos.com/17769474/19843/i/450/depositphotos_198433716-stock-photo-fall-colors-wasatch-mountains-gold.jpg',
      'https://st4.depositphotos.com/17769474/19843/i/450/depositphotos_198432990-stock-photo-tropical-paradise-waipio-valley-big.jpg',
      'https://st4.depositphotos.com/17769474/19842/i/450/depositphotos_198423832-stock-photo-winter-day-grand-teton-national.jpg',
    ];
    setPhotos(imageUrls);
 // Start the timer to change images every 5 seconds
 const intervalId = setInterval(() => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  }, 5000);

  // Save the timer ID in state to clear it later
  setTimerId(intervalId);

  // Clean up the interval when the component unmounts to avoid memory leaks
  return () => clearInterval(intervalId);
}, []); // Empty dependency array, so the effect runs only once on mount

const handleLeftClick = () => {
  setCurrentPhotoIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
};

const handleRightClick = () => {
  setCurrentPhotoIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
};

if (photos.length === 0) {
  return <div>No photos available.</div>;
}

const currentImageUrl = photos[currentPhotoIndex];

const imageContainerStyle = {
  width: '800px',
  height: '400px',
  overflow: 'hidden', // Ensure the image doesn't overflow the container
};

const imageStyle = {
  width: '100%', // Make the image fill the container width
  height: '100%', // Make the image fill the container height
  objectFit: 'cover',
};

return (
  <div className="cover-container">
    <div className="cover-image" style={imageContainerStyle}>
      <img src={currentImageUrl} alt="Cover" style={imageStyle} />
    </div>

    <div className="cover-navigation">
      <div className="cover-left-arrow" onClick={handleLeftClick}>
        &#8249;
      </div>
      <div className="cover-right-arrow" onClick={handleRightClick}>
        &#8250;
      </div>
    </div>
  </div>
);
};

export default Cover;