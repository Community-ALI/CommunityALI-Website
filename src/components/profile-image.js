import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

const ProfilePictureUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [scale, setScale] = useState(1);
    const editorRef = React.useRef();
  
    const handleDrop = useCallback((acceptedFiles) => {
      setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
    }, []);
  
    const handleScaleChange = (e) => {
      setScale(parseFloat(e.target.value));
    };
  
    const handleSave = () => {
      if (editorRef.current) {
        const canvas = editorRef.current.getImageScaledToCanvas();
        // Handle the cropped image here
      }
    };
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleDrop,
      accept: 'image/*',
    });
  
    return (
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
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={scale}
              rotate={0}
            />
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={scale}
              onChange={handleScaleChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
    );
  };

export default ProfilePictureUpload