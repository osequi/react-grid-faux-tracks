import Head from "next/head";
import styled, { css } from "styled-components";

import GridFauxLines, {
  getGridFauxLinesCss,
} from "../src/components/GridFauxLines";

const Grid = styled("section").attrs((props) => ({
  style: {
    display: "grid",
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gridTemplateRows: `repeat(${props.rows}, 1fr)`,
  },
}))`
  ${getGridFauxLinesCss}
`;

const Home = () => {
  return (
    <>
      <GridFauxLines
        columns={3}
        rows={3}
        lines="both"
        generateChildren={true}
      />
      <Grid
        columns={4}
        rows={4}
        lines="both"
        children={Array(16)
          .fill("x")
          .map((item, index) => {
            return <span>{index + 1}</span>;
          })}
      />
    </>
  );
};

export default Home;
