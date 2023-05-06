import React from 'react';

const ImageList = ({ images, onDelete, onImageClick }) => {
  return (
    <div>
      {images.map((image, index) => (
        <div key={index} style={{ display: 'inline-block', position: 'relative' }}>
          <img src={image} alt="" style={{ width: '250px', height: '250px', objectFit: 'cover', margin: '5px' }} className="image-thumbnail" onClick={() => onImageClick(image)}/>
          <button
            onClick={() => onDelete(index)}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
