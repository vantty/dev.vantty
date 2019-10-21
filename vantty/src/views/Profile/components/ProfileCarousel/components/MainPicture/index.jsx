import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
  image: {
    float: "left",
    position: "relative",
    width: "100%",
    paddingBottom: "90%",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "0.6rem",
    borderColor: "white",
    borderStyle: "solid"
  },
  card: {
    maxWidth: 345
  }
});
export default function MainPicture({ picture, tag }) {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <span
          style={{
            backgroundImage: `url(${picture})`
          }}
          className={classes.image}
        />
        {tag}
      </CardActionArea>
    </Card>
  );
}
