import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { searchValue } from "../../../../actions/search";

// Assets
import top from "../../../../assets/images/top.jpg";

// Material-UI
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

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
    marginBottom: "1rem"
  },
  textField: {
    backgroundColor: "white",
    borderRadius: "4px",
    borderColor: "white",
    "&:hover": {
      borderColor: "white"
    }
  }
}));

const HomeJumbotron = ({ searchValue }) => {
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
                <Grid item xs={12} sm={6}>
                  <div className={classes.quoteInner}>
                    <Typography className={classes.quoteText} variant='h1'>
                      Get your dreamed look, done by the perfect artists
                    </Typography>
                    <form onSubmit={handleSearch}>
                      <TextField
                        id='outlined-simple-start-adornment'
                        onChange={handleChange}
                        fullWidth
                        className={classes.textField}
                        variant='outlined'
                        placeholder='Search'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
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
