import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { ReactiveBase, DataSearch } from "@appbaseio/reactivesearch";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    maring: "50px"
  },
  media: {
    height: 140
  }
}));
const handleSearch = async event => {
  event.preventDefault();
  console.log("SEARCH");
  return <Redirect to="/login" />;
};

const Search = () => {
  const classes = useStyles();
  const [values, setValues] = useState("");
  return (
    <ReactiveBase
      app="vantty-database"
      credentials="fMzMk5aCe:360198cd-be1d-4776-b637-b46194703666"
    >
      <form onSubmit={handleSearch}>
        <DataSearch
          componentId="searchbox"
          dataField="*"
          placeholder="Search..."
        />
      </form>
    </ReactiveBase>
  );
};

export default Search;
