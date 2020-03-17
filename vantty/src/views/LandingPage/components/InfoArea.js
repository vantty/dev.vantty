import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// import styles from "assets/jss/material-kit-react/components/infoStyle.js";

// const useStyles = makeStyles(styles);

export default function rea(props) {
  const useStyles = makeStyles(theme => ({
    infoArea: {
      maxWidth: "360px",
      margin: "0 auto",
      padding: "0px"
    },
    iconWrapper: {
      float: "left",
      marginTop: "24px",
      marginRight: "10px"
    },
    primary: {
      color: "black"
    },
    warning: {
      color: "black"
    },
    danger: {
      color: "black"
    },
    success: {
      color: "black"
    },
    info: {
      color: "black"
    },
    rose: {
      color: "black"
    },
    gray: {
      color: "black"
    },
    icon: {
      width: "36px",
      height: "36px"
    },
    descriptionWrapper: {
      color: "black",
      overflow: "hidden"
    },
    title,
    description: {
      color: "black",
      overflow: "hidden",
      marginTop: "0px",
      fontSize: "14px"
    },
    iconWrapperVertical: {
      float: "none"
    },
    iconVertical: {
      width: "61px",
      height: "61px"
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
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}

rea.defaultProps = {
  iconColor: "gray"
};

rea.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  vertical: PropTypes.bool
};
