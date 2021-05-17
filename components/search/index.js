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
  min-height: calc(50vh + 30px);
  border-radius: 0 0 20px 20px;
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
  align-items: center;
`;

const Label = styled.label`
  font-size: 1em;
  font-weight: 700;
  align-self: flex-start;
`;

const InputContainer = styled.div`
  position: relative;
  width: ${(props) => (props.loading ? 13 : 100)}%;
  display: flex;
  transition: 0.5s ease;
  flex-direction: column;
  justify-content: center;
  animation: ${(props) => (props.error ? "errorInput 2s ease" : "none")};

  @keyframes errorInput {
    0% {
      width: 13%;
    }
    50% {
      width: 13%;
    }
    100% {
      width: 100%;
    }
  }
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
  overflow: hidden;

  animation: ${(props) => (props.error ? "error 1.5s ease" : "none")};

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
  position: absolute;
  transition: 0.5s ease;
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
const IconSuccessContainer = styled.div`
  animation: ${(props) => (props.data ? "success 2s ease" : "")};
  position: absolute;
  transform: translateY(${(props) => (props.data ? 0 : 30)}px);

  @keyframes success {
    0% {
      transform: translateY(30px);
    }

    50% {
      transform: translateY(0px);
    }

    100% {
      transform: translateY(-30px);
    }
  }
`;

const IconEditContainer = styled.div`
  transform: translateY(${(props) => (props.data ? 0 : 30)}px);
  position: absolute;
  transition: 0.5s ease;
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
          src="https://images.unsplash.com/photo-1498354178607-a79df2916198?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
          alt="background-image-location"
        />
      </BackgroundImage>
      <BackgroundColor />
      <Content>
        <Label for="location">Location:</Label>
        <InputContainer error={error} loading={loading}>
          <Input
            type="text"
            id="location"
            value={activeSearch}
            onChange={(e) => setActiveSearch(e.target.value)}
          />
          <ButtonIconSave error={error} onClick={handleSearch}>
            Search
            {/* We could handle icons by importing them from a separate file, but for now I take this way */}
            <IconSearchContainer
              loading={loading}
              data={typeof data !== "undefined" && data.length > 0}
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
            <IconSuccessContainer
              data={typeof data !== "undefined" && data.length > 0}
            >
              <svg className="svg-icon" viewBox="0 0 20 20">
                <path
                  fill="none"
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                ></path>
              </svg>
            </IconSuccessContainer>
            <IconEditContainer
              data={typeof data !== "undefined" && data.length > 0}
            >
              <svg
                version="1.1"
                viewBox="0 0 20 20"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="pen">
                  <path d="M1648.016,305.367L1390.795,48.149C1359.747,17.098,1318.466,0,1274.555,0c-43.907,0-85.188,17.098-116.236,48.148   L81.585,1124.866c-10.22,10.22-16.808,23.511-18.75,37.833L0.601,1621.186c-2.774,20.448,4.161,41.015,18.753,55.605   c12.473,12.473,29.313,19.352,46.714,19.352c2.952,0,5.923-0.197,8.891-0.601l458.488-62.231   c14.324-1.945,27.615-8.529,37.835-18.752L1648.016,537.844c31.049-31.048,48.146-72.33,48.146-116.237   C1696.162,377.696,1679.064,336.415,1648.016,305.367z M493.598,1505.366l-350.381,47.558l47.56-350.376L953.78,439.557   l302.818,302.819L493.598,1505.366z M1554.575,444.404l-204.536,204.533l-302.821-302.818l204.535-204.532   c8.22-8.218,17.814-9.446,22.802-9.446c4.988,0,14.582,1.228,22.803,9.446l257.221,257.218c8.217,8.217,9.443,17.812,9.443,22.799   S1562.795,436.186,1554.575,444.404z" />
                </g>
                <g id="Layer_1" />
              </svg>
            </IconEditContainer>
          </ButtonIconSave>
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
