import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
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
 * Styles the component container
 */
const Container = styled("div")((props) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
  gridTemplateRows: `repeat(${props.rows}, 1fr)`,

  ["& > *"]: {
    boxSizing: "border-box",

    [`&:not(:nth-child(${props.borderLeftException}))`]: {
      borderLeft: `${props.displayHorizontal ? "1px solid" : "none"}`,
    },

    [`&:not(:nth-child(${props.borderBottomException}))`]: {
      borderBottom: `${props.displayVertical ? "1px solid" : "none"}`,
    },
  },
}));

/**
 * Displays the component
 */
const GridFauxLines = (props) => {
  const { columns, rows, lines, children, generateChildren } = props;

  if (!children && !generateChildren) return null;
  if (columns === 0 || rows === 0) return null;
  if (!lines) return null;

  const children2 = children
    ? children
    : Array(columns * rows)
        .fill("x")
        .map((item, index) => {
          return <div key={shortid.generate()}>{index + 1}</div>;
        });

  const lastRow = columns * rows - columns + 1;
  const firstRow = columns - 1;
  const borderLeftException = `${columns}n - ${firstRow}`;
  const borderBottomException = `n + ${lastRow}`;

  const displayVertical = lines === "both" || lines === "vertical";
  const displayHorizontal = lines === "both" || lines === "horizontal";

  return (
    <Container
      className="GridFauxLines"
      columns={columns}
      rows={rows}
      borderLeftException={borderLeftException}
      borderBottomException={borderBottomException}
      displayVertical={displayVertical}
      displayHorizontal={displayHorizontal}
    >
      {children2}
    </Container>
  );
};

GridFauxLines.propTypes = propTypes;
GridFauxLines.defaultProps = defaultProps;

export default GridFauxLines;
export {
  propTypes as GridFauxLinesPropTypes,
  defaultProps as GridFauxLinesDefaultProps,
};
