import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import shortid from "shortid";

import GridFauxLines, {
  getGridFauxLinesCss,
} from "../src/components/GridFauxLines";

const useStyles = makeStyles({
  container: (props) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gridTemplateRows: `repeat(${props.rows}, 1fr)`,
  }),
});

const Home = () => {
  const props = {
    columns: 3,
    rows: 3,
    lines: "both",
  };

  const { container } = useStyles(props);
  const fauxLines = getGridFauxLinesCss(props);

  return (
    <>
      <GridFauxLines {...props} generateChildren={true} />
      <br />
      <section
        className={clsx("Grid", container, fauxLines)}
        children={Array(props.columns * props.rows)
          .fill("x")
          .map((item, index) => {
            return <span key={shortid.generate()}>{index + 1}</span>;
          })}
      />
    </>
  );
};

export default Home;
