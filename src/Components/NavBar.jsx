import Headroom from "react-headroom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUserName } from "../Redux/ProductSlice";
import { useEffect } from "react";

const NavBar = () => {
  const getCount = useSelector((state) => state.count.val);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.products.wislistproduct);
  const userName = useSelector((state) => state.uName.userName);

  useEffect(() => {
    if (userName === "") {
      document.querySelector(".logout").style.display = "none";
    } else {
      document.querySelector(".logout").style.display = "block";
    }
  });

  return (
    <>
      <Headroom>
        <div className={`navContainer`}>
          <a href="/" style={{ textDecoration: "none" }}>
            <figure>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/shopping-cart-logo-design-shopping-logo-design-on-line-shopping-app-icon-free-vector-removebg-preview.png"
                }
                alt="glam basket logo"
                id="logo"
              />
              <figcaption>
                <div className="title-container">
                  <span className="glamTxt">Glam</span>
                  <span className="glamTxt2">Basket</span>
                </div>
              </figcaption>
            </figure>
          </a>

          <nav>
            <NavLink to={"/"} className={"link"}>
              Home
            </NavLink>
            <NavLink to={"/products"} className={"link"}>
              Product
            </NavLink>
            <div className="profile-icon" title="Profile">
              <ion-icon name="person-outline"></ion-icon>
              <div className="profile-details" title="">
                <div className="user-name">
                  {userName === "" ? (
                    <div>
                      <h4>Welcome </h4>
                      <p style={{ fontSize: "13px" }}>
                        To access account and manage orders
                        <a href="/signin">
                          <button className="login-signup-btn">
                            LOGIN / SIGNUP
                          </button>
                        </a>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h4>Hello {userName}</h4>
                      {/* {(logout.style.display = "block")} */}
                    </div>
                  )}
                </div>
                <hr />
                <div className="orders-details">
                  <h6>Orders</h6>
                  <h6>Wishlist</h6>
                  <h6>Gift Cards</h6>
                  <h6>Contact Us</h6>
                </div>
                <hr />
                <div className="glam-basket-credits">
                  <h6>Glam Credits</h6>
                  <h6>Coupons</h6>
                  <h6>Saved Cards</h6>
                </div>
                <hr />
                <div className="logout">
                  <h6
                    onClick={() => {
                      console.log("logout cliked");
                      window.location.reload(true);
                      dispatch(removeUserName());
                    }}
                  >
                    Log Out
                  </h6>
                </div>
              </div>
            </div>
            <div className="wishlist-container">
              <div
                className="wishlist"
                title="WishList"
                onClick={() => navigate("/wishlist")}
                style={{ color: wishlist.length > 0 ? "#FF3E6C" : "" }}
              >
                <ion-icon
                  name={wishlist.length > 0 ? "heart" : "heart-outline"}
                ></ion-icon>
              </div>
            </div>
            <div
              className="bag-container"
              onClick={() => navigate("/cart")}
              title="Bag"
            >
              <ion-icon
                name="bag-handle-outline"
                style={{ fontSize: "30px" }}
                className="bag-icon"
              ></ion-icon>

              {getCount > 0 && <div className="cart-count">{getCount}</div>}
            </div>

            <div></div>
            {/* <div dangerouslySetInnerHTML={{ __html: "&#8801" }} />  html entity for hamburger menu */}
          </nav>
        </div>
      </Headroom>
    </>
  );
};

export default NavBar;
