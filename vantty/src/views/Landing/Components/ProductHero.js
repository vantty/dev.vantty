import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "./components/Button";
import Typography from "./components/Typography";
import ProductHeroLayout from "../Components/ProductHeroLayout";
import Line from "@material-ui/icons/Maximize";

const backgroundImage =
  "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80";

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200,
    backgroundColor: "#5a3898",
    "&:hover": {
      backgroundColor: "#693eb8"
    }
  },
  h5: {
    marginBottom: theme.spacing(4),
    fontWeight: "bold",
    marginRight: theme.spacing(20),
    marginLeft: theme.spacing(20),
    marginTop: theme.spacing(5)
  },
  more: {
    marginTop: theme.spacing(2)
  },
  line: {
    marginTop: theme.spacing(8)
  }
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2">
        Encuentra tu look ideal
      </Typography>
      <Typography color="inherit" align="center" variant="h2">
        hecho por el artista perfecto
      </Typography>
      <Line className={classes.line} />
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Descubre el trabajo de los mejores Maquilladores y Estilistas y reserva
        una cita para tu boda, eventos sociales, una sesión fotográfica, y más!
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="##"
      >
        Ver todos los artistas
      </Button>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHero);
