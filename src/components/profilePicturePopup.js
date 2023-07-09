import React, {useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

const ImageUploadWindow = ({ imageUrl, onClose }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [scale, setScale] = useState(1);
    const editorRef = React.useRef();


    
  const handleDrop = useCallback((acceptedFiles) => {
    setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
  }, []);

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
      // Handle the cropped image here
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
  });

  return (
    <div className='container-login' onWheel={handleWheel}>
        
        <div>
        <div {...getRootProps()} className={isDragActive ? 'drag-active' : ''}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag and drop profile picture or click to select files</p>
          )}
        </div>
        {selectedImage && (
          <div>
            <AvatarEditor
              ref={editorRef}
              image={selectedImage}
              width={250}
              height={250}
              border={25}
              color={[106, 107, 110, 0.6]} 
              scale={scale}
              rotate={0}
              borderRadius={125} // Set the borderRadius to half of width/height to create a circle
              style={{ borderRadius: '50%' }} // Apply CSS styling for the circle shape
            />
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={scale}
              onChange={handleScaleChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
    </div>
)
};

export default ImageUploadWindow;
