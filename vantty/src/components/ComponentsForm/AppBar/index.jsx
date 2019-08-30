import React from "react";
import { isMobile } from "react-device-detect";
//Components
import ProgressBarForm from "../ProgressBar";

//Material
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "../../ArrowBack";

const SimpleAppBar = ({ step, page }) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position='fixed' style={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          {isMobile && step === 1 && <ArrowBack page={page} />}
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            style={{ color: "#000000" }}
            type='title'
          >
            Vantty
          </Typography>
        </Toolbar>
        {step && <ProgressBarForm value={step} />}
      </AppBar>
    </div>
  );
};

export default SimpleAppBar;
