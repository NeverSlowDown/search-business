import { useState } from "react";
import { connect } from "react-redux";
import { setInfo } from "../redux/actions/main";
import styles from "../styles/Home.module.css";

function Home({ name, setInfo }) {
  const [search, setSearch] = useState("");

  return (
    // need to move this to a component folder
    <div className={styles.container}>
      <p>Search {name}:</p>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setInfo(search)}>Submit</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { name: state.main.name };
};

const mapDispatchToProps = {
  setInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
