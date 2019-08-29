import React from "react";

// Assets
import v1 from "../../assets/images/v1.jpg";
import v2 from "../../assets/images/v2.jpg";

// Material-UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.6rem",
    backgroundColor: "#FAFAFA",
    boxShadow: "none"
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

const cards = [1, 2, 3, 4, 5, 6];

const HomeGrid = () => {
  const classes = useStyles();
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={2}>
        {cards.map(card => (
          <Grid item key={card} xs={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={v1}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Toolbar className={classes.cardTitle}>
                  <Avatar alt="" src={v2} className={classes.avatar} />
                  <Typography gutterBottom className={classes.name}>
                    by Natalia Zuluaga
                  </Typography>
                </Toolbar>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeGrid;
