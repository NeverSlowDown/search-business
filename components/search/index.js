import { useState } from "react";
import { connect } from "react-redux";
import { setInfo } from "../../redux/actions/main";
import styled from "styled-components";

import { useLazyQuery } from "@apollo/client";
import { SEARCH_BUSINESSES } from "./searchBusinessesQuery.js";

const Input = styled.input`
  display: flex;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  margin: 10px 0;
  padding-right: 36px;
`;

const SearchContainer = styled.section`
  display: flex;
  min-height: 50vh;
  /* border-radius: 0 0 80px 80px; */
  overflow: hidden;
  position: relative;
`;

const BackgroundImage = styled.figure`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100%;
    opacity: 0.9;
    filter: grayscale(1);
  }
`;

const BackgroundColor = styled.div`
  z-index: 2;
  position: absolute;
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.secondary};
  opacity: 0.8;
`;

const Content = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  padding: 20px 20px;
  color: white;
  flex-direction: column;
  z-index: 3;
`;

const Label = styled.label`
  font-size: 1em;
  font-weight: 700;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonIconSave = styled.button`
  position: absolute;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  border: none;
  color: transparent;
  background: ${(props) => props.theme.main};
  display: flex;
  align-items: center;
  justify-content: center;
  right: 5px;
`;

function Search({ search, setInfo }) {
  const [activeSearch, setActiveSearch] = useState(search);
  const [searchBusinesses, { data, loading, error }] =
    useLazyQuery(SEARCH_BUSINESSES);

  const handleSearch = () => {
    setInfo(activeSearch);
    // searchBusinesses();
    searchBusinesses({ variables: { location: activeSearch } });
  };

  return (
    <SearchContainer>
      <BackgroundImage>
        <img
          src="https://image.freepik.com/free-photo/traveling-map-with-golden-pin_144627-23987.jpg"
          alt="background-image-location"
        />
      </BackgroundImage>
      <BackgroundColor />
      <Content>
        <Label for="location">Location:</Label>
        <InputContainer>
          <Input
            type="text"
            id="location"
            value={activeSearch}
            onChange={(e) => setActiveSearch(e.target.value)}
          />
          <ButtonIconSave onClick={handleSearch}>Search</ButtonIconSave>
        </InputContainer>

        {loading ? (
          <p>it's loading</p>
        ) : error ? (
          <p>error encountered, try again later</p>
        ) : (
          <p>yes!</p>
        )}
      </Content>
    </SearchContainer>
  );
}

const mapStateToProps = (state) => {
  return { search: state.main.search };
};

const mapDispatchToProps = {
  setInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
