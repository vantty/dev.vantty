import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Table } from "./components";

//Google Analytics
import { gaEvent } from "../../../../marketing/gAnalytics";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: 260,
    // backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      marginTop: "5.5rem"
    },
    position: "absolute"
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  section1: {
    margin: theme.spacing(1)
  },
  section2: {
    margin: theme.spacing(2)
  },
  section3: {
    width: "100%",
    margin: theme.spacing(3, 1, 1)
  },
  paper: {
    padding: theme.spacing(2)
    // backgroundColor: "white"
  },
  button: {
    width: "90%",
    color: "white",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
  },
  a: {
    color: "white"
  },
  table: {
    backgroundColor: "white"
  },
  // button: {
  //   marginTop: "0.5rem",
  //   marginBottom: "0.5rem",
  //   width: "10rem",
  //   float: "right",
  //   color: "white",
  //   boxShadow: "none",
  //   backgroundColor: theme.palette.whatsApp.primary,
  //   "&:hover": {
  //     color: "white",
  //     backgroundColor: theme.palette.whatsApp.primary
  //   }
  // },
  infoPrice: {
    fontSize: "10px"
  }
}));

export default function Slider({
  profile,
  disabled,
  verified,
  user,
  loadService,
  onChange,
  onChangeDate,
  state,
  owner
}) {
  const classes = useStyles();

  // const [book, setBook] = useState({
  //   date: "",
  //   hour: "",
  //   services: [],
  //   taxes: "",
  //   totalValue: ""
  // });

  // const onChange = e => setBook({ ...book, [e.target.name]: e.target.value });

  // const { services } = book;
  const load = (state, profile) => {
    loadService(state);
    gaEvent("Inicio checkout", "Click to checkout", profile.user);
  };
  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.paper}>
        {/* <div className={classes.section1}> */}
        <Typography color='primary' variant='body1'>
          Starting Cost
        </Typography>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h4'>
              ${profile.price}
              <span className={classes.infoPrice}> /cad </span>
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Typography color='primary' variant='body1'>
          Availability
        </Typography>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography variant='h5'>{profile.availability}</Typography>
          </Grid>
        </Grid>
        <br />

        <Typography color='primary' variant='body1'>
          Services
        </Typography>
        <Table services={profile.services} />
        {/* <Divider />
        <br />
        {!owner && (
            <Typography color='primary' variant='body1'>
              Date
            </Typography>
          ) && <Date onChangeDate={onChangeDate} />} */}

        {/* <Divider /> */}
        {/* <br /> */}

        {/* <Typography color="primary" variant="body1">
          Hour Range
        </Typography>
        <Hour onChangeDate={onChangeDate} state={state} /> */}
        <Divider variant='middle' />

        {/* <Typography color="primary" variant="body1">
          Resume
        </Typography>
        <Resume /> */}
        {/* <Divider variant="middle" /> */}
        <Fragment>
          {/* <Divider variant='middle' /> */}
          {user.profile ||
            (!owner && (
              <div className={classes.section3}>
                <Button
                  className={classes.button}
                  // disabled={!verified}
                  component={Link}
                  // to={"/checkout"}
                  to={`/checkout/${profile.user}/${profile.bookId}`}
                  onClick={() => load(state, profile)}
                  variant='contained'
                >
                  Book
                </Button>
              </div>
            ))}
        </Fragment>
        {/* {!disabled && (
          <Fragment>
            <Divider variant='middle' />
            <div className={classes.section3}>
              <Button
                className={classes.button}
                disabled={!verified}
                // variant='contained'
              >
                <Fragment>
                  <a
                    className={classes.a}
                    target='#'
                    href={`https://api.whatsapp.com/send?phone=${profile.mobileNumber}&text=Hello!%20${profile.name.firstName},%20I%20watched%20your%20profile%20in%20www.vantty.ca,%20so%20I%20wanted%20to%20get%20an%20appointment%20with%20you!`}
                    onClick={ReactGA.event(
                      "send",
                      "event",
                      "Contacto profesional",
                      "Click en boton WhatsApp",
                      "NTZ Natalia Zuluaga - ID 517"
                    )}
                  >
                    Whatsapp Contact
                  </a>
                </Fragment>
              </Button>
            </div>
          </Fragment>
        )} */}
      </Paper>
    </div>
  );
}
