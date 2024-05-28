import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvActionBar", {
  root: {
    width: "100%",
    padding: theme.space.sm,
    borderTop: `1px solid ${theme.colors.divider}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
