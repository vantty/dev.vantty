import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import { deletePicture } from "../../../../../../../../actions/profile";

//Material-UI
import CancelIcon from "@material-ui/icons/CancelRounded";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Toolbar,
  Avatar,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
    // backgroundColor: theme.palette.background.paper
  },
  image: {
    float: "left",
    position: "relative",
    width: "98%",
    paddingBottom: "100%",
    paddingRight: "1rem",
    paddingLeft: "1rem",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "10px"
  },
  gridList: {
    width: 500,
    height: 450
  },
  tile: {
    position: "relative",
    display: "block" // In case it's not rendered with a div.
    // height: "340px"
    // overflow: "hidden"
  },
  // imgFullHeight: {
  //   height: "100%",
  //   transform: "translateX(-50%)",
  //   position: "relative",
  //   left: "50%"
  // },
  // imgFullWidth: {
  //   width: "100%",
  //   position: "relative",
  //   transform: "translateY(-50%)",
  //   top: "50%"
  // }
  blockTitle: {
    paddingBottom: "6px",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  title: {
    fontSize: "22px",
    display: "inline-block"
  },
  seeAll: {
    fontSize: "22px",
    display: "inline-block"
  },
  pageBlock: {
    backgroundColor: "#FAFAFA"
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.6rem",
    backgroundColor: "#FAFAFA",
    boxShadow: "none"
  },
  cardMedia: {
    paddingTop: "100%",
    borderRadius: "0.5rem"
  },
  cardContent: {
    flexGrow: 1,
    padding: 0,
    paddingBottom: 0 + "!important"
  },
  cardTitle: {
    padding: 0,
    paddingLeft: "0.6rem",
    minHeight: 0 + "!important",
    marginTop: "0.5rem"
  },
  avatar: {
    display: "inline-block",
    width: 30,
    height: 30
  },
  name: {
    display: "inline-block",
    margin: 0,
    paddingLeft: "0.5rem",
    fontSize: "12px"
  }
}));

const PorfolioSinChips = ({ portfolioPictures, deletePicture }) => {
  const classes = useStyles();

  const pictures = () => (
    <div>
      <Grid container spacing={2}>
        {portfolioPictures.map((image, index) => (
          <Grid item key={index} xs={6} md={6}>
            <span onClick={() => deletePicture(image._id, image.cloudId)}>
              <CancelIcon />
            </span>
            <Card className={classes.card}>
              <CardMedia
                key={image.original}
                className={classes.cardMedia}
                image={`${image.original}`}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Toolbar className={classes.cardTitle}>
                  <Avatar
                    alt=""
                    src={image.original}
                    className={classes.avatar}
                  />
                  <Typography key={index} gutterBottom className={classes.name}>
                    {"by "}
                    {image.name}
                  </Typography>
                </Toolbar>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );

  return <Fragment>{pictures()}</Fragment>;
};

PorfolioSinChips.propTypes = {
  portfolioPictures: PropTypes.array.isRequired,
  deletePicture: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePicture }
)(PorfolioSinChips);
