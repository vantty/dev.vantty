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
import { Container } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";

import { clearSearch } from "../../../../actions/search";

const { ResultCardsWrapper } = ReactiveList;

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    marging: "50px"
  },
  media: {
    height: 140
  }
}));

const Search = ({ searchValue, clearSearch }) => {
  const classes = useStyles();
  const [values, setValues] = useState("");

  return (
    <ReactiveBase
      app='vantty-database'
      credentials='fMzMk5aCe:360198cd-be1d-4776-b637-b46194703666'
    >
      <DataSearch
        onChange={clearSearch}
        componentId='searchbox'
        dataField='*'
        placeholder='Search...'
        defaultValue={searchValue}
      />
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
      <ReactiveList
        componentId='result'
        dataField='*'
        title='Results'
        size={12}
        infiniteScroll={true}
        showResultStats={false}
        // loader={<Progress />}
        react={{
          and: ["searchbox", "categoryFilter", "DynamicRangeSensor"]
        }}
        render={({ data }) => (
          <Fragment>
            <Container>
              <ResultCardsWrapper>
                {data.map(item => (
                  <Fragment key={item._id}>
                    {item.portfolioPictures.map(pic => (
                      <Fragment key={pic.cloudId}>
                        {!values[0] ? (
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
            </Container>
          </Fragment>
        )}
      />
    </ReactiveBase>
  );
};

Search.propTypes = {
  searchValue: PropTypes.string,
  clearSearch: PropTypes.func
};

const mapStateToProps = state => ({
  searchValue: state.search.searchValue
});

export default connect(
  mapStateToProps,
  { clearSearch }
)(Search);
