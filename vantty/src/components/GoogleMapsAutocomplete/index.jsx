import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
const log = console.log;
const useStyles = makeStyles(theme => ({
  div: {
    marginLeft: "0.8rem",
    minWidth: "5rem"
  }
}));

export default function App({ onChangeAddress, addressLocal }) {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });
  const classes = useStyles();

  const handleSelect = async address => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    await setAddress(address);
    await setCoordinates(latLng);
    await onChangeAddress({
      street: address,
      lat: latLng.lat,
      log: latLng.lng
    });
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={classes.div}>
            {/* <p>Latitude: {coordinates.lat}</p> */}
            {/* <p>Longitude: {coordinates.lng}</p> */}
            <span>
              <TextField
                fullWidth
                required
                defaultValue={addressLocal}
                name='address'
                id='description'
                label='Addrees'
                value={address}
                {...getInputProps({
                  // id: "mui-places-autocomplete-input",
                  // placeholder: "Type address"
                  className: "textfield"
                })}
              />
              <span {...getInputProps({})} />
              {loading ? <div>...loading</div> : null}
            </span>
            <div>
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  width: "10rem"
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
