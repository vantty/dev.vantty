import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

// Actions
import { searchValue } from "../../../../actions/search";

// Assets
// import top from "../../../../assets/images/top.jpg";

// Material-UI
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const JumbotronBackground =
  "https://res.cloudinary.com/vantty/image/upload/v1571950819/seed/tcsdqqbip3si1anndljy.jpg";

const Logo =
  "https://res.cloudinary.com/vantty/image/upload/v1572304171/seed/pms9bvmck4uygtqs0ljz.png";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%"
  },
  grid: {
    height: "100%"
  },
  logo: {
    // height: "80%",
    position: "absolute",
    width: "5rem",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  quoteContainer: {},
  quote: {
    zIndex: "10",
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${JumbotronBackground})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    marginLeft: theme.spacing(2),
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    textAlign: "left",
    marginBottom: "1rem",
    color: "white"
  },
  textField: {
    backgroundColor: "white",
    borderRadius: "4px",
    borderColor: "white",
    "&:hover": {
      borderColor: "white"
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white"
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
  }
}));

const HomeJumbotron = ({ searchValue, goSearch }) => {
  const classes = useStyles();

  const [search, setSearch] = useState("");

  const handleChange = event => {
    event.persist();
    setSearch(event.target.value);
  };

  const handleSearch = async event => {
    event.preventDefault();
    searchValue(search);
  };

  if (goSearch) {
    return <Redirect push to="/search" />;
  }

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteContainer} item sm={12}>
            {isMobile && <img src={Logo} alt="" className={classes.logo} />}
            <div className={classes.quote}>
              <Container maxWidth="xl">
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <div className={classes.quoteInner}>
                      <Typography className={classes.quoteText} variant="h1">
                        Get your dreamed look, done by the perfect artists
                      </Typography>
                      <form onSubmit={handleSearch}>
                        <TextField
                          id="outlined-simple-start-adornment"
                          onChange={handleChange}
                          fullWidth
                          className={classes.textField}
                          variant="outlined"
                          placeholder="Search"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            )
                          }}
                        />
                      </form>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

HomeJumbotron.propTypes = {
  searchValue: PropTypes.func,
  goSearch: PropTypes.bool
};

const mapStateToProps = state => ({
  goSearch: state.search.goSearch
});

export default connect(
  mapStateToProps,
  { searchValue }
)(HomeJumbotron);
