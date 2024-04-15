import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import Footer from "./Footer";
import DiscountSection from "./DiscountSection";
import { FadeLoader } from "react-spinners";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
    backgroundColor: "#72c0e5",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  welcomeText: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    color: "white",
  },
  descriptionText: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
    color: "white",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [showShoeImg, setShowShoeImg] = useState(false);
  const [showOnlineImg, setShowOnlineImg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentColor, setCurrentColor] = useState("#72c0e5");

  useEffect(() => {
    const changeDocumentTitle = () => {
      document.title = "Glam Basket - Home";
    };

    changeDocumentTitle();

    const handleScroll = () => {
      const shoeImgContainer = document.querySelector(".shoeImgContainer");
      const onlineImgContainer = document.querySelector(".onlineImgContainer");
      const scrollPosition = window.scrollY;

      if (shoeImgContainer && onlineImgContainer) {
        if (
          scrollPosition >
          shoeImgContainer.offsetTop - window.innerHeight / 2
        ) {
          setShowShoeImg(true);
        } else {
          setShowShoeImg(false);
        }

        if (
          scrollPosition >
          onlineImgContainer.offsetTop - window.innerHeight / 2
        ) {
          setShowOnlineImg(true);
        } else {
          setShowOnlineImg(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prevColor) =>
        prevColor === "#72c0e5" ? "#2f429a" : "lightpurple"
      );
    }, 1000);

    setTimeout(() => {
      setLoading(false);
      clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <FadeLoader color={currentColor} />
        </div>
      ) : (
        <>
          <div className={classes.root} id="welcomeTxt">
            <Container>
              <Typography
                variant="h4"
                className={classes.welcomeText}
                gutterBottom
              >
                Welcome to Our Glam Basket Store!
              </Typography>
              <Typography
                variant="body1"
                className={classes.descriptionText}
                gutterBottom
              >
                We offer a wide range of products to meet your needs.
              </Typography>
            </Container>
          </div>

          <div className="shoppingImageContainer">
            <img
              src="b656a7f4-4688-4997-bb7c-54b78793981e1658752386588-Western-Wear_Desk.jpg"
              alt="shopping"
              className="shopping-image"
            />
          </div>

          <div
            className={`shoeImgContainer ${
              showShoeImg ? "fadeInRight" : "fadeOutRight"
            }`}
          >
            <img
              src="free-online-shopping-4277122-3561282.jpg"
              alt="shoesImages"
              className="shoeImg"
            />
            <aside className="asideContent1">
              <h5> - Comfort All Day Long:</h5>
              <p>
                Padded insoles ensure cushioned support for extended wear.
                Lightweight materials reduce fatigue, perfect for daily
                activities.
              </p>
              <h5>-Versatile Style:</h5>
              <p>
                Transition seamlessly from casual outings to formal occasions.
              </p>
              <h5>-Durability Guaranteed:</h5>
              <p>High-quality materials ensure long-lasting wear..</p>
              <p>Reinforced stitching and construction for added resilience.</p>
            </aside>
          </div>
          <DiscountSection />
          <div
            className={`onlineImgContainer ${
              showOnlineImg ? "fadeInLeft" : "fadeOutLeft"
            }`}
          >
            <aside className="asideContent2">
              <br />
              <h5> - Why choose us?:</h5>
              <p>
                Vast Selection: Explore an extensive range of products curated
                to cater to your every need and desire.
              </p>
              <p>
                Comfort and Style: Experience the perfect blend of comfort and
                style with products designed to enhance your lifestyle and keep
                you feeling confident every day.
              </p>
              <p>
                Trendsetting Selection: Discover the latest fashion trends and
                timeless classics in our carefully curated collection, ensuring
                you stay stylish no matter the occasion.
              </p>{" "}
              <p>
                Secure Transactions: Shop with peace of mind knowing that your
                transactions are safe and protected by state-of-the-art security
                measures.
              </p>
            </aside>
            <img
              src="why-choose-service.jpg"
              alt="why Choose us"
              className="onlineImg"
            />
          </div>

          {/* <div className="sponcerImgContainer">
            <img src="e223fc79-fca6-4466-a88c-152ebc2774fc1710339132739-Sponsor-1.jpg" alt="niveaImg" className="niveaImg" />
          </div>
          <div className="crazy-deals-container">
            <img src="f7833d8c-a2b1-4aac-989b-ca397a02dfcd1710340369987-Crazy-Deals.jpg" alt="crazy deals" className="crazy-deals" />
          </div> */}

          <div className="categoryImageContainer">
            <img
              src="0174e4d7-448c-4746-8572-69461ad5be101659020268081-Tops - -Tees_Desk (1).jpg"
              alt="shopping"
              className="categoryImage"
            />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage;
