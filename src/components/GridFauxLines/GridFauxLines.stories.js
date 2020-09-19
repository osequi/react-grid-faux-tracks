import React from "react";
import GridFauxLines from "./GridFauxLines";

export default {
  title: "Componens/GridFauxLines",
  component: GridFauxLines,
};

const Template = (args) => <GridFauxLines {...args} />;

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
