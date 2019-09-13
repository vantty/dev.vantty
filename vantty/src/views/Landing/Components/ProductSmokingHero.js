import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Typography from "./components/Typography";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(9)
  },
  button: {
    border: "4px solid currentColor",
    borderRadius: 0,
    height: "auto",
    padding: theme.spacing(2, 5)
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  buoy: {
    width: 60
  }
});

function ProductSmokingHero(props) {
  const { classes } = props;

  return (
    <Container className={classes.root} component="section">
      <Button
        className={classes.button}
        target="blank"
        href={`https://api.whatsapp.com/send?phone=573103769786&text=Hola%20Sebastián,%20Estamos%20revisando%20tu%20aplicación!`}
      >
        <Typography variant="h4" component="span">
          Alguna pregunta? Contáctanos!
        </Typography>
      </Button>
      <Typography variant="subtitle1" className={classes.link}>
        Queremos hacer parte de Apps.co
      </Typography>
    </Container>
  );
}

ProductSmokingHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductSmokingHero);
