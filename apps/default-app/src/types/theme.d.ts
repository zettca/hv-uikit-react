import { HvTheme } from "@hitachivantara/uikit-react-core";

// extend Material-UI's theme to use `theme.hv` object
declare module "@mui/private-theming" {
  interface DefaultTheme {
    hv: HvTheme;
    hvSpacing?: SpacingOptions;
    zIndex: Record<string, number>;
    breakpoints: Record<string, function>;
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    hv: HvTheme;
    hvSpacing?: SpacingOptions;
  }

  interface ThemeOptions {
    hv?: HvTheme;
  }
}
