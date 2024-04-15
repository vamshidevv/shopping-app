import React from "react";

const EmptyWishlist = () => {
  return (
    <>
      <div className="empty-container">
        <div className="empty-details">
        <div className="empty-cart-txt" >
            <h2 style={{ fontSize: "1.3rem" }}>YOUR WISHLIST IS EMPTY</h2>
            <span>Add items that you like to your wishlist. Review them anytime and easily move them to the bag.</span>
          </div>
          <div className="empty-cart-image" style={{marginTop:"25px"}}>
            <img style={{height:"250px",width:"300px",objectFit:"contain"}}
              src="empty-wishlist.png"
              alt="empty cart"
            />
          </div>
       
          <a href="/products">
            <div className="empty-cart-btn">
              <button>CONTINUE SHOPPING</button>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default EmptyWishlist;
