import React, { useState, Fragment } from "react";
import Search from "./Components/MainSearch";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import { Render, RenderArtist, AppBar } from "./Components";
import { isMobile } from "react-device-detect";
import { Header } from "../../components";
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
import { clearSearch } from "../../actions/search";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
const { ResultCardsWrapper } = ReactiveList;

const useStyles = makeStyles(theme => ({
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },

  // mainFeaturedPostContent: {
  //   position: "relative",
  //   padding: theme.spacing(3),
  //   [theme.breakpoints.up("md")]: {
  //     padding: theme.spacing(6),
  //     paddingRight: 0
  //   }
  // },
  mainGrid: {
    marginTop: theme.spacing()
  },

  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  }
}));

const sections = [
  "Technology",
  "Design",
  "Culture",
  "Business",
  "Politics",
  "Opinion",
  "Science",
  "Health",
  "Style",
  "Travel"
];

const Favorites = ({ searchValue, clearSearch }) => {
  const classes = useStyles();
  const [values, setValues] = useState("");

  return (
    <Fragment>
      {/* {isMobile && <AppBar />} */}
      <Divider />

      <ReactiveBase
        app='vantty-database'
        credentials='fMzMk5aCe:360198cd-be1d-4776-b637-b46194703666'
      >
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
        <Fragment>
          <Container maxWidth='md'>
            {/* <Toolbar
              component='nav'
              variant='dense'
              className={classes.toolbarSecondary}
            >
              {sections.map(section => (
                <Link
                  color='inherit'
                  noWrap
                  key={section}
                  variant='body2'
                  href='#'
                  className={classes.toolbarLink}
                >
                  {section}
                </Link>
              ))}
            </Toolbar> */}
            {/* <Container fixed={true}> */}
            <Header />
            <main>
              {!isMobile && (
                <DataSearch
                  onChange={clearSearch}
                  componentId='searchbox'
                  dataField='*'
                  placeholder='Search...'
                  defaultValue={searchValue}
                />
              )}
              <Grid container spacing={5} wrap='nowrap'>
                <Hidden xsDown>
                  {/* Sidebar */}
                  <Grid item xs={4} md={4}>
                    {/* <Paper elevation={0} className={classes.sidebarAboutBox}>
                      <Typography variant='h6' gutterBottom>
                        About
                      </Typography>
                    </Paper> */}
                    <Typography
                      variant='h6'
                      gutterBottom
                      className={classes.sidebarSection}
                    >
                      Category
                    </Typography>

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
                      // title='Category'
                    />
                  </Grid>
                </Hidden>

                <ReactiveList
                  componentId='result'
                  dataField='*'
                  title='Results'
                  size={8}
                  infiniteScroll={true}
                  showResultStats={false}
                  // loader={<Progress />}
                  react={{
                    and: ["searchbox", "categoryFilter", "DynamicRangeSensor"]
                  }}
                  render={({ data }) => (
                    <Fragment>
                      <ResultCardsWrapper>
                        {/* <Grid item xs={12} md={8}> */}
                        <RenderArtist data={data} values={values} />
                        {/* <Render /> */}
                        {/* </Grid> */}
                        {/* </Grid> */}
                      </ResultCardsWrapper>
                    </Fragment>
                  )}
                />
                {/* Main content */}
                {/* End main content */}
              </Grid>
            </main>
          </Container>
        </Fragment>
      </ReactiveBase>
      {/* <Render /> */}
    </Fragment>
  );
};

export default Favorites;
