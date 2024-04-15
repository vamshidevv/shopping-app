import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  fetchProductsSuccess,
  removeFromWishlist,
  setSelectedProduct,
} from "../Redux/ProductSlice";
import { FadeLoader } from "react-spinners";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data } = useSelector((state) => state.products);
  const [currentColor, setCurrentColor] = useState("#72c0e5");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const changeDocumentTitle = () => {
      document.title = "Glam Basket - Products";
    };

    changeDocumentTitle();
    const interval = setInterval(() => {
      setCurrentColor((prevColor) =>
        prevColor === "#72c0e5" ? "#2f429a" : "#72c0e5"
      );
    }, 1000);

    axios.get("https://fakestoreapi.com/products").then((response) => {
      dispatch(fetchProductsSuccess(response.data));
      clearInterval(interval);
    });
  }, [dispatch]);

  const handleProductClick = (product) => {
    dispatch(setSelectedProduct(product));
  };
  const handleWishlistClick = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };
  const wishlistBtnClick = (product) => {
    if (product.inWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishList(product));
    }
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <FadeLoader color={currentColor} />
        </div>
      ) : (
        <>
          <div className="saleImgContainer">
            <img
              src="11517478281102-Home-page-Desktop_12.jpg"
              alt="saleImage"
              className="saleImg"
            />
          </div>

          <div className="products-container">
            {data.slice(2, 21).map((product) => {
              const isInWishlist = wishlist.includes(product.id);
              const maxLength = 20; // Maximum length for the product title
              const trimmedTitle =
                product.title.length > maxLength
                  ? product.title.substring(0, maxLength) + "..."
                  : product.title;
              return (
                <div
                  key={product.id}
                  className="card"
                  title={product.title}
                  style={{ color: "#282c3f", textDecoration: "none" }}
                >
                  <div>
                    <div className="line"></div>
                    <img
                      src={product.image}
                      alt="products"
                      className="prodImg"
                      onClick={() => {
                        handleProductClick(product);
                        navigate("/viewproducts");
                      }}
                    />
                    <div
                      className="details"
                      onClick={() => {
                        handleProductClick(product);
                        navigate("/viewproducts");
                      }}
                    >
                      <h6>{product.brand}</h6>
                      <h5>{trimmedTitle}</h5>
                      <h6>
                        {"$" + product.price}
                        <span style={{ color: "#2f429a" }}>(45%off)</span>
                      </h6>
                    </div>
                    <div
                      className="wishlist-btn-container"
                      title="Add To WishList"
                      onClick={() => handleWishlistClick(product.id)}
                    >
                      <button
                        className="wishlist-btn"
                        onClick={() => wishlistBtnClick(product)}
                        style={{
                          color: isInWishlist ? "white" : "#282c3f",
                          backgroundColor: isInWishlist
                            ? "#282c3f"
                            : "transparent",
                        }}
                      >
                        Wishlist{" "}
                        <span className="heart-icon">
                          <ion-icon
                            name={isInWishlist ? "heart" : "heart-outline"}
                            style={{
                              height: "20px",
                              width: "20px",
                              position: "absolute",
                              color: isInWishlist ? "#FF3E6C" : "#000000",
                            }}
                          ></ion-icon>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <a href="http://localhost:3000/products">
            <div className="sponcerImgContainer">
              <img
                src="e223fc79-fca6-4466-a88c-152ebc2774fc1710339132739-Sponsor-1.jpg"
                alt="niveaImg"
                className="niveaImg"
              />
            </div>
          </a>
          <div className="text-banner-container">
            <h4 className="text-banner-title">CATEGORIES TO BAG</h4>
          </div>

          <div className="circleImagesContainer">
            <img
              src="89f1bd9d-3a28-456d-888a-beff717a06f81594222908155-Shirts.jpg"
              alt="Shirts"
              className="circleImages"
            />
            <img
              src="9ff1f34e-9242-47fd-9566-e7d7a5c240511594222908483-T-shirt.jpg"
              alt="T-Shirts"
              className="circleImages"
            />
            <img
              src="720cf6ef-3be4-4825-8211-0125c942e3821594222907960-Jeans.jpg"
              alt="Jeans"
              className="circleImages"
            />
            <img
              src="2bac5e2d-337b-42c0-88c7-3d4e2dc464141594222908262-Shorts-_-Trousers.jpg"
              alt="Shorts & Trouser"
              className="circleImages"
            />
            <img
              src="ae14f627-9fd9-41ce-80a4-f107c316c7eb1594222907625-Casual-shoes.jpg"
              alt="casualshoes"
              className="circleImages"
            />
            <img
              src="f0f9b81a-b9d5-4b8b-94d5-ea878fa9b18e1594222834121-Infant-Essential.jpg"
              alt="Infant Essential"
              className="circleImages"
            />
          </div>

          <div className="coupons-container">
            <img
              src="a2a5a482-1041-4559-af3c-000a7dce1d2a1712230073908-COUPONS-CORNER -  - -7.jpg"
              alt="coupons"
              className="coupons-image"
            />
          </div>

          <a href="http://localhost:3000/products">
            <div className="crazy-deals-container">
              <img
                src="3a478c8f-6036-41b9-934c-6e2948baba761712230073896-Crazy-Deals -  - -1.jpg"
                alt="omg deals"
                className="crazy-deals"
              />
            </div>
          </a>
          <div className="featureTextContainer">
            <h4 className="featureText">Featured brands</h4>
          </div>
          <div className="featureImages">
            <a
              target={"_blank"}
              rel="noreferrer"
              href="https://www.swayamindia.com/?gad_source=1&gclid=Cj0KCQjw-r-vBhC-ARIsAGgUO2CIZF3AHPYzUsNK757T1hMsmV9rUkCkXy8qgJPHoDJDuroG5LRlsYQaAuQbEALw_wcB"
            >
              <img
                src="13606c4a-14e9-48e4-a56a-a9c3979e7db21650971940091-swayam_logo_new_1980_x_1280.jpg"
                alt="swayam"
                style={{
                  height: "200px",
                  width: "260px",
                  objectFit: "contain",
                }}
                className="featureHover"
              />
            </a>
            <a
              href="https://www2.hm.com/en_in/index.html"
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src="ff6b8a0b-83fa-4f9f-bbb3-0fc51fd9454a1647517771374-updated-logo.jpg"
                alt="h&m"
                style={{
                  height: "200px",
                  width: "260px",
                  objectFit: "contain",
                }}
                className="featureHover"
              />
            </a>
            <a
              href="https://www.spaces.in/?utm_source=adyogi&utm_medium=google-search&utm_campaign=SPAC_7870_adyogi_Brand-Search_Engage_Brand-21014441725&gad_source=1&gclid=Cj0KCQjw-r-vBhC-ARIsAGgUO2DFM1gGncsTmU4OxiYikvJQgdY-TZL8Q4OxKzf7YGUED6xVLJNYtZUaAn-5EALw_wcB"
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src="9830dff5-9056-402f-9bf0-ba3ead0abcaf1647499996169-SPACES - -LOGO-01 - BEDBATHRUGS-.jpg"
                alt="spaces"
                style={{
                  height: "200px",
                  width: "260px",
                  objectFit: "contain",
                }}
                className="featureHover"
              />
            </a>
            <a
              href="https://www.marksandspencer.in/"
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src="06f9e39d-a4d4-4ba4-b4cb-960c87ff5d511647499996189-M-S-Logo.jpg"
                alt="marks&spencers"
                style={{
                  height: "200px",
                  width: "260px",
                  objectFit: "contain",
                }}
                className="featureHover"
              />
            </a>
            <a
              href={"https://www.ddecor.com/"}
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src="a38e440e-1ff7-4092-acbe-46d74b38384a1551443106457-Home-page-Desktop-Brands_13.jpg"
                alt="D-decor"
                style={{
                  height: "200px",
                  width: "260px",
                  objectFit: "contain",
                }}
                className="featureHover"
              />
            </a>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Product;
