import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";

// Material-UI
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import { amber, green } from "@material-ui/core/colors";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

// function TransitionLeft(props) {
//   return <Slide {...props} direction="left" />;
// }

const Snackbar = ({ className, message, variant }) => {
  const classes = useStyles1();
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant])}
      // aria-describedby='client-snackbar'
      message={
        <span className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
    />
  );
};

Snackbar.propTypes = {
  className: PropTypes.string,
  message: PropTypes.any,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2)
  },
  anchorOriginTopCenter: {
    [theme.breakpoints.down("sm")]: {
      top: "100px",
      justifyContent: "left"
    }
  },
  root: {
    // [theme.breakpoints.down("md")]: {
    borderRadius: 4,
    marginTop: "6rem",
    marginLeft: "0.5rem",
    minWidth: "10rem",
    maxWidth: "10rem",
    zIndex: 1,
    position: "absolute"
    // }
  }
}));

const Alert = ({ alerts }) => {
  const classes = useStyles2();

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={classes.root}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          variant={alert.alertType}
          className={classes.margin}
          autoHideDuration={6000}
          // message={alert.msg}
          // ContentProps={{
          //   "aria-describedby": "snackbar-message-id"
          // }}
          message={<span id={alert.id}>{alert.msg}</span>}
        />
      </div>
    ))
  );

  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };
  // return (
  //   <div>
  //     {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
  //     {alerts !== null &&
  //       alerts.length > 0 &&
  //       alerts.map(alert => (
  //         <div key={alert.id} className={classes.root}>
  //           {console.log(alert)}
  //           <Snackbar
  //             // anchorOrigin={{
  //             //   vertical: 'bottom',
  //             //   horizontal: 'left',
  //             // }}
  //             open={open}
  //             autoHideDuration={6000}
  //             onClose={handleClose}
  //             ContentProps={{
  //               "aria-describedby": "message-id"
  //             }}
  //             anchorOrigin={{
  //               vertical: "top",
  //               horizontal: "left"
  //             }}
  //             // open={open}
  //             autoHideDuration={6000}
  //             variant={alert.alertType}
  //             className={classes.margin}
  //             // message={alert.msg}
  //             message={<span id='message-id'>{alert.msg}</span>}
  //             action={[
  //               <Button
  //                 key='undo'
  //                 color='secondary'
  //                 size='small'
  //                 onClick={handleClose}
  //               >
  //                 UNDO
  //               </Button>,
  //               <IconButton
  //                 key='close'
  //                 aria-label='close'
  //                 color='inherit'
  //                 className={classes.close}
  //                 onClick={handleClose}
  //               >
  //                 {/* <CloseIcon /> */}
  //               </IconButton>
  //             ]}
  //           />
  //         </div>
  //       ))}
  //   </div>
  // );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
