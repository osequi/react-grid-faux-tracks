import Head from "next/head";
import GridFauxLines from "../src/components/GridFauxLines";

const Home = () => {
  return (
    <GridFauxLines columns={3} rows={3} lines="both" generateChildren={true} />
  );
};

export default Home;
