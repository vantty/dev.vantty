import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LinkMui from "@material-ui/core/Link";
import {
  ReactiveBase,
  CategorySearch,
  SingleRange,
  ReactiveList,
  ResultCard,
  DataSearch,
  MultiDataList
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

const { ResultCardsWrapper } = ReactiveList;

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    maring: "50px"
  },
  media: {
    height: 140
  }
}));

const filterPicture = (portfolioPictures, values) => {
  try {
    // console.log("ENTER", portfolioPictures, values);
    let auxObj = {};
    let newPictureObj = [];

    portfolioPictures.map(picture => {
      if (picture.tag === values) {
        auxObj = picture;
        newPictureObj.push(auxObj);
      }
    });
    console.log("EXIT", newPictureObj);
    // return newPictureObj;
  } catch (error) {
    console.log(error);
  }
};

const Favorites = () => {
  const classes = useStyles();
  const [values, setValues] = useState([]);
  return (
    <ReactiveBase
      app="vantty-database"
      credentials="fMzMk5aCe:360198cd-be1d-4776-b637-b46194703666"
    >
      <DataSearch
        componentId="searchbox"
        dataField={["portfolioPictures.tag"]}
        placeholder="Search..."
      />
      {/* <SingleRange
        componentId="ratingsfilter"
        title="Filter by ratings"
        dataField="price"
        data={[
          { start: "0", end: "400", label: "see all" },
          { start: "0", end: "350", label: "Between 0-350" },
          { start: "350", end: "400", label: "Between 350-400" }
        ]}
        defaultValue="see all"
      /> */}
      <MultiDataList
        componentId="categoryFilter"
        dataField="portfolioPictures.tag.keyword"
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
      {/* {console.log(values)} */}
      <ReactiveList
        componentId="result"
        title="Results"
        size={12}
        infiniteScroll={true}
        showResultStats={false}
        // loader={<Progress />}
        react={{
          and: ["searchbox", "categoryFilter"]
        }}
        render={({ data }) => (
          <Fragment>
            <Container>
              <ResultCardsWrapper>
                {data.map(item => (
                  <Fragment key={item._id}>
                    {item.portfolioPictures.map(pic => (
                      <Fragment key={pic.cloudId}>
                        {filterPicture(item.portfolioPictures, values[0])}
                        <ResultCard>
                          <CardMedia
                            className={classes.media}
                            image={pic.original}
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {item.name.firstName}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
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
                              size="small"
                              color="primary"
                              component={Link}
                              to={`/profile/artist/${item.userId}`}
                            >
                              View
                            </Button>
                          </CardActions>
                        </ResultCard>
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
export default Favorites;
