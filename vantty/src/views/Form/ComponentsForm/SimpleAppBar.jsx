import React from "react";

//Components
import ProgressBarForm from "./ProgressBarForm";

//Material
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import ArrowBack from "../../../components/ArrowBack";

const SimpleAppBar = ({ message, progress, page }) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position='fixed' color='default'>
        <Toolbar>
          <ArrowBack page={page} />
          <Container maxWidth='sm'>
            <Typography variant='h6' color='inherit' type='title'>
              {message}
            </Typography>
          </Container>
        </Toolbar>
        <ProgressBarForm value={progress} />
      </AppBar>
    </div>
  );
};

export default SimpleAppBar;
