import React, { useState, Fragment } from "react";

//Components
import AddPortfolio from "../AddPortfolio";
import AppBarForm from "../../../components/ComponentsForm/AppBar";

//Material-UI
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Style from "../style";

const EditPorfolio = () => {
  const classes = Style();
  return (
    <Fragment>
      <CssBaseline />
      <div>
        <AppBarForm step={null} />
      </div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Edit Portfolio
          </Typography>
          <br />
          <Fragment>
            <AddPortfolio />
          </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
};

export default EditPorfolio;
