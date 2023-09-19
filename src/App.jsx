// src/App.jsx
import React, { useState, useEffect } from 'react';
import ImageCard from './Components/ImageCard';
import ImageSearch from './Components/ImageSearch';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ImageDropArea from './Components/ImageDropArea';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [previewImage, setPreviewImage] = useState(null); // Add state for the preview image

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${import.meta.env.VITE_APP_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  const handleImageDrag = (draggedImageId, targetImageId) => {
    const updatedImages = [...images];
    const draggedImageIndex = updatedImages.findIndex(
      (image) => image.id === draggedImageId
    );
    const targetImageIndex = updatedImages.findIndex(
      (image) => image.id === targetImageId
    );

    [updatedImages[draggedImageIndex], updatedImages[targetImageIndex]] = [
      updatedImages[targetImageIndex],
      updatedImages[draggedImageIndex],
    ];

    setImages(updatedImages);
  };

  const handleDropImage = (imageId) => {
    const updatedImages = images.filter((image) => image.id !== imageId);
    setImages(updatedImages);
  };

  const handleImagePreview = (image) => {
    // Set the preview image when an image is clicked
    setPreviewImage(image);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto">
        <ImageSearch searchText={(text) => setTerm(text)} />
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onImageDrag={handleImageDrag}
              onImagePreview={handleImagePreview} // Pass the preview handler
            />
          ))}
        </div>
        <ImageDropArea onDropImage={handleDropImage} />
        {previewImage && (
          // Render the preview image when it is set
          <ImageDragPreview image={previewImage} />
        )}
      </div>
    </DndProvider>
  );
}

export default App;






