import { useState } from "react";
import { connect } from "react-redux";
import { setInfo } from "../../redux/actions/main";
import styled from "styled-components";

const SearchInput = styled.input`
  display: flex;
  border: 2px solid black;
`;

function Search({ search, setInfo }) {
  const [activeSearch, setActiveSearch] = useState(search);

  return (
    <div>
      <p>Search {activeSearch}:</p>
      <SearchInput
        type="text"
        value={activeSearch}
        onChange={(e) => setActiveSearch(e.target.value)}
      />
      <button onClick={() => setInfo(activeSearch)}>Submit</button>
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
