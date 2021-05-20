import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSearchLocation, setBusinesses } from "../../redux/actions/main";
import styled from "styled-components";
import { isNil } from "ramda";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_LOCATION_BUSINESSES } from "./searchBusinessesQuery.js";

const Input = styled.input`
  display: flex;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 10px;
  padding-right: 36px;
`;

const SearchContainer = styled.section`
  display: flex;
  min-height: 250px;
  position: relative;
  top: 0;
  transition: 0.3s ease;
  @media screen and (min-width: 971px) {
    min-height: 450px;
  }
`;

const BackgroundImage = styled.figure`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 0 0 50px 50px;

  overflow: hidden;
  img {
    width: 100%;
    opacity: 1;
    filter: grayscale(1);
  }
`;

const BackgroundColor = styled.div`
  z-index: 2;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    360deg,
    ${(props) => props.theme.main} 0%,
    ${(props) => props.theme.main} 70%,
    rgba(255, 255, 255, 0.3) 100%
  );
  background-attachment: fixed;
  overflow: hidden;
  border-radius: 0 0 50px 50px;
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  padding: 20px 20px;
  flex-direction: column;
  z-index: 3;
  align-items: center;
  max-width: 320px;
  top: 120px;
  left: calc(50% - 320px / 2);
  background: white;
  border-radius: 20px;
  box-shadow: 0 0 10px 3px #0000002e;
  transition: 0.3s ease;
  @media screen and (min-width: 971px) {
    max-width: 550px;
    top: 120px;
    left: calc(50% - 550px / 2);
  }
`;

const Label = styled.label`
  font-size: 0.75em;
  font-weight: 700;
  align-self: flex-start;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  transition: 0.5s ease;
  flex-direction: column;
  justify-content: center;
  &:first-of-type {
    margin-bottom: 10px;
  }
`;

const ButtonSearch = styled.button`
  border-radius: 20px;
  width: 100%;
  max-width: 150px;
  height: 40px;
  border: none;
  color: ${(props) => (props.loading ? "transparent" : "white")};
  background: ${(props) => props.theme.main};
  display: flex;
  align-items: center;
  justify-content: center;
  right: 5px;
  overflow: hidden;
  position: relative;
  margin-top: 20px;
  animation: ${(props) => (props.error ? "error 1.5s ease" : "none")};
  max-width: ${(props) => (props.loading ? 50 : 150)}px;
  transition: 0.5s ease max-width;
  cursor: pointer;
  @keyframes error {
    0% {
      background: ${(props) => props.theme.main};
    }
    50% {
      background: red;
    }
    100% {
      background: ${(props) => props.theme.main};
    }
  }
  svg {
    path {
      fill: white;
    }
    width: 20px;
    height: 20px;
    display: flex;
  }
`;

const IconSearchContainer = styled.div`
  transform: translateY(${(props) => (props.loading ? -30 : 0)}px);
  transition: 0.5s ease;
  margin-right: -15px;
  margin-left: 5px;
  svg {
    transform: rotate(-65deg);
    margin-left: 1px;
  }

  animation: ${(props) => (props.error ? "errorSearch 3s ease forwards" : "")};
  @keyframes errorSearch {
    0% {
      transform: translateY(-30px);
    }

    25% {
      transform: translateY(-30px);
    }

    50% {
      transform: translateY(-30px);
    }

    75% {
      transform: translateY(0px);
    }

    100% {
      transform: translateY(0px);
    }
  }
`;

const IconLoadingContainer = styled.div`
  transform: translateY(${(props) => (props.loading ? 0 : -30)}px);
  position: absolute;
  transition: 0.5s ease;
  svg {
    animation: loading 0.5s ease infinite;
  }

  @keyframes loading {
    0% {
      transform: rotate(90deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const IconErrorContainer = styled.div`
  transform: translateY(${(props) => (props.error ? 0 : 30)}px);
  position: absolute;
  right: 50px;
  span {
    color: white;
    font-size: 1.25em;
    font-weight: 400;
  }
  animation: ${(props) => (props.error ? "errorIn 2s ease forwards" : "")};
  @keyframes errorIn {
    0% {
      transform: translateY(30px);
    }

    50% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-30px);
    }
  }
`;

const ErrorMessage = styled.p`
  font-size: 0.75em;
  margin-top: 10px;
