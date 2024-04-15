import React from "react";

const EmptyCart = () => {
 
  return (
    <>
      <div className="empty-container">
        <div className="empty-details">
          <div className="empty-cart-image">
            <img
              src="empty-cart-2-jjbce159nka8571l91lxx8.jpg"
              alt="empty cart"
            />
          </div>
          <div className="empty-cart-txt">
            <h2 style={{ fontSize: "1.3rem" }}>Hey, it feels so light!</h2>
            <span>There is nothing in your bag. Let's add some items.</span>
          </div>
          <a href="/wishlist">
            <div className="empty-cart-btn">
              <button>ADD ITEMS FROM WISHLIST</button>
            </div>
          </a>
        </div>
      </div>
      <div className="cart-footer-container" style={{ marginTop: "100px" }}>
        <div className="payment-gateways">
          <div>
            {" "}
            <img src="footer-bank-ssl.png" alt="bank-ssl" />
          </div>
          <div>
            {" "}
            <img src="footer-bank-visa.png" alt="bank-visa" />
          </div>
          <div>
            {" "}
            <img src="footer-bank-mc.png" alt="bank-mc" />
          </div>
          <div>
            {" "}
            <img src="footer-bank-ae.png" alt="bank-ae" />
          </div>
          <div>
            {" "}
            <img src="footer-bank-dc.png" alt="bank-dc" />
          </div>
          <div>
            {" "}
            <img src="footer-bank-nb.png" alt="bank-nb" />
          </div>
          <div>
            {" "}
            <img src="footer-bank-cod.png" alt="bank-cod" />
          </div>
          <div>
            {" "}
            <img src="footer-bank-rupay.png" alt="bank-rupay" />
          </div>
          <div>
            {" "}
            <img src="footer-bank-paypal.png" alt="bank-paypal" />
          </div>
          <div>
            {" "}
            <img src="footer-bank-bhim.png" alt="bank-bhim" />
          </div>
        </div>
        <div className="support-txt">
          <h6 style={{ paddingTop: "10px" }}>
            Need Help?{" "}
            <a href="/contactus">
              <span>Contact Us</span>
            </a>
          </h6>
        </div>
      </div>
    </>
  );
};

export default EmptyCart;
