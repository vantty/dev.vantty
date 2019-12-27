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
          <MenuItem value={"Haircuts"}>Haircuts</MenuItem>
          <MenuItem value={"All-Over color"}>All Over Color</MenuItem>
          <MenuItem value={"Formal styling"}>Formal Styling</MenuItem>
          <MenuItem value={"Special Occasion hair"}>
            Special Occasion Hair
          </MenuItem>
          <MenuItem value={"Blowouts"}>Blowouts</MenuItem>
          <MenuItem value={"Deep conditioning treatments"}>
            Deep conditioning treatments
          </MenuItem>
          <MenuItem value={"Bridal Makeup"}>Bridal Makeup</MenuItem>
          <MenuItem value={"Social Makeup"}>Social Makeup</MenuItem>
          <MenuItem value={"Photography Makeup"}>Photography Makeup</MenuItem>
          <MenuItem value={"Glam Makeup"}>Glam Makeup</MenuItem>
        </Select>
        {/* <Button onClick={e => onSubmit(e, tag, _id)}>Send Tags</Button> */}
      </FormControl>
    </div>
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

export default connect(mapStateToProps, { uploadTag })(SelectTags);
