import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import {
  isMobile,
  isAndroid,
  isIOS,
  isSafari,
  isChrome
} from "react-device-detect";
import { getStrategyName } from "../../helpers";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { getGeoInfo } from "../../actions/auth";

const useStyles = makeStyles({
  root: {
    width: "100%",
    // backgroundColor: "rgb(0, 223, 212)",
    backgroundColor: "#FAFAFA",
    overflow: "hidden",
    position: "fixed",
    bottom: 0,
    border: "grey"
  },
  button: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    width: "10rem",
    float: "right",
    backgroundColor: "rgb(90, 40, 146)",
    // backgroundColor: "rgb(0, 223, 212)",
    color: "white"
  },
  price: {
    // color: "white",
    color: "rgb(90, 40, 146)"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  buttonDrawer: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginRight: "0.5rem",
    marginLeft: "0.5rem",
    width: "10rem",
    float: "right",
    // backgroundColor: "rgb(90, 40, 146)",
    backgroundColor: "rgb(0, 223, 212)",
    color: "white"
  }
});

const ContactButton = ({
  profile: { mobileNumber, user, price },
  location
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const msg = kindOfPhone => {
    let text = `sms:${mobileNumber}${kindOfPhone}body=Hello! ${getStrategyName(
      user
    )},I watched your profile in www.vantty.com,so I wanted to get an appoinment with you!`;
    return text;
  };

  const fullList = side => (
    <div
      className={classes.fullList}
      role='presentation'
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      {location === "Canada" && (
        <Grid container direction='row' justify='center' alignItems='center'>
          {isAndroid ? (
            <a href={msg(isIOS ? "?" : "&")}>
              <Button className={classes.buttonDrawer} variant='contained'>
                SMS
              </Button>
            </a>
          ) : (
            <a href={msg("&")}>
              <Button className={classes.buttonDrawer} variant='contained'>
                SMS
              </Button>
            </a>
          )}

          <a
            target='#'
            href={`https://api.whatsapp.com/send?phone=${mobileNumber}&text=Hello!%20${getStrategyName(
              user
            )},%20I%20watched%20your%20profile%20in%20www.vantty.com,%20so%20I%20wanted%20to%20get%20an%20appoinment%20with%20you!`}
          >
            <Button
              style={{ backgroundColor: "#25D366" }}
              className={classes.buttonDrawer}
              variant='contained'
            >
              Whatsapp
            </Button>
          </a>
        </Grid>
      )}

      {true === "Colombia" && (
        <a
          target='#'
          href={`https://api.whatsapp.com/send?phone=${mobileNumber}&text=Hola!%20${getStrategyName(
            user
          )},%20Vi%20tu%20perfíl%20en%20www.vantty.com,%20y%20quiero%20tener%20una%20cita%20contigo!`}
        >
          <Button
            style={{ backgroundColor: "#25D366" }}
            className={classes.buttonDrawer}
            variant='contained'
          >
            Whatsapp
          </Button>
        </a>
      )}
    </div>
  );
  return (
    <Fragment>
      <div className={classes.root}>
        <Container maxWidth='md'>
          <Fragment>
            <Grid
              container
              direction='row'
              justify='space-around'
              alignItems='center'
            >
              <Grid item>
                <h4 className={classes.price}>CAD$ {price}</h4>
              </Grid>
              <Grid item>
                <Button
                  onClick={toggleDrawer("bottom", true)}
                  className={classes.button}
                  variant='contained'
                >
                  Contact
                </Button>

                <Drawer
                  anchor='bottom'
                  open={state.bottom}
                  onClose={toggleDrawer("bottom", false)}
                >
                  {fullList("bottom")}
                </Drawer>
              </Grid>
            </Grid>
          </Fragment>
        </Container>
      </div>
    </Fragment>
  );
};

ContactButton.propTypes = {
  profile: PropTypes.object.isRequired,
  mobileNumber: PropTypes.string,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ContactButton);
