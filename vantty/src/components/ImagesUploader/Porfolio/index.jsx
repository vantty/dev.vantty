import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Actions
import { deletePicture } from "../../../actions/profile";

//Components
import { TagButton } from "../../../components";

//Material-UI
import CancelIcon from "@material-ui/icons/CancelRounded";
// import { makeStyles } from "@material-ui/styles";
import { GridListTile, ListSubheader, GridList } from "@material-ui/core";
import clsx from "clsx";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "space-around",
    overflow: "hidden",
    // backgroundColor: theme.palette.background.paper
    width: "100%",
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper
    justifyContent: "center"
  },
  image: {
    float: "left",
    position: "relative",
    width: "98%",
    paddingBottom: "100%",
    paddingRight: "1rem",
    paddingLeft: "1rem",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "10px"
  },
  gridList: {
    width: 500,
    height: 450
  },
  tile: {
    position: "relative",
    display: "block" // In case it's not rendered with a div.
    // height: "340px"
    // overflow: "hidden"
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  section1: {
    margin: theme.spacing(3, 2)
  },
  section2: {
    margin: theme.spacing(2)
  },
  section3: {
    margin: theme.spacing(3, 1, 1)
  },
  root: {
    justifyContent: "center",
    flexWrap: "wrap"
  },
  paper: {
    padding: theme.spacing(1, 2)
  }
  // imgFullHeight: {
  //   height: "100%",
  //   transform: "translateX(-50%)",
  //   position: "relative",
  //   left: "50%"
  // },
  // imgFullWidth: {
  //   width: "100%",
  //   position: "relative",
  //   transform: "translateY(-50%)",
  //   top: "50%"
  // }
}));

const Porfolio = ({ portfolioPictures, deletePicture }) => {
  const classes = useStyles();

  const pictures = () => (
    <Fragment>
      <div>
        <GridList>
          <GridListTile key='Subheader' cols={2} style={{ height: "auto" }}>
            {/* <ListSubheader component='div'>Portfolio</ListSubheader> */}
            <br />
          </GridListTile>
          {portfolioPictures.map(picture => (
            <GridListTile key={picture._id} style={{ height: "auto" }}>
              <span onClick={() => deletePicture(picture._id, picture.cloudId)}>
                <CancelIcon />
              </span>
              <span
                style={{
                  backgroundImage: `url(${picture.original})`
                }}
                className={clsx(classes.image)}
              />
              <span>
                <Typography variant='body1'>Describe this photo</Typography>
                <div>
                  <Chip
                    variant='outlined'
                    color='primary'
                    size='small'
                    label='Social'
                  />

                  <Chip
                    variant='outlined'
                    size='small'
                    label='Clickable Link Chip'
                    className={classes.chip}
                    component='a'
                    clickable
                  />
                  <span>{TagButton()}</span>
                </div>
              </span>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Fragment>
  );

  return <Fragment>{pictures()}</Fragment>;
};

Porfolio.propTypes = {
  portfolioPictures: PropTypes.array.isRequired,
  deletePicture: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePicture }
)(Porfolio);
