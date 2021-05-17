import { useState } from "react";
import { connect } from "react-redux";
import { setSearchLocation } from "../../redux/actions/main";
import styled from "styled-components";
import PropTypes from "prop-types";
import { isNil } from "ramda";
import Card from "../card";

const BusinessesListContainer = styled.section`
  display: flex;
  min-height: 50vh;
  position: relative;
  padding: 0 20px;
  margin: 0 10px;
  margin-top: -30px;
  background: #fbfbfb;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 0 10px 3px #0000002e;
  padding: 20px;
  z-index: 2;
  flex-wrap: wrap;
  flex-direction: column;
`;

const List = styled.ul`
  width: 100%;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-gap: 20px;
  justify-content: space-around;
  grid-auto-rows: minmax(min-content, max-content);
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.25em;
  font-weight: 700;
`;

function BusinessesList({ location, businessList }) {
  return (
    <BusinessesListContainer>
      <Title>Latest search in {location}</Title>
      <List>
        {!isNil(businessList) ? (
          businessList.map((item) => {
            return <Card item={item} key={item.id} />;
          })
        ) : (
            <p>No results available, try search businesses</p>
          )}
      </List>
    </BusinessesListContainer>
  );
}

const mapStateToProps = (state) => {
  return { location: state.main.location, businessList: state.main.businesses };
};

const mapDispatchToProps = {
  setSearchLocation,
};

BusinessesList.propTypes = {
  businessList: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    alias: PropTypes.string,
    rating: PropTypes.number,
    url: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessesList);
