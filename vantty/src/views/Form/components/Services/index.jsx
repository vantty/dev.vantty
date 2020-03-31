import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

//Actions
import {
  getCurrentProfile,
  update,
  addService,
  deleteService
} from '../../../../actions/profile';

//Components
import { FormBottomNav, CustomPaper } from '../ComponentsForm';

import { isMobile } from 'react-device-detect';

// Externals
import PropTypes from 'prop-types';

// Material components

import {
  CardHeader,
  Divider,
  Button,
  CardActions,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Progress from '@material-ui/core/LinearProgress';

import { Form, ServiceCard, StartService } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0'
  },
  button: {
    float: 'right',
    color: 'white',
    boxShadow: 'none',
    backgroundColor: theme.palette.greenVantty.main,
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.greenVantty.light
    }
  },
  content: {
    padding: '1rem'
  }
}));

const Price = ({
  profile: { profile, loading },
  update,
  nextStep,
  prevStep,
  step,
  match,
  getCurrentProfile,
  className,
  history,
  addService,
  deleteService
}) => {
  const classes = useStyles();

  const [price, setPrice] = useState('1000');

  const [serviceData, setServiceData] = useState({
    typeOfService: '',
    amount: '',
    description: ''
  });

  useEffect(() => {
    setPrice(loading || !profile.price ? '' : profile.price);
  }, [loading, getCurrentProfile]);

  if (!profile) {
    return <Progress />;
  }

  const onChange = e =>
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });

  // const { price } = formData;
  const { typeOfService, amount, description } = serviceData;

  const back = e => {
    e.preventDefault();
    prevStep();
  };

  // const handleChange = (event, price) => {
  //   setFormData({ price });
  // };

  // functions that sort the lowest price

  const changeStartPrice = newPrice => {
    // if (newPrice < price) {
    setPrice(newPrice);
    // }
  };

  const onSubmit = e => {
    e.preventDefault();
    update({ price: price });
    nextStep();
  };

  const onSubmitPrice = async e => {
    e.preventDefault();
    await addService({ typeOfService, amount, description }, history, true);
    const newPrice = Number(amount);
    const amounts = await amountsArr(profile.services);
    const minAmount = Math.min(...amounts);
    if (newPrice < minAmount) {
      await update({ price: newPrice });
      setPrice(amount);
    }
  };

  const amountsArr = async services => {
    let amounts = [];
    await services.forEach(service => {
      return amounts.push(service.amount);
    });
    return amounts;
  };

  const deleteServiceFunction = async (e, id) => {
    e.preventDefault();
    const { services } = await deleteService(id);
    const amounts = await amountsArr(services);
    const minAmount = Math.min(...amounts);
    update({ price: minAmount });
  };

  const desable = (profile, price) => {
    if (profile.services.length === 0) {
      return true;
    } else if (price === 0 || price === '') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Fragment>
      <CustomPaper
        Children={
          <Fragment>
            {profile ? (
              <form autoComplete="off" noValidate>
                <Form
                  serviceData={serviceData}
                  onChange={onChange}
                  onSubmitPrice={onSubmitPrice}
                  services={profile.services}
                />
                <Divider />
                <CardHeader title="Services" />
                <ServiceCard
                  services={profile.services}
                  deleteService={deleteServiceFunction}
                />
              </form>
            ) : (
              <Progress />
            )}
          </Fragment>
        }
      />
      <Fragment>
        {match.url === '/create-profile' ? (
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Fragment>
                    <Button onClick={back}>Back</Button>
                    <Button
                      className={classes.button}
                      onClick={e => onSubmit(e)}
                      disabled={desable(profile, price)}
                    >
                      Next
                    </Button>
                  </Fragment>
                </div>
              </div>
            }
          />
        ) : null}
      </Fragment>
    </Fragment>
  );
};

Price.propTypes = {
  className: PropTypes.string,
  update: PropTypes.func.isRequired,
  addService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  update,
  getCurrentProfile,
  addService,
  deleteService
})(withRouter(Price));
