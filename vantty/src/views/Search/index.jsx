import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Hidden,
  Toolbar,
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress
} from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";

// Actions
import { clearSearch } from "../../actions/search";
import { changeNavbarValue } from "../../actions/navbar";

// Components
import { Header } from "../../components";
import { AppBar } from "./Components";

// Reactive Search (Appbase)
import {
  ReactiveBase,
  ReactiveList,
  ResultCard,
  DataSearch,
  MultiDataList,
  RangeInput,
  RatingsFilter
} from "@appbaseio/reactivesearch";
const { ResultCardsWrapper } = ReactiveList;

const useStyles = makeStyles(theme => ({
  resultCard: {
    boxShadow: `none !important`,
    border: `none !important`
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
    minHeight: `0 !important`,
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

const Search = ({ changeNavbarValue, searchValue, clearSearch }) => {
  useEffect(() => {
    changeNavbarValue("search");
  }, []);
  const classes = useStyles();
  const [values, setValues] = useState("");

  return (
    <ReactiveBase
      app={process.env.REACT_APP_APPBASE_INDEX}
      credentials={process.env.REACT_APP_APPBASE_CREDENTIALS}
    >
      <Header />
      {isMobile && (
        <AppBar
          children={
            <DataSearch
              onChange={clearSearch}
              componentId="searchbox"
              dataField="*"
              placeholder="Search..."
              defaultValue={searchValue}
            />
          }
          modal={
            <Fragment>
              <MultiDataList
                componentId="categoryFilter"
                dataField="tag.keyword"
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
                title="Category"
              />
              <RangeInput
                componentId="RangeInputComponent"
                dataField="price"
                title="Price"
                range={{
                  start: 50,
                  end: 300
                }}
              />
              <RatingsFilter
                title="Rating"
                componentId="ratingsSensor"
                dataField="ratings"
                data={[
                  { start: 4, end: 5, label: "4 & up" },
                  { start: 3, end: 5, label: "3 & up" },
                  { start: 1, end: 5, label: "All" }
                ]}
              />
            </Fragment>
          }
          invisible={values}
        />
      )}
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Hidden xsDown>
            <Grid item md={4} className={classes.filters}>
              <Grid item xs={12}>
                <DataSearch
                  onChange={clearSearch}
                  componentId="searchbox"
                  dataField="*"
                  placeholder="Search..."
                  defaultValue={searchValue}
                />
              </Grid>
              <Grid item xs={12}>
                <MultiDataList
                  componentId="categoryFilter"
                  dataField="tag.keyword"
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
                  title="Category"
                />
              </Grid>
              <Grid item xs={12}>
                <RangeInput
                  componentId="RangeInputComponent"
                  dataField="price"
                  title="Price"
                  range={{
                    start: 50,
                    end: 300
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <RatingsFilter
                  title="Rating"
                  componentId="ratingsSensor"
                  dataField="ratings"
                  data={[
                    { start: 4, end: 5, label: "4 & up" },
                    { start: 3, end: 5, label: "3 & up" },
                    { start: 1, end: 5, label: "All" }
                  ]}
                />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={8}>
            {/* </div> */}
            <ReactiveList
              componentId="result"
              dataField="*"
              title="Results"
              size={31}
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
                      {data.map(pic => (
                        <Fragment key={pic.cloudId}>
                          {!values[0] && pic.verified ? (
                            <Fragment>
                              <ResultCard className={classes.resultCard}>
                                <Fragment>
                                  <Card className={classes.card}>
                                    <CardActionArea>
                                      <MuiLink
                                        component={Link}
                                        to={`/profile/artist/${pic.userId}`}
                                      >
                                        <CardMedia
                                          key={pic.original}
                                          className={classes.cardMedia}
                                          image={pic.original}
                                          title="Image title"
                                        />
                                        {/* </a> */}
                                      </MuiLink>
                                    </CardActionArea>
                                    <CardContent
                                      className={classes.cardContent}
                                    >
                                      <Toolbar className={classes.cardTitle}>
                                        <Avatar
                                          alt=""
                                          src={pic.profilePicture}
                                          className={classes.avatar}
                                        />
                                        <Typography
                                          key={pic.original}
                                          gutterBottom
                                          className={classes.name}
                                        >
                                          {"by "}
                                          {pic.name.firstName}
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
                                        <MuiLink
                                          component={Link}
                                          to={`/profile/artist/${pic.userId}`}
                                        >
                                          <CardMedia
                                            key={pic.original}
                                            className={classes.cardMedia}
                                            image={pic.original}
                                            title="Image title"
                                          />
                                          {/* </a> */}
                                        </MuiLink>
                                      </CardActionArea>
                                      <CardContent
                                        className={classes.cardContent}
                                      >
                                        <Toolbar className={classes.cardTitle}>
                                          <Avatar
                                            alt=""
                                            src={pic.profilePicture}
                                            className={classes.avatar}
                                          />
                                          <Typography
                                            key={pic.original}
                                            gutterBottom
                                            className={classes.name}
                                          >
                                            {"by "}
                                            {pic.name.firstName}
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

export default connect(mapStateToProps, { changeNavbarValue, clearSearch })(
  Search
);
