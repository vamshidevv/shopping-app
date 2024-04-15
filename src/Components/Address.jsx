import { Formik, Form, Field } from "formik";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FadeLoader } from "react-spinners";
import * as yup from "yup";
import axios from "axios";
import SavedAddress from "./SavedAddress";
import { getAddressDetails } from "../Redux/ProductSlice";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.getitems.totalItems);
  const mrp = useSelector((state) => state.getmrp.totalMrp);
  const [pincodeError, setPincodeError] = useState("");
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [formHide, setFormHide] = useState(true);
  const [selectedButton, setSelectedButton] = useState("home");

  const addressSchema = yup.object({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters")
      .matches(/^[a-zA-Z\s]*$/, "Name cannot contain numbers")
      .required("Name is required"),
    mobileno: yup
      .string()
      .matches(/^[0-9\s]*$/, "Please enter a valid 10 digit mobile number")
      .min(10, "Minimum length is 10")
      .required("Mobile number is required"),
    pincode: yup
      .string()
      .matches(/^[0-9\s]*$/, "Only numbers allowed")
      .min(6, "Pincode must be 6 digits")
      .required("This is a mandatory field"),
    address: yup.string().required("Please enter address details"),
    locality: yup.string().required("Locality is required"),
  });

  const handleHome = () => {
    setShowAdditionalFields(false);
    setToggle(true);
    setSelectedButton("home");
    const workBtn = document.querySelector(".address-work-btn");
    workBtn.style.color = "";
    workBtn.style.border = "";
  };

  const handleWork = () => {
    setShowAdditionalFields(true);
    setToggle(false);
    setSelectedButton("work");
    const homeBtn = document.querySelector(".address-home-btn");
    homeBtn.style.color = "";
    homeBtn.style.border = "";
  };

  const [initialValues, setInitialValues] = useState({
    name: "",
    mobileno: "",
    pincode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    selectedLocation: selectedButton, // Initial value for selectedLocation
  });

  useEffect(() => {
    // Update selectedLocation in initialValues whenever selectedButton changes
    setInitialValues((prevValues) => ({
      ...prevValues,
      selectedLocation: selectedButton,
    }));
  }, [selectedButton]);

  const changeDocumentTitle = () => {
    document.title = "Glam Basket - Address";
  };

  changeDocumentTitle();
  const fetchData = async (pincode, setFieldValue) => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];
      if (data && data.PostOffice && data.PostOffice.length > 0) {
        const postOffice = data.PostOffice[0];
        setFieldValue("state", postOffice.State);
        setFieldValue("city", postOffice.District);
        setPincodeError("");
        setIsDisabled(false);
      } else {
        setFieldValue("state", "");
        setFieldValue("city", "");
        setPincodeError("Invalid pincode");
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error);
      setFieldValue("state", "");
      setFieldValue("city", "");
    }
  };
  setTimeout(() => {
    setLoading(false);
  }, 500);
  return (
    <>
      {loading ? (
        <div
          className="spinner-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <FadeLoader color={"#72c0e5"} loading={loading} />
        </div>
      ) : (
        <div className="address-container">
          {formHide === true ? (
            <div className="address-left-container">
              <div className="address-form">
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    const updatedValues = {
                      ...values,
                      selectedLocation: selectedButton,
                    };
                    console.log(updatedValues);
                    console.log("Selected Button:", selectedButton);
                    dispatch(getAddressDetails(updatedValues));
                    setFormHide(false);
                  }}
                  className="formik-form"
                  validationSchema={addressSchema}
                >
                  {({ errors, touched, setFieldValue }) => (
                    <Form>
                      <h6 className="formik-label">CONTACT DETAILS</h6>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter Name*"
                        className="formik-field"
                      />
                      {errors.name && touched.name ? (
                        <div className="error-message">{errors.name}</div>
                      ) : null}

                      <Field
                        type="text"
                        name="mobileno"
                        placeholder="Mobile No*"
                        className="formik-field"
                        onInput={(e) => {
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                        }}
                      />
                      {errors.mobileno && touched.mobileno ? (
                        <div className="error-message">{errors.mobileno}</div>
                      ) : null}
                      <h6 className="formik-label">ADDRESS</h6>
                      <Field
                        type="text"
                        name="pincode"
                        placeholder="Pin Code*"
                        className="formik-field"
                        onChange={(e) => {
                          setFieldValue("pincode", e.target.value);
                          fetchData(e.target.value, setFieldValue);
                        }}
                        onInput={(e) => {
                          if (e.target.value.length > 6) {
                            e.target.value = e.target.value.slice(0, 6);
                          }
                        }}
                      />
                      {(errors.pincode && touched.pincode) || pincodeError ? (
                        <div className="error-message">
                          {errors.pincode && touched.pincode
                            ? errors.pincode
                            : pincodeError}
                        </div>
                      ) : null}
                      <Field
                        type="text"
                        name="address"
                        placeholder="Address(House No, Building,Street,Area*)"
                        className="formik-field"
                      />
                      {errors.address && touched.address ? (
                        <div className="error-message">{errors.address}</div>
                      ) : null}

                      <Field
                        type="text"
                        name="locality"
                        placeholder="Locality/Town*"
                        className="formik-field"
                      />
                      {errors.locality && touched.locality ? (
                        <div className="error-message">{errors.locality}</div>
                      ) : null}
                      <Field
                        type="text"
                        name="city"
                        placeholder="City/District"
                        className="city"
                        disabled={isDisabled}
                      />
                      <Field
                        type="text"
                        name="state"
                        placeholder="State"
                        className="state"
                        disabled={isDisabled}
                      />
                      <div className="save-address-as">
                        <h6> SAVE ADDRESS AS</h6>
                        <Field
                          name="selectedLocation"
                          type="button"
                          value="home"
                          className={`address-home-btn ${
                            toggle ? "active" : ""
                          }`}
                          onClick={handleHome}
                        />
                        <Field
                          name="selectedLocation"
                          value="work"
                          type="button"
                          className={`address-work-btn ${
                            !toggle ? "active" : ""
                          }`}
                          onClick={handleWork}
                        />
                      </div>
                      {showAdditionalFields && (
                        <>
                          <Field
                            type="checkbox"
                            name="sunday"
                            id="sundayCheckbox"
                          />
                          <label
                            htmlFor="sundayCheckbox"
                            className="sunday-txt"
                          >
                            open on sunday <br />
                          </label>
                          <br />
                          <Field
                            type="checkbox"
                            name="saturday"
                            id="saturdayCheckbox"
                          />
                          <label
                            htmlFor="saturdayCheckbox"
                            className="saturday-txt"
                          >
                            open on saturday <br />
                          </label>
                        </>
                      )}
                      <div className="add-address-container">
                        <button type="submit">ADD ADDRESS</button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          ) : (
            <SavedAddress />
          )}

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
            {formHide === false ? (
              <div className="place-order">
                <button
                  onClick={() => {
                    navigate("/payment");
                  }}
                >
                  Continue
                </button>
              </div>
            ) : (
              ""
            )}
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
      )}

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

export default Address;
