import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";
import { outlineStyles } from "../../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvDropZone", {
  dropZoneContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    border: `1px dashed ${theme.colors.textDisabled}`, // TODO: 🎨
    cursor: "pointer",
    background: theme.colors.bgPaper,
    borderRadius: theme.radii.round,

    "&:hover": {
      background: `${theme.colors.bgPaper}`,
      border: `1px dashed ${theme.colors.border}`,
    },

    "&:focus-within": {
      background: `${theme.colors.bgPaper}`,
      border: `1px dashed ${theme.colors.border}`,
      ...outlineStyles,
    },
  },
  dropZoneLabelsGroup: {
    display: "flex",
    justifyContent: "start",

    "& label:nth-of-type(1)": {},

    "& p:nth-of-type(2)": {
      marginLeft: "auto",
    },
  },
  dragAction: {
    background: `${theme.colors.bgPaper}`,
    border: `1px dashed ${theme.colors.primary}`,
  },
  dropZoneContainerDisabled: {
    background: `${theme.colors.bgDisabled}`,
    border: `1px dashed ${theme.colors.textDisabled}`,
    cursor: "not-allowed",
    "&:hover": {
      background: `${theme.colors.bgDisabled}`,
      border: `1px dashed ${theme.colors.textDisabled}`,
    },

    "& $dragText": {
      color: theme.colors.textDisabled,
    },
    "& $selectFilesText": {
      color: theme.colors.textDisabled,
    },
  },
  inputArea: {
    opacity: 0,
    width: "100%",
    position: "absolute",
    height: "100%",
    cursor: "pointer",

    "&:disabled": {
      cursor: "not-allowed",
    },
  },
  dropArea: {
    display: "flex",
    margin: `${theme.space.md} auto`,
    minHeight: 48,
  },
  dropZoneAreaLabels: {
    display: "flex",
    maxWidth: 120,
    margin: "auto",
  },
  dropZoneAreaIcon: {
    margin: "auto",
    marginRight: theme.space.xs,
  },
  dropZoneLabel: {
    paddingBottom: 6,
  },
  dragText: {
    ...(theme.typography.body as React.CSSProperties),
  },
  selectFilesText: {
    ...(theme.typography.label as React.CSSProperties),
  },
});
