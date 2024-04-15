import React, { useState } from "react";

const QuantityDialog = ({ onClose, onSelect }) => {
  // eslint-disable-next-line
  const [quantity, setQuantity] = useState(1);

  const handleSelect = (value) => {
    setQuantity(value);
    onSelect(value);
    onClose();
  };

  return (
    <div className="quantity-dialog-overlay">
      <div className="quantity-dialog">
        <h3>Select Quantity</h3>
        <div className="quantity-options">
          {[...Array(10)].map((_, index) => (
            <button key={index} onClick={() => handleSelect(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default QuantityDialog;
