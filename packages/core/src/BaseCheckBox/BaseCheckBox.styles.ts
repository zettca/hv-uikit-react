import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";
import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvBaseCheckBox", {
  root: {
    padding: 0,
    width: 32,
    minWidth: 32,
    height: 32,
    borderRadius: theme.radii.base,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },

    "& svg": {
      width: 16,
      height: 16,
      color: theme.colors.bgPaper,
      borderRadius: theme.radii.none,
      border: `1px solid ${theme.colors.borderText}`,
    },
  },
  disabled: {
    "&$root": {
      cursor: "not-allowed",
      pointerEvents: "initial",
      "& svg": {
        color: theme.colors.bgAction, // TODO: 🎨
        borderColor: theme.colors.secondary_60, // TODO: 🎨
        backgroundColor: theme.colors.bgAction,
      },
    },
  },
  focusVisible: {
    "& svg": {
      ...outlineStyles,
    },
  },
  icon: {},
  checked: {
    "& svg": {
      border: `1px solid ${theme.colors.borderText}`,
      backgroundColor: theme.colors.secondary, // TODO: 🎨
      color: theme.colors.bgPaper,
    },
    "&$disabled": {
      "& svg": {
        color: theme.colors.textDisabled,
      },
    },
  },
  indeterminate: {
    "& svg": {
      color: theme.colors.text,
    },
    "&$disabled": {
      "& svg": {
        color: theme.colors.textDisabled,
      },
    },
  },
  semantic: {
    "& svg": {
      border: `1px solid ${theme.colors.base_dark}`,
      color: theme.colors.base_light,
      backgroundColor: theme.colors.base_dark,
    },
    "&$indeterminate": {
      "& svg": {
        color: theme.colors.base_dark,
        backgroundColor: theme.colors.base_light,
      },
    },
  },
});
