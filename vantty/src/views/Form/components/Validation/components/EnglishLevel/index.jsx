import React, { Fragment } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto" + theme.palette.greenVantty.main,
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    },
    typography: {
      margin: "1rem"
    }
  },
  checkedIcon: {
    backgroundColor: theme.palette.greenVantty.main,
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.greenVantty.light
    }
  }
}));

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color='default'
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function EnglishLevel({ formData, handleChange }) {
  return (
    <Fragment>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='flex-start'
      >
        <Grid item md={6} sm={12} xs={12}>
          <Typography variant='h4'>What is your level of English?</Typography>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <FormControl component='fieldset'>
            {/* <FormLabel component='legend'>EnglishLevel</FormLabel> */}
            <RadioGroup
              defaultValue={"" || formData.englishLevel}
              aria-label='englishLevel'
              onChange={handleChange}
              name={formData.englishLevel}
            >
              <FormControlLabel
                value='native'
                control={<StyledRadio />}
                label='Native/Fluent'
                name='englishLevel'
                onChange={handleChange}
              />
              <FormControlLabel
                value='intermediate'
                control={<StyledRadio />}
                label='Intermediate'
                name='englishLevel'
                onChange={handleChange}
              />
              <FormControlLabel
                value='beginner'
                control={<StyledRadio />}
                label='Beginner'
                name='englishLevel'
                onChange={handleChange}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Fragment>
  );
}
