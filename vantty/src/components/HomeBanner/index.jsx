import React from "react";

// Assets
import v1 from "../../assets/images/v1.jpg";

// Material-UI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  bannerImage: {
    backgroundImage: `url(${v1})`,
    position: "relative",
    width: "100%",
    paddingTop: "80%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "0.6rem",
    backgroundColor: "rgba(0,0,0,.3)"
  },
  banner: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

const HomeBanner = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.banner}>
      <div className={classes.bannerImage}>
        {<img style={{ display: "none" }} src={v1} alt="background" />}
      </div>
    </Container>
  );
};

export default HomeBanner;
