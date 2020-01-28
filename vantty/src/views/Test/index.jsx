import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  signInButton: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  },
  buttonProgress: {
    color: theme.palette.greenVantty.dark,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

export default function CircularIntegration() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const handleButtonClick = () => {
    setLoading(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classes.signInButton}
          disabled={loading}
          fullWidth
          size="large"
          onClick={handleButtonClick}
          type="submit"
        >
          Register now
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
