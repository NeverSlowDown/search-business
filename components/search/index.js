import { useState } from "react";
import { connect } from "react-redux";
import { setInfo } from "../../redux/actions/main";
import styled from "styled-components";

import { useLazyQuery } from "@apollo/client";
import { SEARCH_BUSINESSES } from "./searchBusinessesQuery.js";

const SearchInput = styled.input`
  display: flex;
  border: 2px solid black;
`;

function Search({ search, setInfo }) {
  const [activeSearch, setActiveSearch] = useState(search);
  const [searchBusinesses, { data, loading, error }] =
    useLazyQuery(SEARCH_BUSINESSES);

  const handleSearch = () => {
    setInfo(activeSearch);
    searchBusinesses();
    // searchBusinesses({ variables: { location: activeSearch } });
  };

  return (
    <div>
      <p>Search {activeSearch}:</p>
      <SearchInput
        type="text"
        value={activeSearch}
        onChange={(e) => setActiveSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Submit</button>

      {loading ? (
        <p>it's loading</p>
      ) : error ? (
        <p>error encountered, try again later</p>
      ) : (
        <p>yes!</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { search: state.main.search };
};

const mapDispatchToProps = {
  setInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
