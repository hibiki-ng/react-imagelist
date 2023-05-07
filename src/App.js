import './App.css';
import { useState, useRef } from 'react';
import PhotoGallery from './PhotoGallery';

function App() {
  // states
  const [images, setImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fileInputRef = useRef(null);

  //handlers
  // gère le drop des images
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
      e.target.value = null;
    }
  };
  
  // fait un preventDefault sur le drag d'image pour éviter que l'image soit ouverte dans le navigateur
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // supprime une image de la liste
  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // affiche l'image en grand
  const onImageClick = (url) => {
    setSelectedImage(url);
    setIsModalVisible(true);
  };

  // ouvre la fenêtre de sélection de fichier
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
      <PhotoGallery images={images} onDelete={deleteImage} onImageClick={onImageClick} />
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
