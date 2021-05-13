import { connect } from "react-redux";
import Search from "../components/search";
import Nav from "../components/nav";
import Footer from "../components/footer";

function Home({ search }) {
  return (
    <>
      <Nav />
      <main>
        <Search />
      </main>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return { search: state.main.search };
};

export default connect(mapStateToProps)(Home);
