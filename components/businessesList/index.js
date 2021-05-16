import { useState } from "react";
import { connect } from "react-redux";
import { setInfo } from "../../redux/actions/main";
import styled from "styled-components";

const BusinessesListContainer = styled.section`
  display: flex;
  min-height: 50vh;
  position: relative;
  padding: 0 20px;
  margin: 0 20px;
  margin-top: -30px;
  background: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 0 10px 3px #0000002e;
  padding: 20px;
  z-index: 2;
  flex-wrap: wrap;
  flex-direction: column;
`;

const List = styled.ul`
  display: flex;
  width: 100%;
  margin-top: 40px;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.25em;
  font-weight: 700;
`;

function BusinessesList({ search, setInfo }) {
  return (
    <BusinessesListContainer>
      <Title>Latest Search</Title>
      <List>
        <Item>hola</Item>
        <Item>hola</Item>
        <Item>hola</Item>
      </List>
    </BusinessesListContainer>
  );
}

const mapStateToProps = (state) => {
  return { search: state.main.search };
};

const mapDispatchToProps = {
  setInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessesList);
