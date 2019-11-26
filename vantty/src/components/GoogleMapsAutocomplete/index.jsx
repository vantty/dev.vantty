import React, { Fragment } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Grid, TextField } from "@material-ui/core";

export default function App({
  onChangeTarget,
  descriptionAddress,
  address,
  onChange
}) {
  // const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleChange = address => e => {
    e.preventDefault();
    onChange({ address: address });
  };
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    // setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={onChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Fragment>
              <Grid container spacing={3}>
                <Fragment>
                  <Grid item xs={12}>
                    {/* <TextField
                      required
                      id='address'
                      label='Address'
                      name='address'
                      value={address}
                      onChange={onChangeTarget}
                      fullWidth
                    /> */}
                    <input
                      {...getInputProps({ placeholder: "Type address" })}
                    />
                  </Grid>
                </Fragment>
              </Grid>
            </Fragment>
            {/* <p>Latitude: {coordinates.lat}</p> */}
            {/* <p>Longitude: {coordinates.lng}</p> */}

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
