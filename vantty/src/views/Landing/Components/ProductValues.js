import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "./components/Typography";
import Trust from "@material-ui/icons/VerifiedUser";
import User from "@material-ui/icons/Stars";
import Categories from "@material-ui/icons/Dashboard";

const styles = theme => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.light
  },
  container: {
    marginTop: theme.spacing(16),
    marginBottom: theme.spacing(16),
    display: "flex",
    position: "relative"
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5)
  },
  image: {
    height: 55
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180
  }
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Trust style={{ fontSize: 100 }} />
              <Typography variant="h6" className={classes.title}>
                Confianza y seguridad
              </Typography>
              <Typography variant="h5">
                {
                  "Encuentra y contacta a tu artista preferido de forma rápida, confiable y segura."
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <User style={{ fontSize: 100 }} />
              <Typography variant="h6" className={classes.title}>
                Artistas Profesonales
              </Typography>
              <Typography variant="h5">
                {
                  "La identidad y el profesionalismo de todos nuestros artistas son verificados."
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Categories style={{ fontSize: 100 }} />
              <Typography variant="h6" className={classes.title}>
                Muchas categorías
              </Typography>
              <Typography variant="h5">
                {
                  "Bodas, eventos sociales, fotografía, moda, halloween, y muchas más."
                }
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductValues);
