import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';
import ImageList from './ImageList';

function App() {
  // states
  const [images, setImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fileInputRef = useRef(null);

  //handlers
  const onDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer ? e.dataTransfer.files : e.target.files);
  
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    }))
    .then(urls => {
      setImages(prevImages => [...prevImages, ...urls]);
    })
    .catch(error => {
      console.error('Error reading files:', error);
    });
  
    if (e.target.files) {
      e.target.value = null; // Reset the input value to allow selecting the same file again
    }
  };
  

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onImageClick = (url) => {
    setSelectedImage(url);
    setIsModalVisible(true);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };
  
  

  // render
  return (
    <div className="App">
      <div id="dropDiv" onDrop={onDrop} onDragOver={onDragOver} onClick={openFileDialog}>
        <div id="dropDivText">
          <span className="material-symbols-outlined">image</span>
          <p>Drop images here</p>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => onDrop(e)}  accept="image/*" multiple/>

        </div>
      </div>
      <ImageList images={images} onDelete={deleteImage} onImageClick={onImageClick} />
      {isModalVisible && (
        <div id="modalDiv" onClick={() => setIsModalVisible(false)}
        >
          <img src={selectedImage} alt="" style={{ maxWidth: '60%', maxHeight: '60%' }} />
        </div>
      )}
    </div>
  );
}

export default App;
