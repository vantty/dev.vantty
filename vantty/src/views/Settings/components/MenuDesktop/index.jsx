import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, ListItemText, Badge } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
// Actions
import { logout } from '../../../../actions/auth';
import { deleteAccount } from '../../../../actions/profile';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'sticky',
    float: 'left',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    fontSize: '20px'
  },
  tabs: {
    borderRight: `4px solid ${theme.palette.divider}`,
    marginRight: `3rem !important`,
    float: 'left',
    minWidth: '130px',
    maxWidth: '130px',
    color: theme.palette.common.black
  },
  title: {
    color: theme.palette.text.primary,
    backgroundColor: '#F3F3F3',
    paddingTop: `0.09rem !important`,
    paddingBottom: `0.09rem !important`
  },
  listItem: {
    paddingTop: `0.2rem !important`,
    paddingBottom: `0.2rem !important`
  },
  arrow: {
    marginLeft: '7px',
    color: theme.palette.text.primary,
    fontSize: '16px'
  }
}));

const MenuDesktop = ({ match, logout, pages, stripe }) => {
  const classes = useStyles();

  function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }

  return (
    <Fragment>
      <List component="nav">
        {!isMobile ? (
          <Fragment>
            {pages.map(page => (
              <div key={page.title}>
                <Container maxWidth="md">
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <ListItemLink
                        href={page.href}
                        to={page.href}
                        selected={page.href === match.url}
                        className={classes.listItem}
                      >
                        {page.href === '/bank' && !stripe ? (
                          <Badge color="primary" badgeContent={'!'}>
                            <ListItemText primary={page.title}></ListItemText>
                          </Badge>
                        ) : (
                          <ListItemText primary={page.title}></ListItemText>
                        )}
                      </ListItemLink>
                    </Grid>
                  </Grid>
                  <Divider />
                </Container>
              </div>
            ))}
            <Container maxWidth="md">
              <ListItem button onClick={logout} className={classes.listItem}>
                <ListItemText primary={'Logout'} />
              </ListItem>
            </Container>
          </Fragment>
        ) : null}
      </List>
    </Fragment>
  );
};

MenuDesktop.propTypes = {
  logout: PropTypes.func,
  deleteAccount: PropTypes.func
};

export default connect(
  null,
  { logout, deleteAccount }
)(MenuDesktop);
