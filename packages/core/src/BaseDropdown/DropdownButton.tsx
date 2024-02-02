import { forwardRef } from "react";
import type { Placement } from "@popperjs/core";
import { DropDownXS } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvButton, HvButtonProps } from "../Button";
import { ExtractNames, createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvDropdownButton", {
  root: {
    width: "100%",
    minWidth: "unset",
    userSelect: "none",
    position: "relative",
    paddingLeft: theme.space.xs,
    justifyContent: "flex-start",
  },
  disabled: {
    color: theme.colors.secondary_60,
  },
  readOnly: {},

  open: {
    backgroundColor: theme.colors.atmo1,
    "&:hover, &:focus-visible": {
      backgroundColor: theme.colors.atmo1,
    },
  },
  openUp: {
    borderRadius: `0px 0px ${theme.radii.base} ${theme.radii.base}`,
  },
  openDown: {
    borderRadius: `${theme.radii.base} ${theme.radii.base} 0px 0px`,
  },

  selection: {
    color: "inherit",
    flex: 1,
    textAlign: "start",

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  placeholder: {},

  arrowContainer: {
    marginRight: -(16 + 1),
  },
  arrow: {
    transition: "rotate 0.2s ease",
  },
});

export type HvDropdownButtonClasses = ExtractNames<typeof useClasses>;

export interface HvDropdownButtonProps extends HvButtonProps {
  readOnly?: boolean;
  open?: boolean;
  placement?: Placement;
  adornment?: React.ReactNode;
  classes?: HvDropdownButtonClasses;
}

export const HvDropdownButton = forwardRef<
  HTMLButtonElement,
  HvDropdownButtonProps
>((props, ref) => {
  const {
    classes: classesProp,
    className,
    open,
    placement = "bottom",
    disabled,
    readOnly,
    children,
    adornment,
    ...others
  } = useDefaultProps("HvDropdownButton", props);
  const { classes, cx } = useClasses(classesProp);

  const endIcon = adornment ?? (
    <DropDownXS
      iconSize="XS"
      style={{ rotate: open ? "180deg" : undefined }}
      className={classes.arrow}
    />
  );

  return (
    <HvButton
      ref={ref}
      type="button"
      variant="secondarySubtle"
      disabled={disabled}
      className={cx(classes.root, className, {
        [classes.open]: open,
        [classes.openUp]: placement.includes("top"),
        [classes.openDown]: placement.includes("bottom"),
        [classes.disabled]: disabled,
        [classes.readOnly]: readOnly,
      })}
      classes={{ endIcon: classes.arrowContainer }}
      endIcon={endIcon}
      {...others}
    >
      <div className={classes.selection}>
        {typeof children === "string" ? (
          <div className={classes.placeholder}>{children}</div>
        ) : (
          children
        )}
      </div>
    </HvButton>
  );
});
