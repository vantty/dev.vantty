import React, { Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import LinkMui from "@material-ui/core/Link";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    margin: "0.3rem"
  },
  details: {
    display: "flex"
  },
  content: {
    // flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    margin: "0.5rem",
    fontSize: "1rem"
  },
  playIcon: {
    height: 38,
    width: 38
  },
  button: {
    fontSize: "0.5rem",
    color: "red"
  }
}));

export default function ServiceCard({ services, deleteService }) {
  const classes = useStyles();

  return (
    <Fragment>
      {services.map(serv => (
        <Card key={serv._id} className={classes.card}>
          <div key={serv._id} className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component='h5' variant='h5'>
                {serv.typeOfService}
              </Typography>
              <Typography color='textSecondary' variant='2'>
                {serv.description}
              </Typography>
              <Button>
                <span
                  className={classes.button}
                  onClick={e => deleteService(e, serv._id)}
                >
                  Delete Service
                </span>
              </Button>
            </CardContent>
          </div>
          <div className={classes.controls}>
            <Typography variant={1}>{serv.amount}</Typography>
          </div>

          <br />
        </Card>
      ))}
    </Fragment>
  );
}
