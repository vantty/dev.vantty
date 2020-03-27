import React from 'react';
import qs from 'query-string';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { video } from './videoList.js';

// core components
import GridContainer from './components/GridContainer';
import GridItem from './components/GridItem';
import { Button, Typography } from '@material-ui/core';
import Parallax from './components/Parallax';

// Sections for this page
import ProductSection from './Sections/ProductSection.js';
import WorkSection from './Sections/WorkSection.js';
import VideoSection from './Sections/VideoSection.js';
import FAQSection from './Sections/FAQSection.js';
const JumbotronBackground =
  //with background
  'https://res.cloudinary.com/vantty/image/upload/v1583973869/seed/ouoswijho4fvbxzgql9c.png';
//Without
// "https://res.cloudinary.com/vantty/image/upload/v1583976620/seed/nuk2l4mrcmyz5br8mrte.jpg";
// "https://res.cloudinary.com/vantty/image/upload/v1583978169/seed/y9agox8oupnme4ohwftx.jpg";

const LandingPage = () => {
  const conatinerFluid = {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%'
  };
  const useStyles = makeStyles(theme => ({
    container: {
      zIndex: '12',
      color: '#FFFFFF',
      ...conatinerFluid,
      '@media (min-width: 576px)': {
        maxWidth: '540px'
      },
      '@media (min-width: 768px)': {
        maxWidth: '720px'
      },
      '@media (min-width: 992px)': {
        maxWidth: '960px'
      },
      '@media (min-width: 1200px)': {
        maxWidth: '1140px'
      }
    },
    title: {
      margin: '1.75rem 0 0.875rem',
      display: 'inline-block',
      position: 'relative',
      marginTop: '30px',
      minHeight: '32px',
      color: '#FFFFFF'
    },
    subTitle: {
      color: '#FFFFFF'
    },

    main: {
      background: '#FFFFFF',
      position: 'relative',
      zIndex: '3'
    },
    mainRaised: {
      [theme.breakpoints.up('sm')]: {
        margin: '-30px 30px 0px',
        paddingBottom: theme.spacing(1),
        borderRadius: '6px',
        boxShadow:
          '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
      },
      [theme.breakpoints.down('sm')]: {
        margin: '-30px 1px 0px 2px',
        borderRadius: '6px',
        paddingBottom: theme.spacing(1),
        boxShadow:
          '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
      }
    },
    button: {
      color: 'white',
      boxShadow: 'none',
      fontSize: '18px',
      textAlign: 'start',
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.greenVantty.main,
      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.greenVantty.light
      }
    }
  }));

  const classes = useStyles();
  return (
    <div>
      <Parallax filter image={JumbotronBackground}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} md={8}>
              <Typography variant="h1" className={classes.title}>
                Become an Artist Partner
              </Typography>
              <Typography variant="h3" className={classes.subTitle}>
                Build your professional profile and let customers book your
                services easier and faster
              </Typography>
              <br />
              <Button
                component={Link}
                variant="contained"
                color="primary"
                size="large"
                rel="noopener noreferrer"
                className={classes.button}
                to={'/register'}
              >
                Get Started
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          {video.map(vid => (
            <div key={vid.title}>
              <VideoSection
                title={vid.title}
                paragraph={vid.paragraph}
                direction={vid.direction}
                url={vid.url}
              />
            </div>
          ))}
          <WorkSection text={'Be part to the Vantty community'} />
          <FAQSection />
          <WorkSection
            text={'Show your talent and become a Vantty partnered artist!'}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
