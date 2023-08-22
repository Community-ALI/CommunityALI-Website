import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

const ImageUploadWindow = ({ imageUrl, onClose, setFormData}) => { // imageUrl could be used to set the default image if we want to
  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = React.useRef();
  const fileInputRef = React.useRef(null);

  const handleDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const handleButtonClick = () => {
    event.preventDefault();
    fileInputRef.current.click(); // Trigger the file input dialog when the custom button is clicked
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file (assuming single file selection)
    setSelectedImage(file);
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    updateScale(newScale);
  };

  // when the component mounts, have the user upload a file
  useEffect(() => {
    handleButtonClick();
  }, []);

  const updateScale = (newScale) => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const editorWidth = editorRef.current.props.width;
      const editorHeight = editorRef.current.props.height;

      const imageWidth = canvas.width;
      const imageHeight = canvas.height;

      const minWidthScale = editorWidth / imageWidth;
      const minHeightScale = editorHeight / imageHeight;

      const minScale = Math.max(minWidthScale, minHeightScale);
      const maxScale = 2; // Maximum scale value

      const clampedScale = Math.max(minScale, Math.min(maxScale, newScale));
      setScale(clampedScale);
    } else {
      setScale(newScale);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();

    const scaleIncrement = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.1, Math.min(2, scale + scaleIncrement));
    updateScale(newScale);
  };

  const handleSave = async function() {
    event.preventDefault();
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
  
      // Convert canvas data to a Blob
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          // Create a new File object from the Blob
          const file = new File([blob], 'edited-image.png', { type: 'image/png' });
  
          // Update the form data with the new File object
          setFormData((prevData) => ({ ...prevData, file }));
  
          // Close the modal or window
          onClose();
  
          // Resolve the Promise
          resolve();
        }, 'image/png');
      });
    }
  };
  

  useEffect(() => {
    // Disable scrolling on the document body when the component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling on the document body when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
    noClick: true, 
  });

  const defaultImage =  'Photos/PhotoUploaderDefault.png'; 

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  let desiredWidth = screenWidth * 0.5;
  let desiredHeight = (desiredWidth * 2) / 3;

  if (desiredHeight > screenHeight * 0.5) {
    desiredHeight = screenHeight * 0.5;
    desiredWidth = (desiredHeight * 3) / 2;
  }

  return (
    <div className="container-login" onWheel={handleWheel}>
      <div className='container-profile-picture' {...getRootProps()}> 
        <div  className='picture-upload'>
          <p>Drag and drop profile picture</p>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <button className='file-upload-button' onClick={handleButtonClick}>Choose image from files</button>
        </div>
        
        {selectedImage || defaultImage ? (
          <div className='profile-picture-editor'>
            <AvatarEditor id='profile-icon-thumbnail'
              ref={editorRef}
              image={selectedImage || defaultImage}
              border={25}
              color={[106, 107, 110, 0.6]}
              scale={scale}
              rotate={0}
              borderRadius={5}
              width={desiredWidth} 
              height={desiredHeight} 
               
               style={{ borderRadius: '2%' }} // make it slightly round
            />
            <input className='zoom-slider' type="range" min="1" max="2" step="0.1" value={scale} onChange={handleScaleChange} />
            <button className='save-profile-image-button' onClick={handleSave}>Save</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ImageUploadWindow;