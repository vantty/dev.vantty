import React, { useState } from "react";
import { connect } from "react-redux";

// Material-UI
import {
  CssBaseline,
  Typography,
  Container,
  TextField,
  MenuItem,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ConfirmationModal } from "../../../../../../../../../../components";

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2)
  },
  text: {
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginBottom: theme.spacing(1)
  },
  button: {
    // marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  }
}));

const PosponeForm = ({ changeStateBooking, bookingId, handleCloseForm }) => {
  const classes = useStyles();

  const [text, setText] = useState("");

  const handleChange = event => {
    event.persist();
    setText(event.target.value);
  };

  const handleCancel = () => {
    handleCloseForm(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="subtitle1" className={classes.text}>
          Pleaset tell the user your date and time availability. Once you send
          it, the service will appear as <i>Declined</i>, but the user could
          make another book.
        </Typography>
        <TextField
          onChange={handleChange}
          className={classes.textField}
          fullWidth
          label="text"
          name="text"
          type="text"
          variant="outlined"
        />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={1}
        >
          <ConfirmationModal
            buttonText={"Send"}
            modalText={
              "Are you sure you want to propose the user another date for this service?"
            }
            changeStateBooking={changeStateBooking}
            bookingId={bookingId}
            state={"declined-posponed"}
            text={text}
            handleCloseForm={handleCloseForm}
          />
          <MenuItem onClick={handleCancel}>{"Cancel"}</MenuItem>
        </Grid>
      </div>
    </Container>
  );
};

export default connect(null, {})(PosponeForm);
