// AdminUploadImages.js
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const AdminUploadImages = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  useEffect(() => {
    // Fetch the list of uploaded images and their URLs when the component mounts
    const storageRef = firebase.storage().ref();

    storageRef.listAll().then((res) => {
      const promises = res.items.map((item) => item.getDownloadURL());
      Promise.all(promises)
        .then((urls) => {
          setUploadedImages(urls);
        })
        .catch((error) => {
          console.error('Error fetching image URLs:', error);
        });
    }).catch((error) => {
      console.error('Error fetching images:', error);
    });
  }, []);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = () => {
    // The previous upload logic (unchanged)
  };

  const handleImageSelect = (event) => {
    const selectedIndex = event.target.value;
    setSelectedImage(selectedIndex);
    setSelectedImageUrl(uploadedImages[selectedIndex]);
  };

  return (
    <div>
      {/* Your file input and upload button (unchanged) */}
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Images</button>

      {/* Dropdown to select images */}
      <select value={selectedImage} onChange={handleImageSelect}>
        <option value="">Select an image</option>
        {uploadedImages.map((imageUrl, index) => (
          <option key={index} value={index}>
            {imageUrl.split('/').pop()} {/* Display the image name as an option */}
          </option>
        ))}
      </select>

      {/* Image preview */}
      {selectedImageUrl && (
        <div>
          <h2>Preview:</h2>
          <img src={selectedImageUrl} alt="Selected Image" width="200" />
        </div>
      )}
    </div>
  );
};

export default AdminUploadImages;