import Head from "next/head";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import GridFauxLines, {
  getGridFauxLinesCss,
} from "../src/components/GridFauxLines";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: (props) => `repeat(${props.columns}, 1fr)`,
    gridTemplateRows: (props) => `repeat(${props.rows}, 1fr)`,
    ...getGridFauxLinesCss,
  },
});

const Home = () => {
  const props = {
    columns: 3,
    rows: 3,
    lines: "both",
  };

  const { container } = useStyles(props);

  return (
    <>
      <GridFauxLines {...props} generateChildren={true} />
      <section
        className={clsx("Grid", container)}
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
