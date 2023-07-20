import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import { BASE_BACKEND_URL } from '../../config';

const ImageUploadWindow = ({ imageUrl, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = React.useRef();

  const handleDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file (assuming single file selection)
    setSelectedImage(file);
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    updateScale(newScale);
  };

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

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'image.png');
        const token = localStorage.getItem('token');
        fetch(`${BASE_BACKEND_URL}/userdata/upload-profile-image`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response from the server
            console.log('Image uploaded:', data);
            localStorage.removeItem('profileImage');
            location.reload();
          })
          .catch(error => {
            // Handle any errors
            console.error('Error uploading image:', error);
          });
      }, 'image/png');
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

  const defaultImage = localStorage.getItem('profileImage') || 'photos-optimized/user-pic.png'; 

  return (
    <div className="container-login" onWheel={handleWheel}>
      <div {...getRootProps()}> 
        <div  className='picture-upload'>
          <p>Drag and drop profile picture</p>
          <input
            type="file"
            id="imageInput"
            accept="image/*" // This will only allow image files to be selected
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="imageInput">
            <button>click to choose image from files</button>
          </label>
        </div>
        
        {selectedImage || defaultImage ? (
          <div className='profile-picture-editor'>
            <AvatarEditor
              ref={editorRef}
              image={selectedImage || defaultImage}
              width={250}
              height={250}
              border={25}
              color={[106, 107, 110, 0.6]}
              scale={scale}
              rotate={0}
              borderRadius={125} // Set the borderRadius to half of width/height to create a circle
              style={{ borderRadius: '50%' }} // Apply CSS styling for the circle shape
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