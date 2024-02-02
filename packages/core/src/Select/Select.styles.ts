import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvSelect", {
  root: {
    position: "relative",
    "&$disabled,&$readOnly": {
      pointerEvents: "none",
    },
  },
  disabled: {},
  readOnly: {},
  invalid: {
    border: `1px solid ${theme.colors.negative}`,
  },
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    display: "block",
    paddingBottom: 6,
  },
  description: {},
  select: {},
  popper: {},
  error: {},
});
