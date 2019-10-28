import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { uploadTag } from "../../../../../../../../../../actions/uploader";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "white",
    zIndex: 1000
  },
  select: {
    color: "white",
    backgroundColor: "white"
  }
}));

const SelectTags = ({ _id, uploadTag, elasticId, tags, onChangeTags }) => {
  const classes = useStyles();
  const [tag, setTag] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setTag(event.target.value);
    onChangeTags(event, elasticId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    // <form autoComplete='off'>
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='demo-controlled-open-select'>Tag</InputLabel>
        <Select
          className={classes.Select}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={tag}
          onChange={handleChange}
          name={_id}
          elastic={elasticId}
        >
          {/* <MenuItem value={tag}>
            <em>{tag}</em>
          </MenuItem> */}

          {/* <MenuItem value={tag}>{tag}</MenuItem> */}
          <MenuItem value={"social"}>Social</MenuItem>
          <MenuItem value={"bridal"}>Bridal</MenuItem>
          <MenuItem value={"photography"}>Photography</MenuItem>
        </Select>
        {/* <Button onClick={e => onSubmit(e, tag, _id)}>Send Tags</Button> */}
      </FormControl>
    </div>

    // </form>
  );
};

SelectTags.propTypes = {
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
  { uploadTag }
)(SelectTags);
