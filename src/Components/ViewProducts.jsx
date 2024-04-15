import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import { FadeLoader } from "react-spinners";
import { addtocart } from "../Redux/ProductSlice";
import Swal from "sweetalert2";
import ReactImageMagnify from "react-image-magnify"; // Importing react-image-magnify
import { useNavigate } from "react-router-dom";

const ViewProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [currentColor, setCurrentColor] = useState("#72c0e5");
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeError, setShowSizeError] = useState(); // State to manage error message display
  const product = useSelector((state) => state.products.selectedProduct);

  const gotobag = () => {
    navigate("/cart");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prevColor) =>
        prevColor === "#72c0e5" ? "#2f429a" : "#72c0e5"
      );
    }, 1000);

    // Simulating asynchronous data fetching
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
      clearInterval(interval); // Clear interval after loading is done
    }, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleSize = (size) => {
    setSelectedSize(size);
    setShowSizeError(false);
  };

  const handleAddToBag = () => {
    if (selectedSize === "") {
      setShowSizeError(true);
      document
        .querySelector(".size-container")
        .classList.add("animate-left-to-right");
      setTimeout(() => {
        document
          .querySelector(".size-container")
          .classList.remove("animate-left-to-right");
      }, 100);
    } else if (
      document.querySelector(".add-to-bag").innerHTML === "GO TO BAG"
    ) {
      gotobag();
    } else {
      dispatch(addtocart({ product, size: selectedSize }));
      document.querySelector(".add-to-bag").innerHTML = "GO TO BAG";

      Swal.fire({
        html: `
          <div class="custom-swal-content">
            <div class="swal-image-wrapper">
              <img src="${product.image}" alt="Product Image">
            </div>
            <div class="swal-text-wrapper">
              <p>Added to Bag</p>
            </div>
          </div>
        `,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "custom-swal-popup",
        },
      });
    }
    // dispatch(increment());
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <FadeLoader color={currentColor} />
      </div>
    );
  }

  if (!product) {
    return <div>No product details available</div>;
  }

  return (
    <>
      <div className="main-container">
        <div className="view-card" title={product.title}>
          <div className="image-container">
            {" "}
            {/* Wrapper div */}
            <ReactImageMagnify
              className="image-magnify"
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: false,
                  src: product.image,
                  height: 400,
                  width: 300,
                },
                largeImage: {
                  src: product.image,
                  width: 1200,
                  height: 1500,
                },
                enlargedImagePosition: "top",
              }}
            />
          </div>
        </div>
        <div className="view-details">
          <h5>{product.title}</h5>
          <h6>
            {"$" + product.price}
            <span style={{ color: "#2f429a", fontSize: "14px" }}>(45%off)</span>
          </h6>
          <p style={{ width: "100%" }}>
            Rating {product.rating.rate}
            <ion-icon
              name="star-sharp"
              style={{
                color: "rgb(3 166 133 / 67%)",
                position: "relative",
                top: "1px",
                left: "2px",
                zIndex: -1,
              }}
            ></ion-icon>
          </p>
          <p>inclusive of all taxes</p>
          <div>100% Original Products</div>
          <div>Pay on delivery might be available</div>
          <div>Easy 14 days returns and exchanges</div>
          <div>Try & Buy might be available</div>
          <div>
            <h5>Select Size</h5>
          </div>
          {showSizeError && ( // Conditionally render the size error message
            <div id="size-error" style={{ color: "red" }}>
              Please select a size
            </div>
          )}
          <div className="size-container">
            <button
              className={`size-button ${
                selectedSize === "XS" ? "selected" : ""
              }`}
              onClick={() => handleSize("XS")}
            >
              XS
            </button>
            <button
              className={`size-button ${
                selectedSize === "S" ? "selected" : ""
              }`}
              onClick={() => handleSize("S")}
            >
              S
            </button>
            <button
              className={`size-button ${
                selectedSize === "M" ? "selected" : ""
              }`}
              onClick={() => handleSize("M")}
            >
              M
            </button>
            <button
              className={`size-button ${
                selectedSize === "L" ? "selected" : ""
              }`}
              onClick={() => handleSize("L")}
            >
              L
            </button>
            <button
              className={`size-button ${
                selectedSize === "XL" ? "selected" : ""
              }`}
              onClick={() => handleSize("XL")}
            >
              XL
            </button>
          </div>
          <button
            className="add-to-bag"
            onClick={() => {
              handleAddToBag();
            }}
          >
            <ion-icon
              name="bag-sharp"
              style={{ marginRight: "5px" }}
            ></ion-icon>
            Add to Bag
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewProducts;
