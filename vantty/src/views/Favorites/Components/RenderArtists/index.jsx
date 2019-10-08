import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
// Material-UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import LinkMui from "@material-ui/core/Link";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  blockTitle: {
    paddingBottom: "6px",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  title: {
    fontSize: "22px",
    display: "inline-block"
  },
  seeAll: {
    fontSize: "22px",
    display: "inline-block"
  },
  pageBlock: {
    // backgroundColor: "#FAFAFA"
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.6rem",
    // backgroundColor: "#FAFAFA",
    boxShadow: "none",
    marginTop: "2rem"
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
    width: 20,
    height: 20
  },
  name: {
    display: "inline-block",
    margin: 0,
    paddingLeft: "0.5rem",
    fontSize: "12px"
  }
}));
const Artists = ({ data, values }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        className={classes.blockTitle}
      >
        {data.map(item => (
          <Fragment key={item._id}>
            <Grid container spacing={2}>
              {item.portfolioPictures.map(pic => (
                <Fragment key={pic.cloudId}>
                  {!values[0] && (
                    <Fragment>
                      <Grid item key={pic.original} xs={6} md={4}>
                        <Card className={classes.card}>
                          {/* <LinkMui
                            component={Link}
                            to={`/profile/artist/${item._id}`}
                          > */}

                          <CardMedia
                            key={pic.orignal}
                            className={classes.cardMedia}
                            image={`${pic.original}`}
                            title='Image title'
                          />
                          {/* </LinkMui> */}

                          <CardContent className={classes.cardContent}>
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
                            <Box paddingRight={2}>
                              <Typography gutterBottom variant='body2'>
                                {/* {item.name.firstName} */}
                              </Typography>
                              <Typography
                                display='block'
                                variant='caption'
                                color='textSecondary'
                              >
                                {item.profession}
                              </Typography>
                              <Typography
                                variant='caption'
                                color='textSecondary'
                              >
                                {/* {`${item.categories.makeup[0]} • ${
                                  item.createdAt
                                }`} */}
                                #Wedding #Social
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Fragment>
                  )}
                </Fragment>
              ))}
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </Fragment>
  );
};

export default function RenderArtists({ data, values }) {
  return (
    <Fragment>
      {/* <Box overflow='hidden' clone> */}
      {/* <Paper> */}
      <Box px={3}>
        {/* <Artists loading /> */}
        <Artists data={data} values={values} />
      </Box>
      {/* </Paper> */}
      {/* </Box> */}
    </Fragment>
  );
}
