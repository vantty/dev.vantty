import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
//Components
import ProgressBarForm from "../ProgressBar";

//Material
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

const SimpleAppBar = ({ step, page }) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position='fixed' style={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          <MuiLink
            underline='none'
            color='inherit'
            component={Link}
            to={"/home"}
          >
            <Typography
              variant='h6'
              color='inherit'
              noWrap
              style={{ color: "#000000" }}
              type='title'
            >
              Vantty
            </Typography>
          </MuiLink>
        </Toolbar>
        {step && <ProgressBarForm value={step} />}
      </AppBar>
    </div>
  );
};

export default SimpleAppBar;
