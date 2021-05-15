import { useState } from "react";
import { connect } from "react-redux";
import { setInfo } from "../../redux/actions/main";
import styled from "styled-components";

const BusinessesListContainer = styled.section`
  display: flex;
  min-height: 50vh;
  /* border-radius: 0 0 80px 80px; */
  position: relative;
  padding: 0 20px;
`;

const List = styled.ul`
  display: flex;
  margin-top: -30px;
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  z-index: 2;
  width: 100%;
  box-shadow: 0 0 10px 3px #0000002e;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
`;

function BusinessesList({ search, setInfo }) {
  return (
    <BusinessesListContainer>
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
