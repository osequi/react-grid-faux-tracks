import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import shortid from "shortid";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The number of columns
   * @type {number}
   */
  columns: PropTypes.number,
  /**
   * The number of rows
   * @type {number}
   */
  rows: PropTypes.number,
  /**
   * Which lines to display
   * @type {string}
   */
  lines: PropTypes.oneOf(["horizontal", "vertical", "both"]),
  /**
   * The grid items
   * @type {any}
   */
  children: PropTypes.any,
  /**
   * Generate the children?
   * @type {bool}
   */
  generateChildren: PropTypes.bool,
};

/**
 * Defines the default props
 */
const defaultProps = {
  columns: 0,
  rows: 0,
  lines: null,
  children: null,
  generateChildren: false,
};

/**
 * Defines the styles
 */
const useStyles = makeStyles((theme) => ({
  /**
   * Creates the faux lines CSS
   */
  fauxLines: {
    ["&  > *"]: {
      boxSizing: "border-box",

      [`${theme.custom.borderLeftSelector}`]: {
        borderLeft: (props) => (props.displayHorizontal ? "1px solid" : "none"),
      },

      [`${theme.custom.borderBottomSelector}`]: {
        borderBottom: (props) => (props.displayVertical ? "1px solid" : "none"),
      },
    },
  },

  /**
   * Styles the component container
   */
  container: {
    display: "grid",
    gridTemplateColumns: (props) => `repeat(${props.columns}, 1fr)`,
    gridTemplateRows: (props) => `repeat(${props.rows}, 1fr)`,
  },

  /**
   * Styles the cell.
   * Usefull only for demo purposes, when children are generated by the component
   */
  cell: {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
  },

  /**
   * Styles the cell content.
   * Usefull only for demo purposes, when children are generated by the component
   */
  cellContent: {
    padding: "5em",
  },
}));

/**
 * Returns the generated faux lines CSS.
 * Many times the parent will need just a CSS instead of a rendered component.
 * @param  {object} props The props
 * @return {string}       The CSS
 */
const getGridFauxLinesCss = (props) => {
  const { columns, rows, lines } = props;
  let theme = useTheme();

  const lastRow = columns * rows - columns + 1;
  const firstRow = columns - 1;
  const borderLeftException = `${columns}n - ${firstRow}`;
  const borderBottomException = `n + ${lastRow}`;

  const displayHorizontal = lines === "both" || lines === "vertical";
  const displayVertical = lines === "both" || lines === "horizontal";
  const borderLeftSelector = `&:not(:nth-child(${borderLeftException}))`;
  const borderBottomSelector = `&:not(:nth-child(${borderBottomException}))`;

  theme.custom.borderLeftSelector = borderLeftSelector;
  theme.custom.borderBottomSelector = borderBottomSelector;

  const { fauxLines } = useStyles({
    displayVertical: displayVertical,
    displayHorizontal: displayHorizontal,
  });

  return fauxLines;
};

/**
 * Displays the component
 */
const GridFauxLines = (props) => {
  const { columns, rows, lines, children, generateChildren } = props;

  const fauxLines = getGridFauxLinesCss(props);
  const { container, cell, cellContent } = useStyles(props);

  if (!children && !generateChildren) return null;
  if (columns === 0 || rows === 0) return null;
  if (!lines) return null;

  const children2 = children
    ? children
    : Array(columns * rows)
        .fill("x")
        .map((item, index) => {
          return (
            <div key={shortid.generate()} className={clsx("Cell", cell)}>
              <span className={clsx("CellContent", cellContent)}>
                {index + 1}
              </span>
            </div>
          );
        });

  return (
    <section className={clsx("GridFauxLines", container, fauxLines)}>
      {children2}
    </section>
  );
};

GridFauxLines.propTypes = propTypes;
GridFauxLines.defaultProps = defaultProps;

export default GridFauxLines;
export {
  propTypes as GridFauxLinesPropTypes,
  defaultProps as GridFauxLinesDefaultProps,
  getGridFauxLinesCss,
};
