import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const changeDocumentTitle = () => {
    document.title = "Glam Basket -  Page not found.";
  };

  changeDocumentTitle();
  let navigate = useNavigate();
  return (
    <>
      <div className="error-container">
        <p>Oops! Page not found.</p>
        <img
          src="11488523304066-search404.png"
          alt="404 Error"
          className="error-image"
        />
      </div>

      <p class="index-infoBig"> We couldn't find any matches! </p>
      <p class="index-infoSmall">
        Please check the spelling or try searching something else
      </p>
      <div
        className="gohome-container"
        onClick={() => {
          navigate("/");
        }}
      >
        <button>GoHome</button>
      </div>
    </>
  );
};

export default Error404;
