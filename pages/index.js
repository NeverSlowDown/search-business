import Search from "../components/search";
import BusinessesList from "../components/businessesList";

function Home() {
  return (
    <>
      {/* no need of nav */}
      <Search />
      <BusinessesList />
      {/* no need of footer */}
    </>
  );
}

export default Home;
