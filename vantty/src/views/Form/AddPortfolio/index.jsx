import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Conection
import { addPortfolio } from "../../../actions/profile";

//Components
import SimpleAppBar from "../ComponentsForm/SimpleAppBar";
import FormBottomNav from "../ComponentsForm/FormBottomNav";
import ImagesUploader from "../../../components/ImagesUploader";
import Alert from "../../../components/Alert";

//Materila-UI
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  Box,
  Avatar,
  withStyles,
  Grid,
  Button
} from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternateOutlined";

//Style
import Style from "./style";

const AddPortfolio = ({
  profile: { profile, loading },
  classes,
  formData,
  handleChange,
  nextStep,
  prevStep,
  step
}) => {
  const continues = e => {
    e.preventDefault();
    nextStep();
  };

  const back = e => {
    e.preventDefault();
    prevStep();
  };
  return (
    <Fragment>
      <CssBaseline />

      <Container maxWidth='sm'>
        <div>
          <Grid container justify='center' alignItems='center'>
            {!loading && profile.profilePicture ? (
              <Avatar className={classes.bigAvatar}>
                <AddPhotoIcon style={{ fontSize: "48px" }} />
              </Avatar>
            ) : (
              <Avatar className={classes.bigAvatar}>
                <AddPhotoIcon />
              </Avatar>
            )}
          </Grid>
          <Typography component='h5' variant='h6' align='center'>
            Profile Image
          </Typography>
        </div>

        <ImagesUploader />
        {!loading && profile.portfolioPictures.length < 5 ? (
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Button onClick={back}>Back</Button>

                  <Button
                    style={{ backgroundColor: "#f5f5" }}
                    disabled={true}
                    // primary={true}
                  >
                    Next
                  </Button>
                </div>
              </div>
            }
          />
        ) : (
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Button onClick={back}>Back</Button>

                  <Button
                    style={{ backgroundColor: "#f5f5" }}
                    onClick={continues}
                  >
                    Next
                  </Button>
                </div>
              </div>
            }
          />
        )}
      </Container>
    </Fragment>
  );
};

AddPortfolio.propTypes = {
  addPortfolio: PropTypes.func.isRequired,
  files: PropTypes.string,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default withStyles(Style)(
  connect(
    mapStateToProps,
    { addPortfolio }
  )(withRouter(AddPortfolio))
);
