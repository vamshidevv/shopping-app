// SizeSelectionDialog.js
import React from "react";

const SizeSelectionDialog = ({ onClose, onSelectSize }) => {
  const handleSizeSelect = (size) => {
    onSelectSize(size);
    onClose();
  };

  return (
    <div className="size-dialog-overlay">
      <div className="size-dialog">
        <h3>Select Size</h3>
        <div className="size-options">
          <button onClick={() => handleSizeSelect("XS")}>XS</button>
          <button onClick={() => handleSizeSelect("S")}>S</button>
          <button onClick={() => handleSizeSelect("M")}>M</button>
          <button onClick={() => handleSizeSelect("L")}>L</button>
          <button onClick={() => handleSizeSelect("XL")}>XL</button>
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SizeSelectionDialog;
