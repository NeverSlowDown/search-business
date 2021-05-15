import { connect } from "react-redux";
import Search from "../components/search";
import BusinessesList from "../components/businessesList";
import Nav from "../components/nav";
import Footer from "../components/footer";

function Home({ search }) {
  return (
    <>
      {/* <Nav /> */}
      <Search />
      <BusinessesList />
      {/* <Footer /> */}
    </>
  );
}

const mapStateToProps = (state) => {
  return { search: state.main.search };
};

export default connect(mapStateToProps)(Home);
