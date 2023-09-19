// src/Components/ImageDragPreview.jsx
import React from 'react';

const ImageDragPreview = ({ image }) => {
  if (!image || !image.webformatURL) {
    return null;
  }

  return (
    <div className="image-drag-preview">
      <img src={image.webformatURL} alt="Preview" style={{ width: '100px' }} />
    </div>
  );
};

export default ImageDragPreview;
