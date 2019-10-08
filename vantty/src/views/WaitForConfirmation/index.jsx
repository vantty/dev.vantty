import React from "react";

const WaitForConfirmation = () => {
  return (
    <div>
      <h1>Please confirm your email</h1>
    </div>
  );
};
export default WaitForConfirmation;

// import React from "react";
// import {
//   fade,
//   withStyles,
//   makeStyles,
//   createMuiTheme
// } from "@material-ui/core/styles";
// import { ThemeProvider } from "@material-ui/styles";
// import InputBase from "@material-ui/core/InputBase";
// import InputLabel from "@material-ui/core/InputLabel";
// import TextField from "@material-ui/core/TextField";
// import FormControl from "@material-ui/core/FormControl";
// import { green } from "@material-ui/core/colors";

// const CssTextField = withStyles({
//   root: {
//     "& label.Mui-focused": {
//       color: "green"
//     },
//     "& .MuiInput-underline:after": {
//       borderBottomColor: "green"
//     },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "red"
//       },
//       "&:hover fieldset": {
//         borderColor: "yellow"
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "green"
//       }
//     }
//   }
// })(TextField);

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   margin: {
//     margin: theme.spacing(1)
//   }
// }));

// export default function CustomizedInputs() {
//   const classes = useStyles();

//   return (
//     <form className={classes.root} noValidate>
//       <CssTextField
//         className={classes.margin}
//         label="Custom CSS"
//         variant="outlined"
//         id="custom-css-outlined-input"
//       />
//     </form>
//   );
// }
