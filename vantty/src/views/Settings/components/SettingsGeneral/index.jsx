import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Actions
import { connect } from "react-redux";
import { logout } from "../../../../actions/auth";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { pagesGeneral } from "../../list";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { isMobile } from "react-device-detect";
import { SimpleAppBar } from "../../../../components";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    float: "left",
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginRight: "3rem" + "!important",
    float: "left",
    minWidth: "130px",
    maxWidth: "130px"
  },
  arrow: {
    marginLeft: "7px",
    color: theme.palette.text.primary,
    fontSize: "18px"
  }
}));

const SettingsGeneral = ({ match, history }) => {
  const classes = useStyles();

  function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }

  return (
    <Fragment>
      <SimpleAppBar history={history} path={"/settings"} />
      {isMobile && (
        <Fragment>
          <div className={classes.root}></div>
          <List component='nav' className={classes.root}>
            {pagesGeneral.map((page, ind) => (
              <div key={page.title}>
                {/* <Container maxWidth='sm'> */}
                <Container maxWidth='md'>
                  <Grid
                    container
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                  >
                    <Grid item xs={10} md={12} lg={12} xl={12}>
                      <ListItemLink
                        href={page.href}
                        to={page.href}
                        selected={page.href === match.url}
                      >
                        <ListItemText
                          primary={page.title}
                          // className={classes.title}
                        >
                          {/* <Typography variant='h5'>{page.title}</Typography> */}
                        </ListItemText>
                      </ListItemLink>
                    </Grid>
                    <Grid item xs={2}>
                      <ArrowForwardIosIcon className={classes.arrow} />
                    </Grid>
                  </Grid>
                  <Divider />
                </Container>
                {/* </Container> */}
              </div>
            ))}
          </List>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SettingsGeneral;
