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
 * Creates the faux lines CSS
 */
const GridFauxLinesCss = css`
  & > * {
    box-sizing: "border-box";

    &: not(: nth-child(${(props) => props.borderLeftException})) {
      border-left: ${(props) =>
        props.displayHorizontal ? "1px solid" : "none"};
    }

    &: not(: nth-child(${(props) => props.borderBottomException})) {
      border-bottom: ${(props) =>
        props.displayVertical ? "1px solid" : "none"};
    }
  }
`;

/**
 * Styles the component container
 */
const Container = styled("div").attrs((props) => ({
  style: {
    display: "grid",
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gridTemplateRows: `repeat(${props.rows}, 1fr)`,
  },
}))`
  ${GridFauxLinesCss}
`;

/**
 * Styles the cell
 */
const Cell = styled("div")((props) => ({
  display: "grid",
  alignItems: "center",
  justifyItems: "center",
}));

/**
 * Styles the cell content
 */
const CellContent = styled("span")((props) => ({
  padding: "5em",
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
          return (
            <Cell key={shortid.generate()}>
              <CellContent>{index + 1}</CellContent>
            </Cell>
          );
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
