import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

// Actions
import { searchValue } from "../../../../actions/search";

// Material-UI
import SearchIcon from "@material-ui/icons/Search";
import {
  Grid,
  Typography,
  Button,
  Container,
  InputAdornment,
  TextField,
  CssBaseline
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const JumbotronBackground =
  "https://res.cloudinary.com/vantty/image/upload/q_auto:low/v1572391341/seed/ha8bgdvtvdaekxhabqja.jpeg";

const Logo =
  "https://res.cloudinary.com/vantty/image/upload/q_auto:low/v1572304171/seed/pms9bvmck4uygtqs0ljz.png";

const useStyles = makeStyles(theme => ({
  root: {},
  grid: {
    height: "30rem"
  },
  logo: {
    position: "absolute",
    width: "5rem",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  quoteContainer: {},
  quote: {
    height: "100%",
    zIndex: "10",
    backgroundColor: theme.palette.neutral,
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
    height: "40px",
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
    },
    "& .MuiOutlinedInput-adornedStart": {
      height: "40px"
    },
    "& .MuiOutlinedInput-input": {
      padding: 0
    }
  },
  button: {
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
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
        <Grid container>
          <Grid className={classes.grid} item sm={12}>
            {isMobile && <img src={Logo} alt="" className={classes.logo} />}
            <div className={classes.quote}>
              <Container maxWidth="xl">
                <Grid container>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className={classes.quoteInner}>
                      <Typography className={classes.quoteText} variant="h1">
                        Get your dreamed look, done by the perfect artists
                      </Typography>
                      <form onSubmit={handleSearch}>
                        <Grid container>
                          <Grid item>
                            <TextField
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
                          </Grid>
                          <Grid item>
                            <Button
                              type="submit"
                              color="primary"
                              variant="contained"
                              className={classes.button}
                            >
                              Search
                            </Button>
                          </Grid>
                        </Grid>
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

export default connect(mapStateToProps, { searchValue })(HomeJumbotron);
