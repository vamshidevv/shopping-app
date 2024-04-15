import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import "mdb-ui-kit/css/mdb.min.css";
import EmptyCart from "./EmptyCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { MdQrCodeScanner } from "react-icons/md";

import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
const Payment = () => {
  const items = useSelector((state) => state.getitems.totalItems);
  const mrp = useSelector((state) => state.getmrp.totalMrp);
  const [loading, setLoading] = useState(true);
  const [currentColor, setCurrentColor] = useState("#72c0e5");
  const [showAllDiscounts, setShowAllDiscounts] = useState(false);
  const products = useSelector((state) => state.addtocart.cart);
  const [showBuyButton, setShowBuyButton] = useState(false);

  //   userName = useSelector((state) => state.uName.userName);

  //   let totalMRP = 0;

  //   products.forEach((product) => {
  //     const quantity = selectedQuantity[product.id] || 1;
  //     totalMRP += product.price * quantity;

  //   });

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

  const handleRadioChange = () => {
    setShowBuyButton(true);
    console.log("radio is working..");
  };

  return (
    <>
      <div className="payment-container">
        <div className="payment-left-container">
          <div className="availabel-offers">
            <h2>
              {" "}
              <img
                src="computer-icons-percentage-percent-sign-discounts-vector-removebg-preview.png"
                alt="offer"
                className="offer-image"
              />
              Bank Offer{" "}
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
                    10% Instant Discount on ICICI Bank Credit & Debit Cards on a
                    min spend of ₹3,500. TCA
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
          <h6 className="choose-payment-mode-txt">Choose Payment Mode</h6>
          <div className="payment-block">
            <div className="payment-left-block">
              <div className="payment-option">
                <div className="recommended">
                  <ion-icon name="star-outline"></ion-icon>{" "}
                  <span>Recommended</span>
                </div>
              </div>
              <div className="payment-option">
                <div className="cod">
                  <FontAwesomeIcon icon={faSackDollar} />
                  <span>Cash On Delivery</span>
                </div>
              </div>
              <div className="payment-option">
                <div className="upi">
                  <MdQrCodeScanner />
                  <span>Pay By Any UPI App</span>
                </div>
              </div>
              <div className="payment-option">
                <dic className="credit-debit-card">
                  <FontAwesomeIcon icon={faCreditCard} />
                  <span>Credit/Debit Card</span>
                </dic>
              </div>
              <div className="payment-option">
                <div className="wallets">
                  <FontAwesomeIcon icon={faWallet} />
                  <span>Wallets</span>
                </div>
              </div>
              <div className="payment-option">
                <div className="pay-later">
                  <FontAwesomeIcon icon={faMoneyCheckDollar} />
                  <span>Pay Later</span>
                </div>
              </div>
              <div className="payment-option">
                <div className="emi">
                  <FontAwesomeIcon icon={faHandHoldingDollar} />
                  <span>EMI</span>
                </div>
              </div>
              <div className="payment-option">
                <div className="bank">
                  <FontAwesomeIcon icon={faBuildingColumns} />
                  <span>Net Banking</span>
                </div>
              </div>
            </div>
            <div className="payment-right-block">
              <div className="right-recommonded">
                <span>Recommended Payment Option</span>
              </div>
              <div>
                <label htmlFor="gpay" className="gpay-mode">
                  <input type="radio" id="gpay" onChange={handleRadioChange} />
                  <h6 className="gpay-id" id="gpay">
                    vamshi123@oksbi
                  </h6>
                  <h6 className="full-name" id="gpay">
                    VAMSHIKUMAR BHUMAIAH BANDARI
                  </h6>
                </label>
              </div>
              {showBuyButton && (
                <div className="buy-now-btn">
                  <button
                    className="buy-now"
                    onClick={() => {
                      Swal.fire({
                        icon: "success",
                        title: "Order Placed Successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="payment-base-container">
            <div className="gift-icon-txt">
              <ion-icon
                name="gift"
                style={{ height: "20px", width: "20px", color: "#72c0e5" }}
              ></ion-icon>
              <div class="have-gift-txt">Hava a Gift Cards</div>
            </div>
            <div className="apply-gift-txt">Apply Gift Cards</div>
          </div>
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
                PRICE DETAILS <span>({items})</span> items
              </h6>
              <div>
                <span style={{ color: "#282c3F", fontSize: "0.8rem" }}>
                  Total MRP
                </span>{" "}
                <span style={{ float: "right", paddingRight: "20px" }}>
                  {"$" + mrp}
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
                {"$" + mrp}
              </span>
            </div>
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

export default Payment;
