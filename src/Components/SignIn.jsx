import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import { FadeLoader } from "react-spinners";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { storeUserName } from "../Redux/ProductSlice";

const SignIn = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  
  setTimeout(() => {
    setLoading(false);
  }, 700);

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
        <div className="main">
          <img
            src="cdba4f93cdbb7ba8b0e400247cbbd075.png"
            alt="logo"
            id="signin-image"
            // style={{ height: "200px", width: "400px", objectFit: "contain" }}
          />
          <div className="form-container">
            <h1 className="form-title">Sign In</h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Email is required";
                }
                if (!values.password) {
                  errors.password = "Password is required";
                }
                return errors;
              }}
              onSubmit={(values, actions) => {
                let storedCredentials = JSON.parse(
                  localStorage.getItem("credentials")
                );
                if (!storedCredentials) {
                  Swal.fire({
                    text: "No account found for this email!",
                    customClass: {
                      confirmButton: "custom-width-button",
                    },
                  });
                  return;
                }
                const matchedUser = storedCredentials.find(
                  (user) =>
                    user.email === values.email &&
                    user.password === values.password
                );

                if (matchedUser) {
                  console.log("username" + matchedUser.name);
                  dispatch(storeUserName(matchedUser.name));
                  navigate("/");

                  setTimeout(() => {}, 1200);
                } else {
                  actions.setFieldError(
                    "password",
                    "Email and password must be correct"
                  );
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="form">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="vams@gmail.com"
                    type="email"
                    className={`form-field ${
                      errors.email && touched.email ? "error" : ""
                    }`}
                  />
                  {errors.email && touched.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="password-field">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"} // Toggle between text and password type
                      className={`form-field ${
                        errors.password && touched.password ? "error" : ""
                      }`}
                    />
                    <div
                      className="password-toggle-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </div>
                  </div>
                  {errors.password && touched.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                  <button type="submit" className="form-button">
                    Sign in
                  </button>
                </Form>
              )}
            </Formik>
            <p className="form-message">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
