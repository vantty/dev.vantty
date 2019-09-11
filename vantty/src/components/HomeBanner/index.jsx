import React from "react";

// Assets
import v1 from "../../assets/images/v1.jpg";

// Material-UI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  bannerImage: {
    position: "relative",
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "0.6rem",
    backgroundColor: "rgba(0,0,0,.3)",
    paddingTop: "80%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "100%"
    }
  },
  banner: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  }
}));

const HomeBanner = ({ image }) => {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="md" className={classes.banner}>
        <div
          style={{
            backgroundImage: `url(${image})`
          }}
          className={classes.bannerImage}
        >
          <div className={classes.quoteInner}>
            <Typography className={classes.quoteText} variant="h1">
              Hella narwhal Cosby sweater McSweeney's, salvia kitsch before they
              sold out High Life.
            </Typography>
            <div className={classes.person}>
              <Typography className={classes.name} variant="body1">
                Takamaru Ayako
              </Typography>
              <Typography className={classes.bio} variant="body2">
                Manager at inVision
              </Typography>
            </div>
          </div>
        </div>
      </Container>
      <Divider />
    </div>
  );
};

export default HomeBanner;
