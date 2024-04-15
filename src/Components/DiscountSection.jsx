import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  discountContainer: {
    textAlign: "center",
    padding: theme.spacing(2),
    marginTop: theme.spacing(10),

    backgroundImage: "linear-gradient(45deg, #5794b342, #2f439a)",
    color: "white",
    animation: "$fadeIn 1.5s ease-in-out",
  },
  discountText: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  fiftyPercent: {
    fontFamily: "'Pacifico', cursive",
    animation: "$blink 1s infinite alternate",
  },
  discountDescription: {
    fontSize: "18px",
  },
  "@keyframes blink": {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0.5,
    },
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const DiscountSection = () => {
  const classes = useStyles();

  return (
    <div className={classes.discountContainer}>
      <Typography variant="h4" className={classes.discountText}>
        <span className={classes.fiftyPercent} style={{ fontSize: "48px" }}>
          50%
        </span>{" "}
        Off!
      </Typography>
      <Typography variant="body1" className={classes.discountDescription}>
        Enjoy massive discounts up to 50% off on selected items. Hurry, grab
        your favorites before they're gone!
      </Typography>
    </div>
  );
};

export default DiscountSection;