`;

function Search({ location, setSearchLocation, setBusinesses, businessList }) {
  const [activeLocation, setActiveLocation] = useState(location || "");
  const [activeTerm, setActiveTerm] = useState("");
  const [searchBusinesses, { data, loading, error }] = useLazyQuery(
    SEARCH_LOCATION_BUSINESSES
  );

  const handleSearch = () => {
    setSearchLocation(activeLocation);
    searchBusinesses({
      variables: { location: activeLocation, term: activeTerm },
    });
  };

  useEffect(() => {
    if (!isNil(data) && data.search.total > 0) {
      setBusinesses(data.search.business);
      localStorage.setItem("business", JSON.stringify(data.search.business));
      localStorage.setItem("location", JSON.stringify(activeLocation));
    }
  }, [data]);

  useEffect(() => {
    if (!isNil(localStorage.getItem("business")) && isNil(businessList)) {
      const loadInitialData = JSON.parse(localStorage.getItem("business"));
      setBusinesses(loadInitialData);
    }

    if (!isNil(localStorage.getItem("location"))) {
      const loadInitialLocation = JSON.parse(localStorage.getItem("location"));
      setSearchLocation(loadInitialLocation);
      setActiveLocation(loadInitialLocation);
    }
  }, []);

  return (
    <SearchContainer>
      <BackgroundImage>
        <img src="main.jpg" alt="background-image-location" />
      </BackgroundImage>
      <BackgroundColor />
      <Content>
        <Label htmlFor="location">Location:</Label>
        <InputContainer error={error} loading={loading}>
          <Input
            type="text"
            id="location"
            value={activeLocation}
            onChange={(e) => setActiveLocation(e.target.value)}
          />
        </InputContainer>
        <Label htmlFor="location">Term:</Label>
        <InputContainer error={error} loading={loading}>
          <Input
            type="text"
            id="term"
            value={activeTerm}
            onChange={(e) => setActiveTerm(e.target.value)}
          />
        </InputContainer>
        <ButtonSearch loading={loading} error={error} onClick={handleSearch}>
          Search
          {/* We could handle icons by importing them from a separate file, but for now I take this way */}
          <IconSearchContainer
            loading={loading}
            data={!isNil(data) && data.search.total > 0}
            error={error}
          >
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path
                fill="none"
                d="M12.323,2.398c-0.741-0.312-1.523-0.472-2.319-0.472c-2.394,0-4.544,1.423-5.476,3.625C3.907,7.013,3.896,8.629,4.49,10.102c0.528,1.304,1.494,2.333,2.72,2.99L5.467,17.33c-0.113,0.273,0.018,0.59,0.292,0.703c0.068,0.027,0.137,0.041,0.206,0.041c0.211,0,0.412-0.127,0.498-0.334l1.74-4.23c0.583,0.186,1.18,0.309,1.795,0.309c2.394,0,4.544-1.424,5.478-3.629C16.755,7.173,15.342,3.68,12.323,2.398z M14.488,9.77c-0.769,1.807-2.529,2.975-4.49,2.975c-0.651,0-1.291-0.131-1.897-0.387c-0.002-0.004-0.002-0.004-0.002-0.004c-0.003,0-0.003,0-0.003,0s0,0,0,0c-1.195-0.508-2.121-1.452-2.607-2.656c-0.489-1.205-0.477-2.53,0.03-3.727c0.764-1.805,2.525-2.969,4.487-2.969c0.651,0,1.292,0.129,1.898,0.386C14.374,4.438,15.533,7.3,14.488,9.77z"
              ></path>
            </svg>
          </IconSearchContainer>
          <IconLoadingContainer loading={loading}>
            <svg
              version="1.1"
              viewBox="0 0 128 128"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="M96.1,103.6c-10.4,8.4-23.5,12.4-36.8,11.1c-10.5-1-20.3-5.1-28.2-11.8H44v-8H18v26h8v-11.9c9.1,7.7,20.4,12.5,32.6,13.6   c1.9,0.2,3.7,0.3,5.5,0.3c13.5,0,26.5-4.6,37-13.2c19.1-15.4,26.6-40.5,19.1-63.9l-7.6,2.4C119,68.6,112.6,90.3,96.1,103.6z" />
                <path d="M103,19.7c-21.2-18.7-53.5-20-76.1-1.6C7.9,33.5,0.4,58.4,7.7,81.7l7.6-2.4C9,59.2,15.5,37.6,31.9,24.4   C51.6,8.4,79.7,9.6,98,26H85v8h26V8h-8V19.7z" />
              </g>
            </svg>
          </IconLoadingContainer>
          <IconErrorContainer error={error}>
            <span>!</span>
          </IconErrorContainer>
        </ButtonSearch>

        {error && <ErrorMessage>error, please try again</ErrorMessage>}
      </Content>
    </SearchContainer>
  );
}

const mapStateToProps = (state) => {
  return { location: state.main.location, businessList: state.main.businesses };
};

const mapDispatchToProps = {
  setSearchLocation,
  setBusinesses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
