import React from "react";

const WishListLogin = () => {
  return (
    <>
      <div className="empty-container">
        <div className="empty-details">
          <div className="empty-cart-txt">
            <h2 style={{ fontSize: "1.3rem" }}>Please Login</h2>
            <span>Login to view items in your wishlist.</span>
          </div>
          <div className="empty-cart-image" style={{ marginTop: "25px" }}>
            <img
              style={{ height: "250px", width: "300px", objectFit: "contain" }}
              src="empty-wishlist.png"
              alt="empty cart"
            />
          </div>

          <a href="/signin">
            <div className="empty-cart-btn">
              <button>Login</button>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default WishListLogin;
