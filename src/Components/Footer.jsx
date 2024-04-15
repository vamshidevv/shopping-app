import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>About Us</h2>
            <p>
              We are an online shopping platform dedicated to providing
              high-quality products and exceptional customer service. Shop with
              us for all your needs!
            </p>
            <h2 style={{ fontSize: "0.9rem", color: "gray" }}>
              support@glambasket.com
            </h2>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/contactus">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-section social">
            <h2 style={{ fontSize: "13px" }}>KEEP IN TOUCH</h2>
            <div className="social-icons">
              <a href="https://www.instagram.com">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com">
                <FaFacebook />
              </a>
              <a href="https://www.twitter.com">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Glam Basket. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
