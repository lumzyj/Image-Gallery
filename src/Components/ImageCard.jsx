// Components/ImageCard.js
import React from 'react';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';

const ImageCard = ({ image, onImageDrag }) => {
  const tags = image.tags.split(',');

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.IMAGE_CARD,
    item: { id: image.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg ${
        isDragging ? 'opacity-50' : ''
      }`}
      ref={(node) => drag(preview(node))}
    >
      <img src={image.webformatURL} alt="" className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">
          Photo {image.user}
        </div>
        <ul>
          <li>
            <strong>Views: </strong>
            {image.views}
          </li>
          <li>
            <strong>Downloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;


