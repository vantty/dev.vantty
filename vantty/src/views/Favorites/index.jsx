import React, { Component } from "react";
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

const useStyles = makeStyles({
  card: {
    maxWidth: 600,
    maring: "50px"
  },
  media: {
    height: 140
  }
});

const Favorites = () => {
  const classes = useStyles();
  return (
    <Container>
      <ReactiveBase
        app='vantty-database'
        credentials='fMzMk5aCe:360198cd-be1d-4776-b637-b46194703666'
      >
        <CategorySearch
          componentId='searchbox'
          dataField='name'
          placeholder='Search for cars'
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
          componentId='result'
          title='Results'
          dataField='name'
          from={0}
          size={4}
          fuzziness={2}
          pagination={true}
          react={{
            and: ["searchbox"]
          }}
          render={({ data }) => (
            <ReactiveList.ResultCardsWrapper>
              {data.map(item => (
                <ResultCard key={item._id}>
                  <CardMedia
                    className={classes.media}
                    image='https://bit.do/demoimg'
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {item.name}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      {item.price}
                      {item.profession}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button size='small' color='primary'>
                      View
                    </Button>
                  </CardActions>
                </ResultCard>

                // <ResultCard key={item._id}>
                //   <ResultCard.Image src="https://bit.do/demoimg" />
                //   <ResultCard.Title
                //     dangerouslySetInnerHTML={{
                //       __html: item.brand
                //     }}
                //   />
                //   <ResultCard.Description>
                //     {item.model + " " + "*".repeat(item.rating)}
                //   </ResultCard.Description>
                // </ResultCard>
              ))}
            </ReactiveList.ResultCardsWrapper>
          )}
        />
      </ReactiveBase>
    </Container>
  );
};
export default Favorites;
