import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

//Actions
import { uploadTag } from "../../../../../../../../../../actions/uploader";
import { getCurrentProfile } from "../../../../../../../../../../actions/profile";

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
  selectedGreen: {
    margin: theme.spacing(0.5),
    backgroundColor: "green",
    "&:focus": {
      backgroundColor: "green"
    },
    "&:hover": {
      backgroundColor: "green"
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
const ChipsArray = ({
  uploadTag,
  pictureId,
  profile: { profile, loading },
  getCurrentProfile,
  tag
}) => {
  const [select, setSelect] = useState({
    Bridal: false,
    Social: false,
    Photography: false
  });

  const classes = useStyles();

  const handleClick = chipClicked => e => {
    setSelect({
      Bridal: false,
      Social: false,
      Photography: false,
      [chipClicked]: true
    });
  };

  tagObj[pictureId] = select;

  uploadTag(tagObj);

  const [state, setState] = React.useState({
    Bridal: false,
    Social: false,
    Photography: false
  });

  const handleTrue = name => event => {
    setState({ ...state, [name]: true });
  };
  const handleFalse = name => event => {
    setState({ ...state, [name]: false });
  };

  return (
    <Fragment>
      <div className={classes.root}>
        {profile.portfolioPictures.map(pic =>
          Object.keys(select).map(data =>
            pic.tag === data ? (
              <Chip
                key={data}
                label={data}
                name={data}
                clickable={false}
                // onClick={handleClick(data)}
                onClick={handleFalse(data)}
                className={
                  classes.selected
                  // (select[data] == true && classes.selected) || classes.noSelected
                }
              />
            ) : (
              <Chip
                key={data}
                label={data}
                name={data}
                clickable={false}
                // onClick={handleClick(data)}
                onClick={handleTrue(data)}
                className={classes.noSelected}
              />
            )
          )
        )}

        {console.log(state)}
        {/* {console.log("SELECT", select)} */}
        {/* {profile.portfolioPictures.map(data => {
          data.map(chips ={

            return (
              <Chip
                key={data}
                label={data}
                name={data.tag}
                clickable={false}
                onClick={handleClick(data)}
                className={
                  (select[data] == true && classes.selected) || classes.noSelected
                }
                className={
                  (profile.portfolioPictures[0].tag == data &&
                    classes.selected) ||
                  classes.noSelected
                }
              />
            );
          })
        })} */}
      </div>
      {/* <Button onClick={onSubmit}>Send Tags</Button> */}
    </Fragment>
  );
};

ChipsArray.propTypes = {
  uploadTag: PropTypes.func,
  pictureId: PropTypes.string,
  numberOfPictures: PropTypes.number,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { uploadTag, getCurrentProfile }
)(ChipsArray);
