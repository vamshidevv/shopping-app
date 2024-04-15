import { useState } from "react";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";

const SavedAddress = () => {
  const address = useSelector((state) => state.getaddress.address);
  const [loading, setloading] = useState(true);

  setTimeout(() => {
    setloading(false);
  }, 300);

  return (
    <>
      {loading ? (
        <div
          className="spinner-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "80vh",
          }}
        >
          <FadeLoader color={"#72c0e5"} />
        </div>
      ) : (
        <div className="save-address-left-container">
          <div className="select-delivery-address">
            <h3> Select Delivery Address</h3>
            <button className="add-new-address-btn">Add New Address</button>
          </div>
          <div className="user-address-container">
            <div className="useraddress">
              <div className="outer-circle"></div>
              <div className="user-name-stored">
                <h5 className="username">
                  {address.name}
                  {""}
                  <span className="userLocated">
                    {address.selectedLocation}
                  </span>
                </h5>
              </div>
              <div className="user-fulladdress-stored">
                <h6 className="user-full-address">
                  {address.address} , {address.locality}
                </h6>
                <h5 className="state-city-pin">
                  {address.city} <span>{address.state}</span> -{" "}
                  {address.pincode}
                </h5>
              </div>

              <div className="user-no">
                <p className="mobiel-txt">
                  Mobile :{" "}
                  <span className="mobile-number">{address.mobileno}</span>
                </p>
              </div>
              <button className="address-btn">Remove</button>
              <button className="address-btn">Edit</button>
            </div>
          </div>
          <div className="add-address-base-container">
            <h5>+ Add New Address</h5>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedAddress;
