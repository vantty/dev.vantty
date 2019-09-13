import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Typography from "./components/Typography";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(16),
    marginBottom: theme.spacing(16)
  },
  images: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexWrap: "wrap"
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    height: "40vh",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100
    },
    "&:hover": {
      zIndex: 1
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15
    },
    "&:hover $imageMarked": {
      opacity: 0
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor"
    }
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        "https://res.cloudinary.com/vantty/image/upload/v1568383618/seed/i9tjnkiniy60kuvbtdco.jpg",
      title: "Boda",
      width: "40%"
    },
    {
      url:
        "https://res.cloudinary.com/vantty/image/upload/v1568383697/seed/qkg8jwqbwcsjhgyrkz55.jpg",
      title: "Social",
      width: "20%"
    },
    {
      url:
        "https://res.cloudinary.com/vantty/image/upload/v1568384164/seed/reykbqajlzw7scokaqaq.png",
      title: "Fotografía",
      width: "40%"
    },
    {
      url:
        "https://res.cloudinary.com/vantty/image/upload/v1568383797/seed/n6xglihznuvqlqqt3rhj.jpg",
      title: "Moda",
      width: "38%"
    },
    {
      url:
        "https://res.cloudinary.com/vantty/image/upload/v1568383883/seed/h79sf0wax99f0rgfjdjb.jpg",
      title: "Cabello",
      width: "38%"
    },
    {
      url:
        "https://res.cloudinary.com/vantty/image/upload/v1568383933/seed/it0iuuoppwsamxx71acg.jpg",
      title: "Halloween",
      width: "24%"
    }
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" align="center" component="h2">
        Para todos los gustos y deseeos
      </Typography>
      <div className={classes.images}>
        {images.map(image => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductCategories);
