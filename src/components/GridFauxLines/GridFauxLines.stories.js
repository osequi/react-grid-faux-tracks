import React from "react";
import { storiesOf } from "@storybook/react";

import GridFauxLines from "./GridFauxLines";
import description from "./GridFauxLines.md";

storiesOf("GridFauxLines", module).add("Overview", () => <GridFauxLines />, {
  notes: { markdown: description }
});
