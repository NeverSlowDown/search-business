import { useState } from "react";
import { connect } from "react-redux";
// import {  } from "../../redux/actions/main";

function Search() {
  return (
    <nav>
      <ul>
        <li>item</li>
      </ul>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return { search: state.main.search };
};

const mapDispatchToProps = {
  // setSearchLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
