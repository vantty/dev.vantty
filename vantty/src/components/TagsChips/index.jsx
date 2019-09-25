import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { uploadTag } from "../../actions/uploader";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  selected: {
    margin: theme.spacing(0.5),
    backgroundColor: "red",
    "&:focus": {
      backgroundColor: "red"
    },
    "&:hover": {
      backgroundColor: "red"
    }
  },
  noSelected: {
    margin: theme.spacing(0.5),
    "&:hover": {
      backgroundColor: "red"
    }
  }
}));

let tagObj = {};
const ChipsArray = ({ uploadTag, pictureId, numberOfPictures }) => {
  const classes = useStyles();
  const [select, setSelect] = useState({
    Bridal: true,
    Social: false,
    Photography: false
  });

  const handleClick = chipClicked => e => {
    setSelect({
      Bridal: false,
      Social: false,
      Photography: false,
      [chipClicked]: true
    });
  };

  tagObj[pictureId] = select;

  // function onSubmit() {
  // }
  uploadTag(tagObj);

  return (
    <Fragment>
      <div className={classes.root}>
        {Object.keys(select).map(data => {
          return (
            <Chip
              key={data}
              label={data}
              name={data}
              clickable={false}
              onClick={handleClick(data)}
              className={
                (select[data] === true && classes.selected) ||
                classes.noSelected
              }
            />
          );
        })}
      </div>
      {/* <Button onClick={onSubmit}>Send Tags</Button> */}
    </Fragment>
  );

  // return (
  //   <Paper className={classes.root}>
  //     {categories.map(category => (
  //       <Chip
  //         key={category.key}
  //         label={category.label}
  //         onClick={handleClick(category.label)}
  //         className={
  //           (select === category.label && classes.selected) ||
  //           classes.noSelected
  //         }
  //       />
  //     ))}
  //   </Paper>
  // );
};

ChipsArray.propTypes = {
  uploadTag: PropTypes.func,
  pictureId: PropTypes.string,
  numberOfPictures: PropTypes.number
};

// const mapStateToProps = state => ({
//   uploading: state.uploader.uploading,
//   images: state.uploader.images,
//   profile: state.profile
// });

export default connect(
  null,
  { uploadTag }
)(ChipsArray);
