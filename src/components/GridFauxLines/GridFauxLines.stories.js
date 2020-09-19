import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";

import GridFauxLines from "./GridFauxLines";

export default {
  title: "Componens/GridFauxLines",
  component: GridFauxLines,
};

const Template = (args) => (
  <ThemeProvider theme={theme}>
    <GridFauxLines {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.decorators = [
  (Story) => (
    <div>
      <p>It should be empty because `children` is not set by default.</p>
      <Story />
    </div>
  ),
];

export const WithChildren = Template.bind({});
WithChildren.args = { children: "children" };
WithChildren.decorators = [
  (Story) => (
    <div>
      <p>
        It should be empty because `rows`, `columns` are not set by default.
      </p>
      <Story />
    </div>
  ),
];

export const WithChildrenColsAndRows = Template.bind({});
WithChildrenColsAndRows.args = { ...WithChildren.args, columns: 3, rows: 3 };
WithChildrenColsAndRows.decorators = [
  (Story) => (
    <div>
      <p>It should be empty because `lines` are not set by default.</p>
      <Story />
    </div>
  ),
];

export const WithAllPropsSet = Template.bind({});
WithAllPropsSet.args = {
  ...WithChildrenColsAndRows.args,
  lines: "both",
  children: "Displays no grid since children is just a string",
};

export const WithChildrenProperlySet = Template.bind({});
WithChildrenProperlySet.args = {
  ...WithAllPropsSet.args,
  children: Array(9)
    .fill("x")
    .map((item, index) => {
      return <span>{index + 1}</span>;
    }),
};

export const WithGenerateChildren = Template.bind({});
WithGenerateChildren.args = {
  ...WithAllPropsSet.args,
  children: null,
  generateChildren: true,
};

export const WithHorizontalLines = Template.bind({});
WithHorizontalLines.args = {
  ...WithGenerateChildren.args,
  lines: "horizontal",
};

export const WithVerticalLines = Template.bind({});
WithVerticalLines.args = {
  ...WithGenerateChildren.args,
  lines: "vertical",
};

export const WithGetGridFauxLinesCss = Template.bind({});
WithGetGridFauxLinesCss.decorators = [
  (Story) => (
    <>
      <p>Check `pages/index.js` for the demo</p>
      <Story />
    </>
  ),
];
