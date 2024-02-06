/* eslint-disable react/function-component-definition */
import { forwardRef, useRef } from "react";
import { DropDownXS } from "@hitachivantara/uikit-react-icons";

import type { OverlayTriggerState } from "@react-stately/overlays";
import {
  type AriaPopoverProps,
  usePopover,
  DismissButton,
} from "@react-aria/overlays";
import { useButton } from "@react-aria/button";
import { SelectStateOptions, useSelectState } from "@react-stately/select";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { AriaListBoxProps, useListBox, useOption } from "@react-aria/listbox";

import {
  HvFormElement,
  HvFormElementProps,
  HvInfoMessage,
  HvLabel,
  HvWarningText,
} from "../Forms";
import { ExtractNames } from "../utils/classes";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { useControlled } from "../hooks/useControlled";
import { setId } from "../utils/setId";
import { useUniqueId } from "../hooks/useUniqueId";
import { HvDropdownButton } from "../BaseDropdown/DropdownButton";
import { HvListContainer, HvListItem } from "../ListContainer";
import { HvDropdownPanel } from "../BaseDropdown/DropdownPanel";
import { useClasses } from "./Select.styles";

const Button = forwardRef<HTMLButtonElement, any>((props, ref) => {
  const { children } = props;
  const { buttonProps } = useButton(props, ref);

  return (
    <HvDropdownButton {...buttonProps} ref={ref}>
      {children}
    </HvDropdownButton>
  );
});

const Option = ({ item, state }) => {
  const ref = useRef(null);
  const { optionProps, isSelected, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  return (
    <HvListItem
      selectable
      condensed
      selected={isSelected}
      disabled={isDisabled}
      {...optionProps}
      ref={ref}
    >
      {item.rendered}
    </HvListItem>
  );
};

const ListBox = (props: AriaListBoxProps<any>) => {
  const ref = useRef(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, ref);

  return (
    <HvDropdownPanel>
      <HvListContainer {...listBoxProps} ref={listBoxRef}>
        {[...state.collection].map((item) => (
          <Option key={item.key} item={item} state={state} />
        ))}
      </HvListContainer>
    </HvDropdownPanel>
  );
};

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
  popoverRef?: React.RefObject<HTMLDivElement>;
}

function Popover(props: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { popoverRef = ref, state, children, isNonModal } = props;
  const { popoverProps, underlayProps } = usePopover(
    { ...props, popoverRef },
    state
  );

  return (
    <>
      {!isNonModal && (
        <div {...underlayProps} style={{ position: "fixed", inset: 0 }} />
      )}
      <div {...popoverProps} ref={popoverRef}>
        {!isNonModal && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </>
  );
}

export interface HvSelectProps extends Omit<HvFormElementProps, "children"> {
  classes?: ExtractNames<typeof useClasses>;
  children: (item: any) => React.ReactNode;
}

/** HvSelect does some amazing stuff */
export const HvSelect = forwardRef<HTMLDivElement, HvSelectProps>(
  (props, ref) => {
    const {
      children,
      classes: classesProp,

      id: idProp,
      name,
      required = false,
      disabled = false,
      readOnly = false,
      label,

      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      description,
      "aria-describedby": ariaDescribedBy,
      status,
      statusMessage,
      "aria-errormessage": ariaErrorMessage,

      className,
      onClick,
      ...others
    } = useDefaultProps("HvSelect", props);
    const { classes, cx } = useClasses(classesProp);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const id = useUniqueId(idProp);
    const errorId = useUniqueId(setId(idProp, "error"));

    const [validationMessage] = useControlled(statusMessage, "Required");
    const [validationState] = useControlled(status, "standBy");

    const stateProps: SelectStateOptions<any> = { ...props };
    const state = useSelectState(stateProps);

    const {
      labelProps,
      triggerProps,
      valueProps,
      menuProps,
      descriptionProps,
    } = useSelect(stateProps, state, buttonRef);

    // the error message area will only be created if:
    // - an external element that provides an error message isn't identified via aria-errormessage AND
    //   - both status and statusMessage properties are being controlled OR
    //   - status is uncontrolled and required is true
    const canShowError =
      ariaErrorMessage == null &&
      ((status !== undefined && statusMessage !== undefined) ||
        (status === undefined && required));

    return (
      <HvFormElement
        id={id}
        ref={ref}
        name={name}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        status={validationState}
        className={cx(classes.root, className)}
        {...others}
      >
        {(label || description) && (
          <>
            {label && (
              <HvLabel
                label={label}
                className={classes.label}
                {...labelProps}
              />
            )}
            {description && (
              <HvInfoMessage
                className={classes.description}
                {...descriptionProps}
              >
                {description}
              </HvInfoMessage>
            )}
          </>
        )}

        <HiddenSelect
          name={name}
          label={label}
          autoComplete="" // TODO: review
          isDisabled={disabled}
          state={state}
          triggerRef={buttonRef}
        />
        <Button
          {...triggerProps}
          ref={buttonRef}
          endIcon={<DropDownXS role="none" />}
        >
          <span {...valueProps}>
            {state.selectedItem
              ? state.selectedItem.rendered
              : "SELECT_AN_OPTION"}
          </span>
        </Button>
        {state.isOpen && (
          <Popover
            state={state}
            triggerRef={buttonRef}
            placement="bottom start"
          >
            <ListBox {...menuProps} state={state} />
          </Popover>
        )}

        {canShowError && (
          <HvWarningText id={errorId} disableBorder className={classes.error}>
            {validationMessage}
          </HvWarningText>
        )}
      </HvFormElement>
    );
  }
);
