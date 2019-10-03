import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { searchValue } from "../../actions/search";

// Assets
import top from "../../assets/images/top.jpg";

// Material-UI
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%"
  },
  grid: {
    height: "100%"
  },
  quoteContainer: {},
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${top})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    // color: theme.palette.black,
    // fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.black
  },
  bio: {
    color: theme.palette.black
  },
  search: {
    marginRight: theme.spacing(1),
    color: "#000",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.25)
    // },
    marginLeft: 0,
    width: "100px",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "auto"
    // },
    borderStyle: "solid",
    borderColor: "#f0f0f0",
    borderWidth: "1px"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "white"
  },
  inputInput: {
    color: "black",
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%"
    // [theme.breakpoints.up("sm")]: {
    //   width: 120,
    //   "&:focus": {
    //     width: 200
    //   }
    // }
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

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item sm={12}>
          <div className={classes.quote}>
            <Container>
              <Grid container>
                <Grid item xs={6}>
                  <div className={classes.quoteInner}>
                    <Typography className={classes.quoteText} variant="h1">
                      Get your dreamed look, done by the perfect artists
                    </Typography>
                    {/* <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <form onSubmit={handleSearch}> */}
                    <Grid item xs={12}>
                      <InputBase
                        onChange={handleChange}
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput
                        }}
                        inputProps={{ "aria-label": "search" }}
                      />
                    </Grid>
                    {/* </form>
                    </div> */}
                    <div className={classes.person}>
                      <Typography className={classes.name} variant="body1">
                        Takamaru Ayako
                      </Typography>
                      <Typography className={classes.bio} variant="body2">
                        Manager at inVision
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Grid>
      </Grid>
    </div>
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
