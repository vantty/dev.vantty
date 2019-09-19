import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import LinkMui from "@material-ui/core/Link";
import {
  ReactiveBase,
  CategorySearch,
  SingleRange,
  ReactiveList,
  ResultCard
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

const Favorites = () => {
  const classes = useStyles();
  return (
    <ReactiveBase
      app="vantty-database"
      credentials="fMzMk5aCe:360198cd-be1d-4776-b637-b46194703666"
    >
      <CategorySearch
        componentId="searchbox"
        dataField={["name.firstName", "name.lastName", "city", "profession"]}
        placeholder="Search..."
      />
      {/* <SingleRange
          componentId="ratingsfilter"
          title="Filter by ratings"
          dataField="rating"
          data={[
            { start: "0", end: "5", label: "see all ratings" },
            { start: "4", end: "5", label: "4 stars and up" },
            { start: "3", end: "5", label: "3 stars and up" },
            { start: "2", end: "5", label: "2 stars and up" },
            { start: "1", end: "5", label: "1 stars and up" }
          ]}
          defaultValue="see all ratings"
        /> */}

      <ReactiveList
        componentId="result"
        title="Results"
        dataField="name.firstName"
        size={12}
        infiniteScroll={true}
        showResultStats={false}
        loader={<Progress />}
        react={{
          and: ["searchbox"]
        }}
        render={({ data }) => (
          <Container>
            <ResultCardsWrapper>
              {data.map(item => (
                <Fragment key={item._id}>
                  {item.portfolioPictures.map(pic => (
                    <Fragment key={pic.cloudId}>
                      <ResultCard>
                        <CardMedia
                          className={classes.media}
                          image={pic.original}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
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
        )}
      />
    </ReactiveBase>
  );
};
export default Favorites;
