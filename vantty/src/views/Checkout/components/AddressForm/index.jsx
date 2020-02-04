import React, { Fragment } from "react";
import {
  Grid,
  Typography,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  CardMedia,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GoogleMapsAutocomplete } from "../../../../components";

const useStyles = makeStyles(theme => ({
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 200
  // },
  media: {
    height: 0,
    paddingTop: "30%" // 16:9
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%"
  },
  table: {
    width: "100%"
  }
}));

export default function AddressForm({
  onChangeTarget,
  localAddress,
  onChangeAddress,
  location,
  handleChange,
  profile: { delivery, place, address }
}) {
  const classes = useStyles();

  // const handleChange = event => {
  //   setLocation(event.target.value);
  // };
  const replace = str => {
    const newString = str.replace(/ /g, "+");
    return newString;
  };
  return (
    <Fragment>
      <Fragment>
        <Typography variant='h6' gutterBottom>
          Place of the service
        </Typography>
        <div>
          <FormControl component='fieldset' className={classes.formControl}>
            <FormLabel component='legend'>Saved Cards</FormLabel>
            <RadioGroup
              name='location'
              value={location}
              onChange={handleChange}
            >
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell align='left'>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {delivery && (
                    <TableRow key={"toHome"}>
                      <TableCell align='left' key={"toHome"}>
                        {delivery && (
                          <FormControlLabel
                            key={"toHome"}
                            value={"toHome"}
                            control={<Radio />}
                          />
                        )}
                      </TableCell>
                      <TableCell align='left'>
                        <Grid item xs>
                          <GoogleMapsAutocomplete
                            localAddress={localAddress}
                            onChangeTarget={onChangeTarget}
                            onChangeAddress={onChangeAddress}

                            // onChange={onChange}
                            // descriptionAddress={descriptionAddress}
                          />
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableBody>
                  {place && (
                    <TableRow key={"artistSite"}>
                      <TableCell align='left' key={"artistSite"}>
                        <FormControlLabel
                          key={"artistSite"}
                          value={"artistSite"}
                          control={<Radio />}
                        />
                      </TableCell>
                      <TableCell align='left'>
                        <Card className={classes.card}>
                          <a
                            target='_blank'
                            rel='noopener noreferrer'
                            href={`https://www.google.com/maps/place/${replace(
                              address.street
                            )}/`}
                          >
                            <CardMedia
                              className={classes.media}
                              image={`https://maps.googleapis.com/maps/api/staticmap?center=${replace(
                                address.street
                              )}&zoom=13&scale=false&size=500x500&maptype=terrain&key=${
                                process.env.REACT_APP_GOOGLE_MAPS_ID
                              }&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C2360+dundas+street+west`}
                              title={address.street}
                            />
                          </a>
                        </Card>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </RadioGroup>
          </FormControl>
        </div>
      </Fragment>
    </Fragment>
  );
}
