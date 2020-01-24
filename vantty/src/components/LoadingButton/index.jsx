import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  buttonRoot: {
    display: "flex",
    alignItems: "center"
  },
  buttonWrapper: {
    width: "100%",
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

const LoadingButton = errors => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <div className={classes.buttonRoot}>
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classes.signInButton}
          disabled={!errors || loading}
          fullWidth
          size="large"
          onClick={handleClick}
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
};

export default LoadingButton;
