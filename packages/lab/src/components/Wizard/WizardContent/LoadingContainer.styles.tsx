import {
  createClasses,
  hexToRgbA,
  theme,
} from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses(
  "HvWizard-LoadingContainer",
  {
    loading: {
      width: "100%",
      height: "100%",
    },
    overlay: {
      position: "absolute",
      transition: "background-Color .2s ease",
      zIndex: -1,
    },
    blur: {
      backgroundColor: hexToRgbA(theme.colors.atmo2),
      zIndex: theme.zIndices.modal,
    },
  }
);
