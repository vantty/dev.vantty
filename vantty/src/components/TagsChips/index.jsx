import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { uploadTag } from "../../actions/uploader";

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

const ChipsArray = () => {
  // useEffect(() => {
  //   // uploadTag(select, pictureId);
  // }, []);
  const classes = useStyles();

  const [select, setSelect] = useState({
    Bridal: false,
    Social: false,
    Photography: false
  });

  const handleDelete = chipClicked => e => {
    setSelect({ ...select, [chipClicked]: false });
  };

  // const setAllFalse = () => {
  //   setSelect({ Bridal: false, Social: false, Photography: false });
  // };

  const handleClick = chipClicked => e => {
    // setAllFalse();
    setSelect({ ...select, [chipClicked]: true });
    // uploadTag(chipClicked, pictureId);
  };

  console.log(select);

  return (
    <div className={classes.root}>
      {Object.keys(select).map(data => {
        return (
          <Chip
            key={data}
            label={data}
            name={data}
            clickable={false}
            onClick={handleClick(data)}
            // onChange={handleChange()}
            onDelete={select[data] === true && handleDelete(data)}
            className={
              (select[data] === true && classes.selected) || classes.noSelected
            }
          />
        );
      })}
    </div>
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

export default ChipsArray;

// ChipsArray.propTypes = {
//   uploadTag: PropTypes.func,
//   pictureId: PropTypes.string
// };

// // const mapStateToProps = state => ({
// //   uploading: state.uploader.uploading,
// //   images: state.uploader.images,
// //   profile: state.profile
// // });

// export default connect(
//   null,
//   { uploadTag }
// )(ChipsArray);
