import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

export default function Area(props) {
  const useStyles = makeStyles(theme => ({
    infoArea: {
      maxWidth: '360px',
      margin: '0 auto',
      padding: '0px'
    },
    iconWrapper: {
      float: 'left',
      marginTop: '24px',
      marginRight: '10px'
    },
    pink: {
      color: theme.palette.pinkVantty.dark
    },
    purple: {
      color: theme.palette.purpleVantty.light
    },
    green: {
      color: theme.palette.greenVantty.dark
    },

    icon: {
      width: '36px',
      height: '36px'
    },
    descriptionWrapper: {
      color: 'black',
      overflow: 'hidden'
    },
    title: {
      marginBottom: '1rem'
    },
    description: {
      color: theme.palette.text.secondary,
      overflow: 'hidden',
      marginTop: '0px',
      fontSize: '14px',
      marginBottom: '2rem'
    },
    iconWrapperVertical: {
      float: 'none'
    },
    iconVertical: {
      width: '61px',
      height: '61px'
    }
  }));

  const classes = useStyles();
  const { title, description, iconColor, vertical } = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical
  });
  return (
    <div className={classes.rea}>
      <div className={iconWrapper}>
        <props.icon className={iconClasses} />
      </div>
      <div className={classes.descriptionWrapper}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="h5" className={classes.description}>
          {description}
        </Typography>
      </div>
    </div>
  );
}

Area.defaultProps = {
  iconColor: 'gray'
};

Area.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    'primary',
    'warning',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  vertical: PropTypes.bool
};
