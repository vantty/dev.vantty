import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
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
    minWidth: 120
  }
}));

const SelectTags = ({ _id, uploadTag }) => {
  const classes = useStyles();
  const [tag, setTag] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setTag(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = (e, tag, _id) => {
    e.preventDefault();
    uploadTag({ _id: _id, tag: tag });
  };
  return (
    <form autoComplete="off" submit>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">Tag</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={tag}
          onChange={handleChange}
        >
          {/* <MenuItem value={tag}>
            <em>{tag}</em>
          </MenuItem> */}

          {/* <MenuItem value={tag}>{tag}</MenuItem> */}
          <MenuItem value={"Social"}>Social</MenuItem>
          <MenuItem value={"Bridal"}>Bridal</MenuItem>
          <MenuItem value={"Photography"}>Photography</MenuItem>
        </Select>
        <Button onClick={e => onSubmit(e, tag, _id)}>Send Tags</Button>
      </FormControl>
    </form>
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
