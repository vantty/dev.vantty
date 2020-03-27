import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
// import Chat from "@material-ui/icons/Chat";
import Today from '@material-ui/icons/Today';
import Review from '@material-ui/icons/RateReview';
import Money from '@material-ui/icons/MonetizationOn';
import Payment from '@material-ui/icons/Payment';

import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Fingerprint from '@material-ui/icons/Fingerprint';
// core components
import GridContainer from '../components/GridContainer';
import GridItem from '../components/GridItem';
import InfoArea from '../components/InfoArea';
import { Typography } from '@material-ui/core';

export default function ProductSection() {
  const useStyles = makeStyles(theme => ({
    section: {
      padding: '70px 0',
      textAlign: 'center'
    },
    title: {
      color: '#3C4858',
      margin: '1.75rem 0 0.875rem',
      marginBottom: '1rem',
      marginTop: '30px',
      minHeight: '32px',
      textDecoration: 'none'
    },
    description: {
      color: '#999',
      marginBottom: theme.spacing(2)
    }
  }));
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <Typography variant="h2" className={classes.title}>
            What is Vantty?
          </Typography>
          {/* <h5 className={classes.description}> */}
          <Typography variant="h4" className={classes.description}>
            Vantty is a beauty platform which uses an advanced search engine to
            connect beauty artist with clients. Anywhere, Anytime.{' '}
            <strong>
              Our goal it's to grow your personal brand and stand you out.
            </strong>
          </Typography>
          {/* </h5> */}
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Online Booking"
              description="Your clients can book your services in 3 easy steps. You will be notified via email to accept the service."
              icon={Today}
              iconColor="pink"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Get Reviews"
              description="Once you have completed the service, your client will leave a review about her experience."
              icon={Review}
              iconColor="purple"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Advertising"
              description="We create exclusive campaigns in Facebook, Instagram and Google for you to increase your clients."
              icon={Money}
              iconColor="green"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Secure and Fast payments"
              description="Your clients will pay using their credit card, and in 7 days you will receive your money in your banck account."
              icon={Payment}
              iconColor="purple"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Professional Profile"
              description="You will have a dedicated profile where you can show your experience, upload your portfolio and save client reviews."
              icon={VerifiedUser}
              iconColor="green"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Direct Chat"
              description="After accepting the service, you can chat wuth your client via Whatsapp or SMS."
              icon={Fingerprint}
              iconColor="pink"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
