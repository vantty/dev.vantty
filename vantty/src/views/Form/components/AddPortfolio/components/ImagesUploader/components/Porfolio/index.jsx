import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import { deletePicture } from "../../../../../../../../actions/uploader";
import { Select } from "./components";

//Material-UI
import CancelIcon from "@material-ui/icons/CancelRounded";
import { makeStyles } from "@material-ui/styles";
import { GridListTile, GridList, Typography } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
    // backgroundColor: theme.palette.background.paper
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
  }
}));

const Porfolio = ({ portfolioPictures, deletePicture, modelImagesId }) => {
  const classes = useStyles();

  const pictures = () => (
    <Fragment>
      <div>
        <GridList>
          <br />

          {portfolioPictures &&
            portfolioPictures.map(picture => (
              <GridListTile key={picture._id} style={{ height: "auto" }}>
                <span
                  onClick={() =>
                    deletePicture(
                      modelImagesId,
                      picture._id,
                      picture.cloudId,
                      picture.elasticId
                    )
                  }
                >
                  <CancelIcon />
                </span>
                <span
                  style={{
                    backgroundImage: `url(${picture.original})`
                  }}
                  className={clsx(classes.image)}
                />
                {/* {picture.tag === undefined && <Select _id={picture._id} />} */}
                {/* <Select tag={picture.tag} /> */}
                <Typography color='textPrimary' variant='h6' component='h3'>
                  {picture.tag}
                </Typography>
                <br />
              </GridListTile>
            ))}
        </GridList>
      </div>
    </Fragment>
  );

  return <Fragment>{pictures()}</Fragment>;
};

Porfolio.propTypes = {
  portfolioPictures: PropTypes.array,
  deletePicture: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePicture }
)(Porfolio);
