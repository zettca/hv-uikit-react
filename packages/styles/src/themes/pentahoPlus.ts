import type { CSSProperties } from "react";

import { makeTheme } from "../makeTheme";
import { radii } from "../tokens";
import { colors } from "../tokens/colors";
import {
  blue,
  cyan,
  green,
  orange,
  red,
  slate,
  violet,
  yellow,
} from "../tokens/colorsPalette";

const pentahoPlus = makeTheme((theme) => ({
  name: "pentahoPlus",
  colors: {
    modes: {
      dawn: {
        type: "light",
        ...colors.common,
        ...colors.light,
        containerBackgroundHover: `color-mix(in srgb, ${blue[500]} 10%, transparent)`,
        backgroundColor: slate[100],
        atmo1: slate[50],
        atmo2: slate[100],
        atmo3: slate[200],
        atmo4: slate[300],
        base_light: slate[50],
        base_dark: slate[700],
        primary: blue[500],
        primary_80: blue[600],
        primary_20: `color-mix(in srgb, ${blue[500]} 10%, transparent)`,
        secondary: slate[700],
        secondary_80: slate[600],
        secondary_60: slate[500],
        secondary_20: `color-mix(in srgb, ${slate[700]} 10%, transparent)`, // 🆕
        positive: green[600],
        positive_120: green[800],
        positive_80: green[400],
        neutral: cyan[500],
        warning: yellow[500],
        warning_120: orange[400],
        warning_140: orange[600],
        negative: red[600],
        negative_120: red[800],
        negative_80: red[400],
        catastrophic: violet[600],
        negative_20: red[50],
        warning_20: yellow[50],
        positive_20: green[50],
        neutral_20: cyan[50],
        shadow: "0px 2px 4px -1px #33415514",
        shad1: "#33415514",
      },
      wicked: {
        type: "dark",
        ...colors.common,
        ...colors.dark,
      },
    },
  },
  fontFamily: {
    body: "Inter",
  },
  typography: {
    display: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl4,
      lineHeight: theme.lineHeights.xl4,
    },
    title1: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl3,
      lineHeight: theme.lineHeights.xl3,
    },
    title2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl2,
      lineHeight: theme.lineHeights.xl2,
    },
    title3: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl,
      lineHeight: theme.lineHeights.xl,
    },
    title4: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
    },
    label: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
    },
    body: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
    },
    captionLabel: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
    },
    caption1: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
    },
    caption2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.xs,
      lineHeight: theme.lineHeights.xs,
    },
    // LEGACY
    "5xlTitle": {
      color: theme.colors.secondary,
      fontSize: "52px",
      letterSpacing: "0.02em",
      lineHeight: "60px",
      fontWeight: 600,
    },
    "4xlTitle": {
      color: theme.colors.secondary,
      fontSize: "52px",
      letterSpacing: "0.02em",
      lineHeight: "60px",
      fontWeight: 400,
    },
    xxlTitle: {
      color: theme.colors.secondary,
      fontSize: "42px",
      letterSpacing: "0.02em",
      lineHeight: "52px",
      fontWeight: 400,
    },
    lTitle: {
      color: theme.colors.secondary,
      fontSize: "32px",
      letterSpacing: "0.02em",
      lineHeight: "40px",
      fontWeight: 400,
    },
    sTitle: {
      color: theme.colors.secondary,
      fontSize: "22px",
      letterSpacing: "0.02em",
      lineHeight: "30px",
      fontWeight: 400,
    },
    xxsTitle: {
      color: theme.colors.secondary,
      fontSize: "18px",
      letterSpacing: "0.02em",
      lineHeight: "28px",
      fontWeight: 400,
    },
    sectionTitle: {
      color: theme.colors.secondary,
      fontSize: "14px",
      letterSpacing: "0.32em",
      lineHeight: "18px",
      fontWeight: 400,
      textTransform: "uppercase",
    },
    placeholderText: {
      color: theme.colors.secondary_60,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 400,
    },
    link: {
      color: theme.colors.primary,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 600,
    },
    disabledText: {
      color: theme.colors.secondary_60,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 600,
    },
    selectedNavText: {
      color: theme.colors.brand,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 600,
    },
    vizTextDisabled: {
      color: theme.colors.secondary_60,
      fontSize: "10px",
      letterSpacing: "0.02em",
      lineHeight: "15px",
      fontWeight: 400,
    },
    xsInlineLink: {
      color: theme.colors.primary,
      fontSize: "10px",
      letterSpacing: "0.02em",
      lineHeight: "15px",
      fontWeight: 600,
      textDecoration: "underline",
    },
  },
  sizes: {
    xs: "32px",
    md: "48px",
    lg: "56px",
    xl: "64px",
    sm: "40px",
  },
  radii: {
    ...radii,
    base: "6px",
  },
  components: {
    HvBaseCheckBox: {
      classes: {
        root: {
          "& svg": {
            width: 16,
            height: 16,
            borderRadius: "3px",
            border: `1px solid ${theme.colors.secondary}`,
          },
        },
        checked: {
          "& svg": {
            border: `1px solid ${theme.colors.primary}`,
            backgroundColor: theme.colors.primary,
            color: theme.colors.atmo1,
          },
        },
      },
    },
    HvBaseRadio: {
      classes: {
        root: {
          "& svg": {
            width: 16,
            height: 16,
            border: `1px solid ${theme.colors.secondary}`,
          },
        },
        checked: {
          "& svg": {
            border: `1px solid ${theme.colors.primary}`,
            backgroundColor: theme.colors.atmo1,
            color: theme.colors.primary,
          },
          "&.HvBaseRadio-disabled": {
            "& svg": {
              border: `1px solid ${theme.colors.secondary_60}`,
              backgroundColor: theme.colors.atmo3,
              color: theme.colors.secondary_60,
            },
          },
        },
      },
    },
    HvDotPagination: {
      classes: {
        radio: {
          width: 16,
          minWidth: 16,
        },
      },
    },
    HvBaseSwitch: {
      classes: {
        root: {
          "& .HvBaseSwitch-switchBase": {
            "&.HvBaseSwitch-checked": {
              "& .HvBaseSwitch-thumb": {
                border: `1px solid ${theme.colors.primary}`,
              },
              "+.HvBaseSwitch-track": {
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.primary,
              },
            },
          },
        },
        thumb: {
          height: 10,
          width: 10,
        },
      },
    },
    HvTag: {
      classes: {
        root: {
          "&.MuiButtonBase-root.MuiChip-root": {
            borderRadius: theme.radii.full,
            padding: theme.spacing("2px", 0),
            "& .MuiChip-label": {
              paddingLeft: 8,
              paddingRight: 8,
            },
            "& .MuiChip-avatar": {
              marginLeft: theme.space.xs,
            },
          },
          "&& .MuiChip-deleteIcon": {
            borderRadius: `0 ${theme.radii.full} ${theme.radii.full} 0`,
            paddingRight: 4,
          },
        },
      },
    },
    HvButton: {
      classes: {
        root: {
          borderRadius: theme.radii.full,
          padding: theme.spacing(0, "sm"),
          "&:active": {
            boxShadow: `inset 0 1px 2px 0 #00000033`, // 33 = 20% opacity
          },
        },
        disabled: {
          backgroundColor: "#E2E8F0",
          "&:hover": {
            backgroundColor: "#E2E8F0",
          },
          "&:active": {
            boxShadow: "none",
          },
        },
        primary: {
          "&:hover": {
            backgroundColor: theme.colors.primary_80,
          },
          "&:active": {
            backgroundColor: theme.colors.primary_80,
            boxShadow: `inset 0 1px 2px 0 #0000004D`, // 4D = 30% opacity
          },
        },
        subtle: {
          border: "none",
          backgroundColor: theme.colors.atmo1,
          boxShadow: theme.colors.shadow,
          "&.HvButton-disabled": {
            backgroundColor: "#E2E8F0",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#E2E8F0",
            },
            "&:active": {
              boxShadow: "none",
            },
          },
        },
      },
    },
    HvMultiButton: {
      classes: {
        multiple: {
          backgroundColor: "#EEEEEE",
          color: "#999999",
          borderRadius: 20,
          "& button.HvMultiButton-button": {
            border: "none",
            backgroundColor: "transparent",
            "&.HvMultiButton-firstButton": {
              borderRadius: "20px 0 0 20px",
            },
            "&.HvMultiButton-lastButton": {
              borderRadius: "0 20px 20px 0",
            },
            "&.HvMultiButton-selected": {
              borderRadius: 20,
              border: "none",
              color: theme.colors.primary,
              backgroundColor: theme.colors.atmo1,
            },
            "&:disabled": {
              border: "none",
              "&:hover": {
                border: "none",
                backgroundColor: "transparent",
              },
            },
          },
        },
        vertical: {
          backgroundColor: "#EEEEEE",
          color: "#999999",
          borderRadius: 20,
          "& button.HvMultiButton-button": {
            border: "none",
            backgroundColor: "transparent",
            "&.HvMultiButton-firstButton": {
              borderRadius: "20px 0 0 20px",
            },
            "&.HvMultiButton-lastButton": {
              borderRadius: "0 20px 20px 0",
            },
            "&.HvMultiButton-selected": {
              borderRadius: 20,
              border: "none",
              color: theme.colors.primary,
              backgroundColor: theme.colors.atmo1,
            },
            "&:disabled": {
              border: "none",
            },
          },
        },
      },
    },
  } satisfies Record<string, Record<string, any> | { classes?: CSSProperties }>,
  header: {
    height: "64px",
    secondLevelHeight: "56px",
  },
  bulkActions: {
    actionButtonVariant: "primaryGhost",
  },
  table: {
    rowStripedBackgroundColorEven: theme.colors.atmo1, // TODO - remove in v6
    rowStripedBackgroundColorOdd: "transparent", // TODO - remove in v6
    rowExpandBackgroundColor: theme.colors.atmo2,
    rowSortedColor: theme.colors.primary, // TODO - remove in v6
    rowSortedColorAlpha: "0.1", // TODO - remove in v6
  },
  stepNavigation: {
    separatorMargin: "4px",
    defaultSeparatorHeight: 1,
    simpleSeparatorHeight: 1,
  },
  filterGroup: {
    applyButtonVariant: "primary",
    cancelButtonVariant: "secondarySubtle",
  },
  scrollTo: {
    dotSelectedSize: 6,
    backgroundColorOpacity: 0.9, // TODO - remove in v6
  },
  colorPicker: {
    hueDirection: "horizontal",
  },
  snackbar: {
    actionButtonVariant: "secondarySubtle",
  },
}));

export default pentahoPlus;
