import React, { useContext } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Title } from "../index";
import BoardContext from "../../BoardContext";

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function TotalUsers() {
  const classes = useStyles();
  const { profiles, users } = useContext(BoardContext);
  return (
    <React.Fragment>
      <Title>Total Users</Title>
      <Typography component='p' variant='h4'>
        {users.length}
      </Typography>
      <br />
      <Title>Total Profiles</Title>
      <Typography component='p' variant='h4'>
        {profiles.length}
      </Typography>
      <Typography
        color='textSecondary'
        className={classes.depositContext}
      ></Typography>
      {/* <div>
        <Link color='primary' href='/dashboard'>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
