import React, { Fragment, useState } from "react";
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

const Artists = ({ searchValue, clearSearch }) => {
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
              // loader={<Progress />}
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
                    {data.map(item => (
                      <Fragment key={item._id}>
                        {item.portfolioPictures.map(pic => (
                          <Fragment key={pic.cloudId}>
                            {!values[0] ? (
                              <Fragment>
                                <ResultCard className={classes.resultCard}>
                                  <Fragment>
                                    <Card className={classes.card}>
                                      <CardActionArea>
                                        <LinkMui
                                          component={Link}
                                          to={`/profile/artist/${item.userId}`}
                                        >
                                          <CardMedia
                                            key={pic.original}
                                            className={classes.cardMedia}
                                            image={pic.original}
                                            title='Image title'
                                          />
                                        </LinkMui>
                                      </CardActionArea>
                                      <CardContent
                                        className={classes.cardContent}
                                      >
                                        <Toolbar className={classes.cardTitle}>
                                          <Avatar
                                            alt=''
                                            src={item.profilePicture}
                                            className={classes.avatar}
                                          />
                                          <Typography
                                            key={pic.original}
                                            gutterBottom
                                            className={classes.name}
                                          >
                                            {"by "}
                                            {item.name.firstName}
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
                                  <ResultCard>
                                    <CardMedia
                                      className={classes.media}
                                      image={pic.original}
                                      title='Contemplative Reptile'
                                    />
                                    <CardContent>
                                      <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='h2'
                                      >
                                        {item.name.firstName}
                                      </Typography>
                                      <Typography
                                        variant='body2'
                                        color='textSecondary'
                                        component='p'
                                      >
                                        {item.profession}
                                        <br />
                                        {item.city}
                                        <br />
                                        {pic.tag}
                                      </Typography>
                                    </CardContent>
                                    <CardActions>
                                      <Button
                                        size='small'
                                        color='primary'
                                        component={Link}
                                        to={`/profile/artist/${item.userId}`}
                                      >
                                        View
                                      </Button>
                                    </CardActions>
                                  </ResultCard>
                                </Fragment>
                              )
                            )}
                          </Fragment>
                        ))}
                      </Fragment>
                    ))}
                  </ResultCardsWrapper>
                  {/* </Container> */}
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

Artists.propTypes = {
  searchValue: PropTypes.string,
  clearSearch: PropTypes.func
};

const mapStateToProps = state => ({
  searchValue: state.search.searchValue
});

export default connect(
  mapStateToProps,
  { clearSearch }
)(Artists);
