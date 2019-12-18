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

export default function App({ onChangeAddress, localAddress }) {
  const [address, setAddress] = React.useState();
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
                defaultValue={localAddress.street}
                name="address"
                id="description"
                label="Addrees"
                value={localAddress.street}
                {...getInputProps({
                  // id: "mui-places-autocomplete-input",

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

//

// import React from "react";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import parse from "autosuggest-highlight/parse";
// import throttle from "lodash/throttle";

// function loadScript(src, position, id) {
//   if (!position) {
//     return;
//   }

//   const script = document.createElement("script");
//   script.setAttribute("async", "");
//   script.setAttribute("id", id);
//   script.src = src;
//   position.appendChild(script);
// }

// const autocompleteService = { current: null };

// const useStyles = makeStyles(theme => ({
//   icon: {
//     color: theme.palette.text.secondary,
//     marginRight: theme.spacing(2)
//   }
// }));

// export default function GoogleMaps() {
//   const classes = useStyles();
//   const [inputValue, setInputValue] = React.useState("");
//   const [options, setOptions] = React.useState([]);
//   const loaded = React.useRef(false);

//   if (typeof window !== "undefined" && !loaded.current) {
//     if (!document.querySelector("#google-maps")) {
//       loadScript(
//         "https://maps.googleapis.com/maps/api/js?key=AIzaSyAD1ts0etajj7s8mSbEyj1xb17mbjmtv3Y&libraries=places",
//         document.querySelector("head"),
//         "google-maps"
//       );
//     }

//     loaded.current = true;
//   }

//   const handleChange = event => {
//     setInputValue(event.target.value);
//   };

//   const fetch = React.useMemo(
//     () =>
//       throttle((input, callback) => {
//         autocompleteService.current.getPlacePredictions(input, callback);
//       }, 200),
//     []
//   );

//   React.useEffect(() => {
//     let active = true;

//     if (!autocompleteService.current && window.google) {
//       autocompleteService.current = new window.google.maps.places.AutocompleteService();
//     }
//     if (!autocompleteService.current) {
//       return undefined;
//     }

//     if (inputValue === "") {
//       setOptions([]);
//       return undefined;
//     }

//     fetch({ input: inputValue }, results => {
//       if (active) {
//         setOptions(results || []);
//       }
//     });

//     return () => {
//       active = false;
//     };
//   }, [inputValue, fetch]);

//   return (
//     <Autocomplete
//       id='google-map-demo'
//       style={{ width: 300 }}
//       getOptionLabel={option =>
//         typeof option === "string" ? option : option.description
//       }
//       filterOptions={x => x}
//       options={options}
//       autoComplete
//       includeInputInList
//       freeSolo
//       disableOpenOnFocus
//       renderInput={params => (
//         <TextField
//           {...params}
//           label='Add a location'
//           variant='outlined'
//           fullWidth
//           onChange={handleChange}
//         />
//       )}
//       renderOption={option => {
//         const matches =
//           option.structured_formatting.main_text_matched_substrings;
//         const parts = parse(
//           option.structured_formatting.main_text,
//           matches.map(match => [match.offset, match.offset + match.length])
//         );

//         return (
//           <Grid container alignItems='center'>
//             <Grid item>
//               <LocationOnIcon className={classes.icon} />
//             </Grid>
//             <Grid item xs>
//               {parts.map((part, index) => (
//                 <span
//                   key={index}
//                   style={{ fontWeight: part.highlight ? 700 : 400 }}
//                 >
//                   {part.text}
//                 </span>
//               ))}

//               <Typography variant='body2' color='textSecondary'>
//                 {option.structured_formatting.secondary_text}
//               </Typography>
//             </Grid>
//           </Grid>
//         );
//       }}
//     />
//   );
// }
