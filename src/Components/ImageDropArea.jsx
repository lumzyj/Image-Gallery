// Components/ImageDropArea.js
import React from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

const ImageDropArea = ({ onDropImage }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE_CARD,
    drop: (item) => {
      onDropImage(item.id);
    },
  });

  return <div ref={drop} className="image-drop-area"></div>;
};

export default ImageDropArea;
