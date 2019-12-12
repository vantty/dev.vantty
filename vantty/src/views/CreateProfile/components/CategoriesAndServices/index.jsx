// import React, { Fragment, useState, useEffect } from "react";
// import { Link, withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import clsx from "clsx";

// //Actions
// import { addCategories } from "../../../../actions/profile";
// import { getCurrentProfile } from "../../../../actions/profile";

// //Material-UI
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardActions,
//   Divider,
//   Grid,
//   Typography
// } from "@material-ui/core";
// //Components
// import { FormBottomNav, CustomPaper } from "../ComponentsForm";

// import FormLabel from "@material-ui/core/FormLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import { isMobile } from "react-device-detect";

// const useStyles = makeStyles(theme => ({
//   root: {},
//   formControl: {
//     // margin: theme.spacing(3)
//   },
//   button: {
//     float: "right",
//     color: "white",
//     boxShadow: "none",
//     backgroundColor: theme.palette.greenVantty.main,
//     "&:hover": {
//       color: "white",
//       backgroundColor: theme.palette.greenVantty.light
//     }
//   },
//   checked: {
//     color: theme.palette.greenVantty.main,
//     "&$checked": {
//       color: theme.palette.greenVantty.main
//     }
//   }
// }));

// const AddCategories = ({
//   addCategories,
//   history,
//   profile: { profile, loading },
//   createProfile,
//   nextStep,
//   prevStep,
//   step,
//   match,
//   getCurrentProfile,
//   className
// }) => {
//   const classes = useStyles();

//   useEffect(() => {
//     getCurrentProfile();
//   }, []);

//   // const continues = e => {
//   //   e.preventDefault();
//   //   nextStep();
//   // };

//   const back = e => {
//     e.preventDefault();
//     prevStep();
//   };

//   const onSubmit = async e => {
//     e.preventDefault();
//     addCategories(state, history, stateHair, false);
//     match.url === "/create-profile" && nextStep();
//   };

//   const [state, setState] = useState({
//     Wedding: true,
//     Social: false,
//     Prom: false,
//     Fashion: false,
//     Special_Effects: false,
//     Photography: false
//   });

//   const {
//     Wedding,
//     Social,
//     Prom,
//     Fashion,
//     Special_Effects,
//     Photography
//   } = state;

//   const handleChange = name => event => {
//     setState({ ...state, [name]: event.target.checked });
//   };

//   const error =
//     [Wedding, Social, Prom, Fashion, Special_Effects, Photography].filter(
//       v => v
//     ).length < 1;

//   //Hair
//   const [stateHair, setStateHair] = useState({
//     Brides: true,
//     Peinados: false,
//     Cut: false
//   });

//   const { Brides, Peinados, Cut } = stateHair;
//   const errorHair = [Brides, Peinados, Cut].filter(v => v).length < 1;

//   const handleChangeHair = name => event => {
//     setStateHair({ ...stateHair, [name]: event.target.checked });
//   };

//   return (
//     <Fragment>
//       <CustomPaper
//         Children={
//           <Fragment>
//             <form autoComplete='off' noValidate>
//               {/* <Divider /> */}

//               <Fragment>
//                 <Grid
//                   container
//                   direction='row'
//                   justify='space-between'
//                   alignItems='flex-start'
//                 >
//                   <Grid item xs={6} xl={6} md={6} sm={6}>
//                     {/* <form className='form'> */}

//                     <FormControl
//                       error={error}
//                       component='fieldset'
//                       className={classes.formControl}
//                     >
//                       <Typography color='textSecondary' variant='body1'>
//                         Makeup
//                       </Typography>

//                       {error && (
//                         <FormLabel component='legend'>
//                           Select minimum one
//                         </FormLabel>
//                       )}

