import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

// Components
import Navbar from "../../components/Navbar";
import BottomNavabar from "../../components/BottomNavbar";
import HomeJumbotron from "../../components/HomeJumbotron";
import HomeGrid from "../../components/HomeGrid";
import HomeCarousel from "../../components/HomeCarousel";
import HomeBanner from "../../components/HomeBanner";
import HomeFooter from "../../components/HomeFooter";

// Actions
import { changeNavbarValue } from "../../actions/navbar";

// Material-UI
import CssBaseline from "@material-ui/core/CssBaseline";
<<<<<<< HEAD
=======
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  jumbotron: {
    paddingLeft: 0,
    paddingRight: 0
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${top})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      paddingRight: 0,
      paddingLeft: 0
    }
  },
  cardGrid: {
    // padding: 0
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
    backgroundColor: "#FAFAFA",
    boxShadow: "none"
  },
  cardMedia: {
    paddingTop: "100%",
    borderRadius: "1rem"
  },
  cardContent: {
    flexGrow: 1,
    padding: 0,
    paddingBottom: 0 + "!important"
  },
  cardTitle: {
    padding: 0,
    paddingLeft: "1rem"
  },
  avatar: {
    display: "inline-block",
    // margin: 10,
    width: 32,
    height: 32
  },
  name: {
    display: "inline-block",
    margin: 0,
    paddingLeft: "0.5rem"
    // fontSize: "10px"
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  image: {
    backgroundImage: `url(${v1})`,
    position: "relative",
    width: "100%",
    paddingTop: "120%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "1rem",
    backgroundColor: "rgba(0,0,0,.3)"
  },
  carousel: {
    paddingBottom: theme.spacing(4)
  }
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 40,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const cards = [1, 2, 3, 4, 5, 6];
>>>>>>> 9e665a3b55a73f86b747188b8d82b3388f4444c7

const Home = ({ changeNavbarValue }) => {
  useEffect(() => {
    changeNavbarValue("home");
  }, []);

  return (
    <Fragment>
      <CssBaseline />
<<<<<<< HEAD
      {isMobile ? <BottomNavabar /> : <Navbar />}
      <HomeJumbotron />
      <HomeGrid />
      <HomeCarousel />
      <HomeBanner />
      <HomeGrid />
      <HomeFooter />
=======
      {isMobile ? (
        <BottomNavabar />
      ) : (
        <Fragment>
          <Navbar />
        </Fragment>
      )}
      <main>
        <Container maxWidth='xl' className={classes.jumbotron}>
          {/* Main featured post */}
          <Paper className={classes.mainFeaturedPost}>
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: "none" }} src={top} alt='background' />}
            <div className={classes.overlay} />
            <Grid container>
              <Container maxWidth='md'>
                <Grid item md={8}>
                  <div className={classes.mainFeaturedPostContent}>
                    <Typography
                      component='h1'
                      variant='h3'
                      color='inherit'
                      gutterBottom
                    >
                      Title of a longer featured blog post
                    </Typography>
                    <Typography variant='h5' color='inherit' paragraph>
                      Multiple lines of text that form the lede, informing new
                      readers quickly and efficiently about what&apos;s most
                      interesting in this post&apos;s contents.
                    </Typography>
                    <Link variant='subtitle1' href='#'>
                      Continue reading…
                    </Link>
                  </div>
                </Grid>
              </Container>
            </Grid>
          </Paper>
        </Container>
        <Container className={classes.cardGrid} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={2}>
            {cards.map(card => (
              <Grid item key={card} xs={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={v1}
                    title='Image title'
                  />
                  <CardContent className={classes.cardContent}>
                    <Toolbar className={classes.cardTitle}>
                      <Avatar alt='' src={v2} className={classes.avatar} />
                      <Typography
                        gutterBottom
                        variant='body2'
                        className={classes.name}
                      >
                        by Natalia Zuluaga
                      </Typography>
                    </Toolbar>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container maxWidth='md' className={classes.carousel}>
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition='transform 600ms ease-in-out'
            transitionDuration={100}
            containerClass='carousel-container'
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass='custom-dot-list-style'
            // itemClass="carousel-item-padding-30-px"
            // showDots
            // renderDotsOutside
            minimumTouchDrag={100}
            slidesToSlide={1}
          >
            <div className={classes.image}>
              {<img style={{ display: "none" }} src={v1} alt='background' />}
            </div>
            <div className={classes.image}>
              {<img style={{ display: "none" }} src={v1} alt='background' />}
            </div>
            <div className={classes.image}>
              {<img style={{ display: "none" }} src={v1} alt='background' />}
            </div>
            <div className={classes.image}>
              {<img style={{ display: "none" }} src={v1} alt='background' />}
            </div>
            <div className={classes.image}>
              {<img style={{ display: "none" }} src={v1} alt='background' />}
            </div>
          </Carousel>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant='h6' align='center' gutterBottom>
          Footer
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='textSecondary'
          component='p'
        >
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
>>>>>>> 9e665a3b55a73f86b747188b8d82b3388f4444c7
    </Fragment>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  changeNavbarValue: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { changeNavbarValue }
)(Home);
