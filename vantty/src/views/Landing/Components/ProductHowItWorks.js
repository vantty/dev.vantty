import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "./components/Button";
import Typography from "./components/Typography";

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.secondary.light,
    overflow: "hidden"
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5)
  },
  title: {
    marginBottom: theme.spacing(10)
  },
  title1: {
    marginBottom: theme.spacing(4),
    fontSize: "20px",
    fontWeight: "bold"
  },
  title2: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(4),
    fontSize: "20px",
    fontWeight: "bold"
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: "#5a3898",
    fontWeight: theme.typography.fontWeightMedium
  },
  image: {
    height: "30rem",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
    opacity: 0.7
  },
  button: {
    marginTop: theme.spacing(8),
    backgroundColor: "#5a3898",
    "&:hover": {
      backgroundColor: "#693eb8"
    }
  }
});

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h4" className={classes.title} component="h2">
          Cómo funciona
        </Typography>
        <Typography className={classes.title1}>PARA USUARIOS</Typography>

        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1. Navega</div>
                <img
                  src="https://res.cloudinary.com/vantty/image/upload/v1568388523/seed/ciuhcngqrt4hebiwmykn.png"
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Elege el artista que vaya más con tu estilo y necesidad.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2. Decide</div>
                <img
                  src="https://res.cloudinary.com/vantty/image/upload/v1568388661/seed/jrqkjxfzenz74oca3h21.png"
                  alt="graph"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Lee su información, comentarios y clasificaciones y mira su
                  portafolio.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3. Contacta</div>
                <img
                  src="https://res.cloudinary.com/vantty/image/upload/v1568389927/seed/otpikixhhgu0kcoqei3z.png"
                  alt="clock"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Ház click en contactar e inica una conversación vía Whatsapp.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Typography className={classes.title2}>PARA ARTISTAS</Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1. Regístrate</div>
                <img
                  src="https://res.cloudinary.com/vantty/image/upload/v1568389824/seed/b8qfez4tt9ashbpjkwdi.png"
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Crea tu cuenta como artista y llena el formulario.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2. Sube tu portafolio</div>
                <img
                  src="https://res.cloudinary.com/vantty/image/upload/v1568390057/seed/e2nop2plxrdrzbw4rmdx.png"
                  alt="graph"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Elige las mejores fotos para mostrar tus especialidades.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3. Consigue citas</div>
                <img
                  src="https://res.cloudinary.com/vantty/image/upload/v1568392815/seed/nd3chyrjbnv3hpm4hv8m.png"
                  alt="clock"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Aumenta tu número de clientes y cierra negocios.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          href="##"
        >
          Regístrate ya!
        </Button>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHowItWorks);