//                       <FormGroup>
//                         {Object.keys(state).map((data, index) => {
//                           return (
//                             <div key={data}>
//                               <Fragment>
//                                 <FormControlLabel
//                                   key={data}
//                                   control={
//                                     <Checkbox
//                                       className={classes.checked}
//                                       checked={state[data] === true && true}
//                                       // state[data](
//                                       //   profile &&
//                                       //     profile.categories.makeup[index]
//                                       // );
//                                       onChange={handleChange(data)}
//                                       value={toString(data)}
//                                     />
//                                   }
//                                   label={data}
//                                 />
//                               </Fragment>
//                             </div>
//                           );
//                         })}
//                       </FormGroup>
//                       {/* <FormHelperText>Be careful</FormHelperText> */}
//                     </FormControl>
//                     {/* </form> */}
//                   </Grid>
//                   <Grid item xs={6} xl={6} md={6} sm={6}>
//                     <FormControl
//                       error={errorHair}
//                       component='fieldset'
//                       className={classes.formControl}
//                     >
//                       <Typography color='textSecondary' variant='body1'>
//                         Hair
//                       </Typography>
//                       {errorHair && (
//                         <FormLabel component='legend'>
//                           Select minimum one
//                         </FormLabel>
//                       )}
//                       <FormGroup>
//                         {Object.keys(stateHair).map((data, index) => {
//                           return (
//                             <div key={data}>
//                               <Fragment>
//                                 <FormControlLabel
//                                   control={
//                                     <Checkbox
//                                       key={data}
//                                       className={classes.checked}
//                                       // checked={"" || stateHair[data] === true && true}
//                                       checked={"" || stateHair[data] === true}
//                                       onChange={handleChangeHair(data)}
//                                       value={toString(data)}
//                                     />
//                                   }
//                                   label={data}
//                                 />
//                               </Fragment>
//                             </div>
//                           );
//                         })}
//                       </FormGroup>
//                       {/* <FormHelperText>Be careful</FormHelperText> */}
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//               </Fragment>
//             </form>
//           </Fragment>
//         }
//       />
//     </Fragment>
//   );
// };

// AddCategories.propTypes = {
//   addCategories: PropTypes.func.isRequired,
//   className: PropTypes.string,
//   // createProfile: PropTypes.func.isRequired,
//   getCurrentProfile: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   profile: state.profile
// });
// export default connect(mapStateToProps, { addCategories, getCurrentProfile })(
//   withRouter(AddCategories)
// );

// import React, { Fragment } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import Input from "@material-ui/core/Input";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import { CustomPaper } from "../ComponentsForm";
// import { Typography } from "@material-ui/core";
// const useStyles = makeStyles(theme => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120
//   }
// }));

// export default function GroupedSelect() {
//   const classes = useStyles();

//   return (
//     <div>
//       <CustomPaper
//         Children={
//           <Fragment>
//             <Typography>Category</Typography>
//             <FormControl className={classes.formControl}>
//               <InputLabel htmlFor='grouped-native-select'>Hair</InputLabel>
//               <Select
//                 native
//                 defaultValue=''
//                 input={<Input id='grouped-native-select' />}
//               >
//                 <option value='' />
//                 <optgroup label='Category 1'>
//                   <option value={1}>Option 1</option>
//                   <option value={2}>Option 2</option>
//                 </optgroup>
//                 <optgroup label='Category 2'>
//                   <option value={3}>Option 3</option>
//                   <option value={4}>Option 4</option>
//                 </optgroup>
//               </Select>
//             </FormControl>
//             <FormControl className={classes.formControl}>
//               <InputLabel htmlFor='grouped-select'>Makeup</InputLabel>
//               <Select defaultValue='' input={<Input id='grouped-select' />}>
//                 <MenuItem value=''>
//                   <em>None</em>
//                 </MenuItem>
//                 <ListSubheader>Category 1</ListSubheader>
//                 <MenuItem value={1}>Option 1</MenuItem>
//                 <MenuItem value={2}>Option 2</MenuItem>
//                 <ListSubheader>Category 2</ListSubheader>
//                 <MenuItem value={3}>Option 3</MenuItem>
//                 <MenuItem value={4}>Option 4</MenuItem>
//               </Select>
//             </FormControl>
//           </Fragment>
//         }
//       />
//     </div>
//   );
// }

import React, { Fragment } from "react";

import { CustomPaper } from "../ComponentsForm";
import { Categories, Services, ListOfService } from "./components";

export default function MultipleSelect({
  stateHair,
  stateMakeup,
  handleChangeMakeup,
  handleChangeHair,
  formData,
  onChangeService,
  handleServices,
  services,
  handleAddServices
}) {
  return (
    <div>
      <CustomPaper
        Children={
          <Fragment>
            <Categories
              stateHair={stateHair}
              stateMakeup={stateMakeup}
              handleChangeMakeup={handleChangeMakeup}
              handleChangeHair={handleChangeHair}
            />

            <Services
              services={services}
              handleServices={handleServices}
              handleAddServices={handleAddServices}
            />
            <ListOfService />
          </Fragment>
        }
      />
    </div>
  );
}
