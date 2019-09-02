import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//Actions
import { addPortfolio, getCurrentProfile } from "../../../../actions/profile";

//Components
import FormBottomNav from "../../../../components/ComponentsForm/FormBottomNav";
import { ImagesUploader } from "../../../../components";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

//Icon
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternateOutlined";

// Material components
import { Avatar, Grid, Typography, Button } from "@material-ui/core";

// Custom components
import { AccountProfile } from "../../../Account/components";

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from "../../../../components";

// Component styles
import styles from "./styles";

const AddPortfolio = ({
  profile: { profile, loading },
  formData,
  handleChange,
  nextStep,
  prevStep,
  step,
  match,
  getCurrentProfile,
  className,
  classes,
  ...rest
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const continues = e => {
    e.preventDefault();
    nextStep();
  };

  const back = e => {
    e.preventDefault();
    prevStep();
  };

  const rootClassName = classNames(classes.root, className);

  return (
    <Fragment>
      {/* <PortletContent noPadding>
        <AccountProfile />
      </PortletContent> */}
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel
            subtitle='The information can be edited'
            title='Biografy'
          />
        </PortletHeader>
        <PortletContent>
          {/* <div>
            <div>
              {match.url === "/add-portfolio" && (
                <Typography component='h1' variant='h4' align='center'>
                  Portfolio
                </Typography>
              )}
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
            </div>
          </div> */}
          <ImagesUploader />
        </PortletContent>

        <PortletFooter className={classes.portletFooter}>
          <div>
            <div>
              {!loading && profile.portfolioPictures.length < 5 ? (
                <div>
                  <div>
                    {match.url === "/add-portfolio" ? (
                      <Fragment>
                        <Button component={Link} to='/dashboard'>
                          Back
                        </Button>
                        <Button
                          component={Link}
                          to='/dashboard'
                          style={{ backgroundColor: "#f5f5" }}
                          disabled={true}
                        >
                          Update1
                        </Button>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Button onClick={back}>Back</Button>
                        <Button
                          style={{ backgroundColor: "#f5f5" }}
                          disabled={true}
                        >
                          Next
                        </Button>
                      </Fragment>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    {match.url === "/add-portfolio" ? (
                      <Fragment>
                        <Button component={Link} to='/dashboard'>
                          Back
                        </Button>
                        <Button
                          component={Link}
                          to='/dashboard'
                          style={{ backgroundColor: "#f5f5" }}
                        >
                          Update
                        </Button>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Button onClick={back}>Back</Button>
                        <Button
                          style={{ backgroundColor: "#f5f5" }}
                          onClick={continues}
                        >
                          Next
                        </Button>
                      </Fragment>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </PortletFooter>
      </Portlet>
    </Fragment>
  );
};

AddPortfolio.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  addPortfolio: PropTypes.func.isRequired,
  files: PropTypes.string,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addPortfolio, getCurrentProfile }
)(withStyles(styles)(withRouter(AddPortfolio)));
