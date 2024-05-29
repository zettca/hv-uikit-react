import { createClasses } from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvCodeEditor", {
  root: {
    minHeight: 200,
    border: `solid 1px ${theme.colors.divider}`,
    "& .monaco-editor": {},
    "& .monaco-editor .minimap > canvas": {
      borderLeft: `solid 1px ${theme.colors.divider}`,
    },
    "& .monaco-editor .margin": {
      background: theme.colors.backgroundColor,
      borderRight: `solid 1px ${theme.colors.divider}`,
    },
    "& .monaco-scrollable-element > .scrollbar > .slider": {
      borderRadius: "5px",
      background: theme.colors.secondary_60, // TODO: 🎨
    },
    "& .monaco-scrollable-element > .scrollbar > .slider:hover": {
      background: theme.colors.secondary, // TODO: 🎨
    },
    "& .monaco-scrollable-element > .scrollbar > .slider:active": {
      background: theme.colors.secondary, // TODO: 🎨
    },
    "& .monaco-scrollable-element > .visible": {
      background: theme.colors.bgPaper,
    },
    "& .monaco-scrollable-element > .visible.horizontal": {
      borderTop: `solid 1px ${theme.colors.divider}`,
    },
    "& .monaco-scrollable-element > .visible.vertical": {
      borderLeft: `solid 1px ${theme.colors.divider}`,
    },
    "& .monaco-editor .scroll-decoration": {
      display: "none",
    },
    "& .monaco-editor .minimap-shadow-visible": {
      display: "none",
    },
  },
});
