import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LinkMui from "@material-ui/core/Link";
import {
  ReactiveBase,
  CategorySearch,
  SingleRange,
  ReactiveList,
  ResultCard,
  DataSearch,
  MultiDataList,
  DynamicRangeSlider
} from "@appbaseio/reactivesearch";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, Hidden, Toolbar, Avatar } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";

import { clearSearch } from "../../actions/search";
import { RenderArtist } from "./Components";
import { Header } from "../../components";
import { isMobile } from "react-device-detect";
import { AppBar } from "./Components";
import CircularProgress from "@material-ui/core/CircularProgress";
// Actions
import { changeNavbarValue } from "../../actions/navbar";

const { ResultCardsWrapper } = ReactiveList;
const useStyles = makeStyles(theme => ({
  // card: {
  //   maxWidth: 600,
  //   marging: "50px"
  // },
  // media: {
  //   height: 140
  // },
  resultCard: {
    boxShadow: "none" + "!important",
    border: "none" + "!important"
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.6rem",
    backgroundColor: "#ffff",
    boxShadow: "none"
  },
  filters: {
    marginTop: "18px"
  },
  cardMedia: {
    paddingTop: "100%",
    borderRadius: "0.5rem"
  },
  cardContent: {
    flexGrow: 1,
    padding: 0,
    paddingBottom: 0 + "!important"
  },
  cardTitle: {
    padding: 0,
    paddingLeft: "0.6rem",
    minHeight: "0px" + "!important",
    marginTop: "0.5rem"
  },
  avatar: {
    display: "inline-block",
    width: 30,
    height: 30
  },
  name: {
    display: "inline-block",
    margin: 0,
    paddingLeft: "0.5rem",
    fontSize: "12px"
  }
}));

//Generate a complete picture object
const shuffle = data => {
  let arrTotal = [];
  let id = data.map(user => {
    user.portfolioPictures.map(pic => {
      pic.userId = user.userId;
      pic.name = user.name.firstName;
      pic.verified = user.verified;
      arrTotal.push(pic);
    });
  });

  var ctr = arrTotal.length,
    temp,
    index;

  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arrTotal[ctr];
    arrTotal[ctr] = arrTotal[index];
    arrTotal[index] = temp;
  }
  return arrTotal;
};

const Search = ({ changeNavbarValue, searchValue, clearSearch }) => {
  useEffect(() => {
    changeNavbarValue("search");
  }, []);
  const classes = useStyles();
  const [values, setValues] = useState("");

  return (
    <ReactiveBase
      app='vantty-database'
      credentials='fMzMk5aCe:360198cd-be1d-4776-b637-b46194703666'
    >
      <Header />
      {isMobile && (
        <AppBar
          children={
            <DataSearch
              onChange={clearSearch}
              componentId='searchbox'
              dataField='*'
              placeholder='Search...'
              defaultValue={searchValue}
            />
          }
        />
      )}
      <Container maxWidth='lg'>
        {/* <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "40%" }}
          > */}
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='flex-start'
        >
          <Hidden xsDown>
            <Grid item lg={4} className={classes.filters}>
              <DataSearch
                onChange={clearSearch}
                componentId='searchbox'
                dataField='*'
                placeholder='Search...'
                defaultValue={searchValue}
              />

              <br />

              <MultiDataList
                componentId='categoryFilter'
                dataField='portfolioPictures.tag.keyword'
                showSearch={false}
                data={[
                  {
                    label: "Social",
                    value: "Social"
                  },
                  {
                    label: "Bridal",
                    value: "Bridal"
                  },
                  {
                    label: "Photography",
                    value: "Photography"
                  }
                ]}
                value={values}
                onChange={setValues}
                title='Category'
              />
            </Grid>
          </Hidden>

          <Grid item lg={8} xs={12}>
            {/* </div> */}
            <ReactiveList
              componentId='result'
              dataField='*'
              title='Results'
              size={12}
              infiniteScroll={true}
              showResultStats={false}
              loader={<CircularProgress />}
              style={{
                width: "100%",
                textAlign: "center"
              }}
              react={{
                and: ["searchbox", "categoryFilter", "DynamicRangeSensor"]
              }}
              render={({ data }) => (
                <Fragment>
                  <ResultCardsWrapper>
                    <Fragment>
                      {shuffle(data).map(pic => (
                        <Fragment key={pic.cloudId}>
                          {!values[0] && pic.verified ? (
                            <Fragment>
                              <ResultCard className={classes.resultCard}>
                                <Fragment>
                                  <Card className={classes.card}>
                                    <CardActionArea>
                                      <a
                                        href={`http://localhost:3000/profile/artist/${pic.userId}`}
                                        target='_blank'
                                      >
                                        <CardMedia
                                          key={pic.original}
                                          className={classes.cardMedia}
                                          image={pic.original}
                                          title='Image title'
                                        />
                                      </a>
                                    </CardActionArea>
                                    <CardContent
                                      className={classes.cardContent}
                                    >
                                      <Toolbar className={classes.cardTitle}>
                                        <Avatar
                                          alt=''
                                          src={pic.profilePicture}
                                          className={classes.avatar}
                                        />
                                        <Typography
                                          key={pic.original}
                                          gutterBottom
                                          className={classes.name}
                                        >
                                          {"by "}
                                          {pic.name}
                                        </Typography>
                                      </Toolbar>
                                    </CardContent>
                                  </Card>
                                </Fragment>
                              </ResultCard>
                            </Fragment>
                          ) : (
                            values.indexOf(pic.tag) > -1 && (
                              <Fragment>
                                <ResultCard className={classes.resultCard}>
                                  <Fragment>
                                    <Card className={classes.card}>
                                      <CardActionArea>
                                        <a
                                          href={`http://localhost:3000/profile/artist/${pic.userId}`}
                                          target='_blank'
                                        >
                                          <CardMedia
                                            key={pic.original}
                                            className={classes.cardMedia}
                                            image={pic.original}
                                            title='Image title'
                                          />
                                        </a>
                                      </CardActionArea>
                                      <CardContent
                                        className={classes.cardContent}
                                      >
                                        <Toolbar className={classes.cardTitle}>
                                          <Avatar
                                            alt=''
                                            src={pic.profilePicture}
                                            className={classes.avatar}
                                          />
                                          <Typography
                                            key={pic.original}
                                            gutterBottom
                                            className={classes.name}
                                          >
                                            {"by "}
                                            {pic.name}
                                          </Typography>
                                        </Toolbar>
                                      </CardContent>
                                    </Card>
                                  </Fragment>
                                </ResultCard>
                              </Fragment>
                            )
                          )}
                        </Fragment>
                      ))}
                    </Fragment>
                  </ResultCardsWrapper>
                </Fragment>
              )}
            />
            {/* </div> */}
          </Grid>
        </Grid>
      </Container>
    </ReactiveBase>
  );
};

Search.propTypes = {
  searchValue: PropTypes.string,
  clearSearch: PropTypes.func,
  changeNavbarValue: PropTypes.func
};

const mapStateToProps = state => ({
  searchValue: state.search.searchValue
});

export default connect(
  mapStateToProps,
  { changeNavbarValue, clearSearch }
)(Search);
