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
  alignItems: "center",
  justifyItems: "center",

  ["& > *"]: {
    //width: "100%",
    //height: "100%",
    boxSizing: "border-box",

    [`&:not(:nth-child(${props.borderLeftException}))`]: {
      borderLeft: "1px solid",
    },

    [`&:not(:nth-child(${props.borderBottomException}))`]: {
      borderBottom: "1px solid #000",
    },
  },
}));

/**
 * Displays the component
 */
const GridFauxLines = (props) => {
  const { columns, rows, children, generateChildren } = props;

  if (!children && !generateChildren) return null;
  if (columns === 0 || rows === 0) return null;

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

  return (
    <Container
      className="GridFauxLines"
      columns={columns}
      rows={rows}
      borderLeftException={borderLeftException}
      borderBottomException={borderBottomException}
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
