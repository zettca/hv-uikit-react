import { forwardRef } from "react";
import {
  ClickAwayListener,
  ClickAwayListenerProps,
} from "@mui/base/ClickAwayListener";
import { Portal } from "@mui/base/Portal";

import { useTheme } from "../hooks/useTheme";
import { getContainerElement } from "../utils/document";

export interface HvDropdownContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  disablePortal?: boolean;
  onClickAway: ClickAwayListenerProps["onClickAway"];
  onContainerKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}

export const HvDropdownContainer = forwardRef<
  HTMLDivElement,
  HvDropdownContainerProps
>((props, ref) => {
  const {
    className,
    open,
    children,
    disablePortal,
    onClickAway,
    onContainerKeyDown,
    ...others
  } = props;
  const { rootId } = useTheme();

  return (
    <Portal
      disablePortal={disablePortal}
      container={getContainerElement(rootId)}
    >
      <div ref={ref} {...others}>
        <ClickAwayListener onClickAway={onClickAway}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div onKeyDown={onContainerKeyDown}>{children}</div>
        </ClickAwayListener>
      </div>
    </Portal>
  );
});
