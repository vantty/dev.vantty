import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import { deletePicture } from "../../../../../../../../actions/uploader";
import { Select } from "./components";

//Material-UI

import { makeStyles } from "@material-ui/styles";
import {
  GridListTile,
  GridList,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import clsx from "clsx";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
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
  },
  list: {
    height: "2.5rem",
    width: "98%",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px"
  },
  icon: {
    color: "red"
  }
}));

const Porfolio = ({
  portfolioPictures,
  deletePicture,
  modelImagesId,
  tags,
  onChangeTags
}) => {
  const classes = useStyles();

  const send = async (e, modelImagesId, _id, cloudId, elasticId) => {
    e.preventDefault();
    deletePicture(modelImagesId, _id, cloudId, elasticId);
    onChangeTags(e, elasticId, _id, false);
  };

  return (
    <Fragment>
      <div>
        <GridList>
          <br />
          {portfolioPictures &&
            portfolioPictures.map(picture => (
              <GridListTile
                key={picture.public_id || picture._id}
                style={{ height: "auto" }}
              >
                <span
                  style={{
                    backgroundImage: `url(${picture.original})`
                  }}
                  className={clsx(classes.image)}
                />
                {picture.tag && (
                  <GridListTileBar
                    title={picture.tag}
                    className={clsx(classes.list)}
                    actionIcon={
                      <IconButton
                        aria-label={`info about `}
                        className={classes.icon}
                        onClick={e =>
                          send(
                            e,
                            modelImagesId,
                            picture._id,
                            picture.cloudId,
                            picture.elasticId
                          )
                        }
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                    }
                  />
                )}
                {picture.tag === undefined && (
                  <Select
                    _id={picture._id}
                    elasticId={picture.elasticId}
                    tags={tags}
                    onChangeTags={onChangeTags}
                  />
                )}
                <br />
              </GridListTile>
            ))}
        </GridList>
      </div>
    </Fragment>
  );
};

Porfolio.propTypes = {
  portfolioPictures: PropTypes.array,
  deletePicture: PropTypes.func.isRequired
};

export default connect(null, { deletePicture })(Porfolio);
//
