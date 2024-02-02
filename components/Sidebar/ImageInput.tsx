import React, { useState } from "react";
import "./SideMenu.css";

const ImageInput = () => {
  const [showInput, setShowInput] = useState(false);

  const handleMouseEnter = () => {
    setShowInput(true);
  };

  const handleMouseLeave = () => {
    setShowInput(false);
  };

  const handleInputChange = (e:any) => {
    const file = e.target.files[0];
    console.log("Selected file:", file.name);
    // Handle file upload logic here
  };

  return (
    <div className="image-with-input">
      <label className="file-input-label">
        <div
          className="image-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src="https://via.placeholder.com/150" alt="Profile" />
          {showInput && (
            <div className="file-input-overlay">
              <input
                type="file"
                onChange={handleInputChange}
                className="file-input"
              />
              <span className="gallery-icon">Gallery Icon</span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageInput;
