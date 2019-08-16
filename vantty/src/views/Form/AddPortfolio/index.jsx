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
import { Container, Box, Avatar, withStyles, Grid } from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternateOutlined";

//Style
import Style from "./style";

const AddPortfolio = ({ profile: { profile, loading }, classes }) => {
  return (
    <Fragment>
      <CssBaseline />
      <SimpleAppBar
        message={"2: Your porfolio is all"}
        progress={2}
        page={"/edit-profile"}
      />

      <Box pt={11} pb={8}>
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
              disabled={true}
              step={2}
              backPage={"/edit-profile"}
              nextPage={""}
              botton={3}
            />
          ) : (
            <FormBottomNav
              step={2}
              backPage={"/edit-profile"}
              nextPage={"/info-contact"}
            />
          )}
        </Container>
      </Box>
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
