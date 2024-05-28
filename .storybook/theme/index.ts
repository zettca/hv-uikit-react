import { create, ThemeVarsPartial } from "@storybook/theming";
import { colors } from "@hitachivantara/uikit-styles";

const getThemeVars = (base: "light" | "dark"): ThemeVarsPartial => ({
  base,

  appBg: colors[base].atmo1,
  appBorderRadius: 0,
  appContentBg: colors[base].atmo1,
  barBg: colors[base].atmo1,
  barSelectedColor: colors[base].primary,
  barTextColor: colors[base].text,
  brandImage: `ui-kit-logo-${base}.png`,
  brandTitle: "NEXT UI Kit",

  colorPrimary: colors[base].primary,
  colorSecondary: colors[base].text,
  fontBase: "'Open Sans',sans-serif",
  fontCode: "monospace",
  textColor: colors[base].text,
  textInverseColor: colors[base === "dark" ? "light" : "dark"].text,
  textMutedColor: colors[base].textSubtle,

  // controls styles
  booleanBg: colors[base].atmo2,
  booleanSelectedBg: colors[base].atmo1,
  buttonBg: colors[base].atmo1,
  buttonBorder: colors[base].text,
  inputBg: colors[base].atmo1,
  inputBorder: colors[base].textDisabled,
  inputBorderRadius: 2,
  inputTextColor: colors[base].text,
});

export const themes = {
  wicked: create(getThemeVars("dark")),
  dawn: create(getThemeVars("light")),
};
