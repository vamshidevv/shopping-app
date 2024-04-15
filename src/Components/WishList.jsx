import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import "mdb-ui-kit/css/mdb.min.css";
import { removeFromWishlist, addtocart } from "../Redux/ProductSlice";
import Swal from "sweetalert2";
import WishListFooter from "./WishListFooter";
import EmptyWishlist from "./EmptyWishlist";
import SizeSelectionDialog from "./SizeSelectionDialog";
import { setSelectedProduct } from "../Redux/ProductSlice";
import { useNavigate } from "react-router-dom";
import WishListLogin from "./WishlistLogin";
const WishList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [currentColor, setCurrentColor] = useState("#72c0e5");
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [selectedProduct, setSelectedProducts] = useState(null);
  const products = useSelector((state) => state.wishlist.wislistproduct);
  const userName = useSelector((state) => state.uName.userName);

  useEffect(() => {
    const changeDocumentTitle = () => {
      document.title = "Glam Basket - Wishlist";
    };

    changeDocumentTitle();
    const interval = setInterval(() => {
      setCurrentColor((prevColor) =>
        prevColor === "#72c0e5" ? "#2f429a" : "#72c0e5"
      );
    }, 1000);

    setTimeout(() => {
      setLoading(false);
      clearInterval(interval);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleMoveToBag = (product) => {
    setSelectedProducts(product);
    setShowSizeDialog(true);
  };

  const handleSizeSelect = (size) => {
    if (selectedProduct) {
      dispatch(addtocart({ product: selectedProduct, size }));
      dispatch(removeFromWishlist(selectedProduct.id));
    }
    setShowSizeDialog(false);
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
  if (userName === "") {
    return <WishListLogin />;
  } else if (products.length === 0) {
    return <EmptyWishlist />;
  }

  const items = products.length;

  return (
    <>
      <div className="wishlist-txt">
        {" "}
        My Wishlist <span>{items} items</span>{" "}
      </div>
      <div className="wish-container">
        <div className="wish-left-container">
          {products.map((product) => (
            <div className="wishlist-card" key={product.id}>
              <div className="wishlist-image">
                <img
                  style={{ cursor: "pointer" }}
                  title={product.title}
                  src={product.image}
                  alt="product"
                  className="view-product-image"
                  onClick={() => {
                    dispatch(setSelectedProduct(product));
                    navigate("/viewproducts");

                    console.log("wishlisted image cliked..");
                  }}
                />
              </div>
              <div className="wishlist-details">
                <h5>
                  {product.title.length > 20
                    ? product.title.substring(0, 19) + "..."
                    : product.title}
                </h5>
                <h6>
                  {"$" + product.price}
                  <span style={{ color: "#2f429a", fontSize: "0.7rem" }}>
                    (45% off)
                  </span>
                </h6>

                <div className="wishlist-rmv-btn">
                  <button
                    onClick={() => {
                      Swal.fire({
                        html: `
                            <div class="custom-swal-content">
                              <div class="swal-image-wrapper">
                                <img src="${product.image}" alt="Product Image">
                              </div>
                              <div class="swal-text-wrapper">
                                <p>item removed</p>
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
                      dispatch(removeFromWishlist(product.id));
                    }}
                  >
                    <ion-icon name="close-outline"></ion-icon>
                  </button>
                </div>
              </div>
              <div className="move-btn-container">
                <button onClick={() => handleMoveToBag(product)}>
                  MOVE TO BAG
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WishListFooter />
      {showSizeDialog && (
        <SizeSelectionDialog
          onClose={() => setShowSizeDialog(false)}
          onSelectSize={handleSizeSelect}
        />
      )}
    </>
  );
};

export default WishList;
