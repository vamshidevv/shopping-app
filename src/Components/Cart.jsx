import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import "mdb-ui-kit/css/mdb.min.css";
import {
  getTotalItems,
  getTotalMrp,
  removeFromCart,
} from "../Redux/ProductSlice";
import EmptyCart from "./EmptyCart";
import QuantityDialog from "./QuantityDialog";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentColor, setCurrentColor] = useState("#72c0e5");
  const [showAllDiscounts, setShowAllDiscounts] = useState(false);
  const products = useSelector((state) => state.addtocart.cart);
  const [showQuantityDialog, setShowQuantityDialog] = useState(false); // State variable to manage dialog visibility
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState({}); // State variable
  // const [totalItems, setTotalItems] = useState([]);
  const userName = useSelector((state) => state.uName.userName);

  let totalMRP = 0;

  products.forEach((product) => {
    const quantity = selectedQuantity[product.id] || 1;
    totalMRP += product.price * quantity;
  });

  const openQuantityDialog = (product) => {
    setSelectedProduct(product);
    setShowQuantityDialog(true);
  };

  // Function to close the quantity dialog
  const closeQuantityDialog = () => {
    setSelectedProduct(null);
    setShowQuantityDialog(false);
  };

  // Function to handle quantity selection
  const handleQuantitySelect = (quantity) => {
    setSelectedQuantity({
      ...selectedQuantity,
      [selectedProduct.id]: quantity,
    });
    closeQuantityDialog();
  };

  useEffect(() => {
    const changeDocumentTitle = () => {
      document.title = "Glam Basket - Cart";
    };

    changeDocumentTitle();
    // setMrp(1)
    const interval = setInterval(() => {
      setCurrentColor((prevColor) =>
        prevColor === "#72c0e5" ? "#2f429a" : "#72c0e5"
      );
    }, 500);

    setTimeout(() => {
      setLoading(false);
      clearInterval(interval);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const toggleShowAllDiscounts = () => {
    setShowAllDiscounts((prevShowAllDiscounts) => !prevShowAllDiscounts);
  };
  const totalItems = products.length;

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
  if (products.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className="cart-container">
        <div className="left-container">
          <div className="availabel-offers">
            <h2>
              {" "}
              <img
                src="computer-icons-percentage-percent-sign-discounts-vector-removebg-preview.png"
                alt="offer"
                className="offer-image"
              />
              Available offers{" "}
            </h2>
            {showAllDiscounts ? (
              <>
                <li>
                  <span>
                    10% Instant Discount on ICICI Bank Credit &amp; Debit Cards
                    on a min spend of ₹3,500. TCA
                  </span>
                </li>
                <li>
                  <span>
                    10% Instant Discount on Citi Credit &amp; Debit Cards on a
                    min spend of ₹3,500. TCA
                  </span>
                </li>
                <li>
                  <span>
                    7.5% Instant Discount up to ₹750 on every spends with Myntra
                    Kotak Credit Card. TCA
                  </span>
                </li>
                <li>
                  <span>
                    Get ₹100 Brand Voucher on minimum spend of ₹1,000 with
                    Payzapp wallet
                  </span>
                </li>
                <li>
                  <span>
                    Up to ₹1,000 Cashback on CRED pay UPI (Android Devices only)
                    on a minimum spend of ₹1,000. TCA
                  </span>
                </li>
                <li>
                  <span>
                    Flat ₹30 Cashback on Freecharge UPI (Android Devices only)
                    on a minimum spend of ₹1,999. TCA
                  </span>
                </li>
                <li>
                  <span>
                    Up To ₹100 Cashback on Mobikwik UPI (@ikwik) transaction on
                    a min spend of ₹1500. TCA
                  </span>
                </li>
                <li>
                  <span>
                    Up to ₹250 Cashback on First Ever Simpl Transaction on
                    Myntra on a minimum spend of ₹1499. TCA
                  </span>
                </li>
                <li>
                  <span>
                    Flat ₹75 Cashback on First Ever Mobikwik Wallet transaction
                    on Myntra on a min spend of ₹999. Use Code MBKNEW on
                    Mobikwik. TCA
                  </span>
                </li>
                <li>
                  <span>
                    Get upto 15% Cashback on Mobikwik Wallet transaction on a
                    min spend of ₹1,500. Use Code MBK15 on Mobikwik. TCA
                  </span>
                </li>
                <li>
                  <span>
                    Flat ₹100 on Airtel Payments Bank transactions on a min
                    spend of ₹1,000. TCA
                  </span>
                </li>
                <div className="show-more-container">
                  <div className="show-more">
                    <h6 onClick={toggleShowAllDiscounts}>Show Less</h6>
                  </div>
                  <ion-icon name="chevron-up-outline" id="down-icon"></ion-icon>
                </div>
              </>
            ) : (
              <>
                <li>
                  <span>
                    10% Instant Discount on ICICI Bank Credit &amp; Debit Cards
                    on a min spend of ₹3,500. TCA
                  </span>
                </li>
                <div className="show-more-container">
                  <div className="show-more">
                    <h6 onClick={toggleShowAllDiscounts}>Show More</h6>
                  </div>
                  <ion-icon
                    name="chevron-down-outline"
                    id="down-icon"
                  ></ion-icon>
                </div>
              </>
            )}
          </div>
          {products.map((product, index) => (
            <div className="cart-card" key={product.id}>
              <img
                title={product.title}
                src={product.image}
                alt="product"
                className="View-product-image"
              />
              <div className="cart-details">
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
                <h2>Size: {product.size}</h2>

                <div className="return-policy">
                  <h2
                    style={{
                      color: "#282c3f",
                      fontSize: ".8rem",
                      fontWeight: "600",
                    }}
                  >
                    <ion-icon
                      name="return-down-back"
                      style={{
                        color: "black",
                        marginRight: "5px",
                        height: "20px",
                        width: "20px",
                        position: "relative",
                        top: "8px",
                        fontWeight: "600",
                      }}
                    ></ion-icon>
                    14 days
                    <span style={{ color: "gray", fontWeight: "400" }}>
                      {" "}
                      return available
                    </span>
                  </h2>
                </div>

                <div className="quantity-container">
                  <button
                    onClick={() => openQuantityDialog(product)}
                    className="qty"
                  >
                    Qty:{" "}
                    <span>
                      {selectedQuantity[product.id] ||
                        product.defaultQuantity ||
                        1}
                    </span>
                    <ion-icon name="caret-down-outline"></ion-icon>
                  </button>
                </div>
                {/* Rest of your Cart component JSX */}
                {showQuantityDialog && (
                  <QuantityDialog
                    onClose={closeQuantityDialog}
                    onSelect={handleQuantitySelect}
                  />
                )}
                {/* </div> */}
              </div>
              <div
                className="rmv-btn"
                onClick={() => {
                  const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: "btn btn-success",
                      cancelButton: "btn btn-danger",
                    },
                    buttonsStyling: true,
                  });
                  swalWithBootstrapButtons
                    .fire({
                      html: `
                      <div >
                        <div style="display: flex; align-items: center; ">
                          <img src="${product.image}" style="object-fit: contain; width: 50px; height: 50px; margin-right: 10px;">
                          <div style=" text-align:left; ">
                            <p >Are you sure you want to remove this item from the bag?</p>
                          </div>
          
                    `,
                      showCancelButton: true,
                      showConfirmButton: true,
                      allowOutsideClick: true,
                      confirmButtonText: "Yes, delete it!",
                      cancelButtonText: "No, cancel!",
                      customClass: {
                        confirmButton: "swal-confirm-button",
                        cancelButton: "swal-cancel-button",
                        popup: "swal-custom-popup",
                      },
                    })
                    .then((result) => {
                      if (result.isConfirmed) {
                        dispatch(removeFromCart(product.id));
                      }
                    });
                }}
              >
                <button>
                  <ion-icon name="close-outline"></ion-icon>
                </button>
              </div>
            </div>
          ))}
          {userName !== "" ? (
            <a href="/wishlist">
              <div className="wishlist-base-container">
                <ion-icon
                  name="bookmark"
                  style={{ height: "20px", width: "20px", color: "#72c0e5" }}
                ></ion-icon>
                <div class="wishlist-base-message">Add items from wishlist</div>
                <div className="wishlist-base-arrow">
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
              </div>
            </a>
          ) : (
            <div className="login-base-container">
              <div className="blur-image">
                <img src="products-blurred.jpg" alt="blur_image" />
              </div>
              <div class="login-base-message">
                Login to see items from your existing bag and wishlist.
              </div>

              <div className="login-base-btn">
                <button onClick={() => naviagte("/signin")}>LOGIN</button>
              </div>
            </div>
          )}
        </div>
        <div className="right-container">
          <div className="price-block">
            <div className="price-details">
              <h5>PRODUCT DETAILS</h5>
              <hr />
              <h6
                style={{
                  fontSize: "0.9rem",
                  color: "#535766",
                  fontWeight: "600",
                }}
              >
                PRICE DETAILS <span>({totalItems})</span> items
              </h6>
              <div>
                <span style={{ color: "#282c3F", fontSize: "0.8rem" }}>
                  Total MRP
                </span>{" "}
                <span style={{ float: "right", paddingRight: "20px" }}>
                  {"$" + totalMRP.toFixed(2)}
                </span>
              </div>

              <div>
                <span style={{ fontSize: "0.8rem" }}>Coupon Discount</span>
                <span
                  style={{
                    float: "right",
                    paddingRight: "20px",
                    color: "#FF3F6C",
                    fontSize: "0.8rem",
                  }}
                >
                  Apply Coupon
                </span>
              </div>
              <div>
                <span style={{ fontSize: "0.8rem" }}>Plarform fee</span>
                <span
                  style={{
                    float: "right",
                    paddingRight: "20px",
                    color: "#03A685",
                    fontSize: "0.8rem",
                  }}
                >
                  FREE
                </span>
              </div>
              <hr />
              <span style={{ fontWeight: "650", fontSize: "1rem" }}>
                Total Amount
              </span>
              <span
                style={{
                  float: "right",
                  paddingRight: "20px",
                  fontWeight: "650",
                }}
              >
                {/* Use totalMRP for total amount */}
                {"$" + totalMRP.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="place-order">
            <button
              onClick={() => {
                if (userName === "") {
                  naviagte("/signin");
                } else {
                  naviagte("/address");
                  dispatch(getTotalItems(totalItems));
                  dispatch(getTotalMrp(totalMRP));
                }
              }}
            >
              PLACE ORDER
            </button>
          </div>
          <div className="secure-txt-container">
            <div className="shield-icon">
              <ion-icon name="shield-checkmark"></ion-icon>
            </div>
            <div className="secure-txt">
              Safe and Secure Payments.Easy returns.100% Authentic products.
            </div>
          </div>
        </div>
      </div>

      <div className="cart-footer-container">
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

export default Cart;
