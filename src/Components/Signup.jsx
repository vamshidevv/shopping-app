import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signupSchema } from "./SignupValidation";

const Signup = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Simulate loading with a delay

  setTimeout(() => {
    setLoading(false);
  }, 700);
  const initialValues = {
    name: "",
    Email: "",
    createPassword: "",
    confirmPassword: "",
  };

  return (
    <>
      {loading ? (
        <div
          className="spinner-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <FadeLoader color={"#2f439a75"} loading={loading} />
        </div>
      ) : (
        <div className="main" style={{ border: "0.1px solid #c2c2c2" }}>
          <div className="Signupform-container">
            <img
              src="Shopping-cart-with-gift-boxes-and-shopping-bags-from-online-shop-for-e-commerce-marketing-on-transparent-PNG-removebg-preview (1).png"
              alt="logo"
              id="signin-image"
              style={{
                height: "150px",
                width: "350px",
                objectFit: "contain",
                position: "relative",
                top: "-20px",
              }}
            />
            <h1 className="form-title" onClick={() => navigate("/signups")}>
              Sign up
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={(values, actions) => {
                let storedCredentials =
                  JSON.parse(localStorage.getItem("credentials")) || [];

                // Add new user credentials to the existing array
                let newUserCredentials = {
                  name: values.name,
                  email: values.Email,
                  password: values.createPassword,
                };
                storedCredentials.push(newUserCredentials);

                // Store the updated user credentials array back into localStorage
                localStorage.setItem(
                  "credentials",
                  JSON.stringify(storedCredentials)
                );
                console.log(values);
                navigate("/signin");
              }}
            >
              {({ errors, touched }) => (
                <Form className="form">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <Field
                    id="Name"
                    name="name"
                    placeholder="Enter you name"
                    type="text"
                    className="form-field"
                  />
                  {errors.name && touched.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}

                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <Field
                    id="Email"
                    name="Email"
                    placeholder="vams@gmail.com"
                    type="email"
                    className="form-field"
                  />
                  {errors.Email && touched.Email ? (
                    <div className="error-message">{errors.Email}</div>
                  ) : null}

                  <label htmlFor="createPassword" className="form-label">
                    Create Password
                  </label>
                  <div className="password-field">
                    <Field
                      id="createPassword"
                      name="createPassword"
                      type="password"
                      className="form-field"
                    />
                  </div>
                  {errors.createPassword && touched.createPassword ? (
                    <div className="error-message">{errors.createPassword}</div>
                  ) : null}

                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="password-field">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      className="form-field"
                    />
                    <div
                      className="password-toggle-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </div>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="error-message">
                      {errors.confirmPassword}
                    </div>
                  ) : null}

                  <button type="submit" className="signup-btn">
                    Sign up
                  </button>
                </Form>
              )}
            </Formik>
            <p className="form-message">
              Already have an account? <a href="/signin">Sign in</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
