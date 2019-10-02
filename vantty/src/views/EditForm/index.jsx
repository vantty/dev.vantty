import React, { useEffect, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Components
import AppBarForm from "../../components/ComponentsForm/AppBar";

//actions
import { getCurrentProfile } from "../../actions/profile";

//Material-UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box, Grid } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(13),
      marginBottom: theme.spacing(12),
      padding: theme.spacing(1)
    }
  }
}));

const EditForm = ({
  profile: { profile, loading },
  auth: { user },
  getCurrentProfile,
  Children,
  match
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      <div>
        <AppBarForm step={null} />
      </div>
      {match.url === "/personal-info" || match.url === "/dashboard" ? (
        user ? (
          <Box pt={11} pb={11}>
            <div className={classes.root}>
              <Grid container spacing={4}>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                  <Container maxWidth='md'>
                    <Fragment>{Children}</Fragment>
                  </Container>
                </Grid>
              </Grid>
            </div>
          </Box>
        ) : (
          <Progress />
        )
      ) : profile ? (
        <Box pt={11} pb={11}>
          <div className={classes.root}>
            <Grid container spacing={4}>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <Container maxWidth='md'>
                  <Fragment>{Children}</Fragment>
                </Container>
              </Grid>
            </Grid>
          </div>
        </Box>
      ) : (
        <Progress />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withRouter(EditForm));

// import React, { useEffect, Fragment } from "react";
// import { withRouter, Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// //Components
// import AppBarForm from "../../components/ComponentsForm/AppBar";

// //actions
// import { getCurrentProfile } from "../../actions/profile";

// //Material-UI
// import CssBaseline from "@material-ui/core/CssBaseline";
// import { Box, Grid } from "@material-ui/core";
// import Progress from "@material-ui/core/LinearProgress";
// import { makeStyles } from "@material-ui/core/styles";

// import { Container } from "@material-ui/core";
// import LinkMui from "@material-ui/core/Link";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import { Paper } from "@material-ui/core";
// import { pages } from "../Dashb/list";
// // import { Price, AddPortfolio, Categories } from "../Form/components";
// import Navbar from "../../components/Navbar";
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <Typography
//       component='div'
//       role='tabpanel'
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       <Box p={7}>{children}</Box>
//     </Typography>
//   );
// }
// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`
//   };
// }

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//     display: "flex",
//     height: 500,
//     position: "center",
//     marginTop: "7rem"
//   },
//   tabs: {
//     borderRight: `1px solid ${theme.palette.divider}`
//   },
//   paper: {
//     marginTop: "7rem"
//   }
// }));

// const EditForm = ({
//   profile: { profile, loading },
//   auth: { user },
//   getCurrentProfile,
//   Children,
//   match
// }) => {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   const classes = useStyles();
//   useEffect(() => {
//     getCurrentProfile();
//   }, []);
//   return (
//     <Fragment>
//       <Navbar />
//       <Container maxWidth='md'>
//         {/* <Paper className={classes.paper}> */}
//         <div className={classes.root}>
//           <Tabs
//             orientation='vertical'
//             variant='scrollable'
//             value={value}
//             onChange={handleChange}
//             aria-label='Vertical tabs example'
//             className={classes.tabs}
//           >
//             {pages.map((page, index) => (
//               <Fragment>
//                 <LinkMui
//                   component={Link}
//                   to={page.href}
//                   className={classes.link}
//                 >
//                   <Tab label={page.title} {...a11yProps(index)} />
//                 </LinkMui>
//               </Fragment>
//             ))}
//           </Tabs>
//           <TabPanel value={value} index={0}>
//             {"hello"}
//           </TabPanel>
//         </div>
//         {/* </Paper> */}
//       </Container>
//     </Fragment>
//   );
// };

// const mapStateToProps = state => ({
//   profile: state.profile,
//   auth: state.auth
// });
// export default connect(
//   mapStateToProps,
//   { getCurrentProfile }
// )(withRouter(EditForm));
