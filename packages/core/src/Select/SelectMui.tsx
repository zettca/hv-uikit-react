/* eslint-disable prefer-arrow-callback */
import React, { useRef, useState } from "react";
import type { Placement } from "@popperjs/core";

import {
  SelectProvider,
  UseSelectParameters,
  useSelect,
} from "@mui/base/useSelect";
import { useControlled, useForkRef } from "@mui/material/utils";
import { Popper } from "@mui/base/Popper";
import { SelectOption } from "@mui/base/useOption";

import {
  HvFormElement,
  HvFormElementProps,
  HvFormStatus,
  HvInfoMessage,
  HvLabel,
  HvWarningText,
} from "../Forms";
import { ExtractNames } from "../utils/classes";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { staticClasses, useClasses } from "./Select.styles";
import { setId } from "../utils/setId";
import { useUniqueId } from "../hooks/useUniqueId";
import { HvDropdownButton } from "../BaseDropdown/DropdownButton";
import { HvDropdownPanel } from "../BaseDropdown/DropdownPanel";
import { HvTypography } from "../Typography";
import { defaultRenderValue, fixedForwardRef, isMultiSelect } from "./utils";
import { HvListContainer } from "../ListContainer";

export { staticClasses as selectClasses };

export type HvSelectClasses = ExtractNames<typeof useClasses>;

export interface HvSelectProps<
  OptionValue extends {},
  Multiple extends boolean = false
> extends Omit<HvFormElementProps, "value" | "defaultValue" | "onChange">,
    Omit<UseSelectParameters<OptionValue, Multiple>, "componentName"> {
  classes?: HvSelectClasses;
  placeholder?: React.ReactNode;
  autoComplete?: string;
}

/** HvSelect does some amazing stuff */
export const HvSelect = fixedForwardRef(function HvSelect<
  OptionValue extends {},
  Multiple extends boolean
>(
  props: HvSelectProps<OptionValue, Multiple>,
  ref: React.Ref<HTMLButtonElement>
) {
  const {
    children,
    classes: classesProp,
    className,
    id: idProp,
    name,
    required,
    disabled: disabledProp,
    readOnly,
    label,
    open: openProp,
    defaultOpen,
    multiple,
    autoComplete,
    options,
    value: valueProp,
    defaultValue,
    placeholder,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    description,
    "aria-describedby": ariaDescribedBy,
    status,
    statusMessage,
    "aria-errormessage": ariaErrorMessage,
    getSerializedValue,
    onClick,
    onChange,
    ...others
  } = useDefaultProps("HvSelect", props);
  const { classes, cx } = useClasses(classesProp);

  const [placement, setPlacement] = useState<Placement>();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleButtonRef = useForkRef(ref, buttonRef);

  const {
    contextValue,
    disabled,
    getButtonProps,
    getListboxProps,
    getHiddenInputProps,
    getOptionMetadata,
    value,
    open,
  } = useSelect<OptionValue, Multiple>({
    componentName: "HvSelect",
    name,
    required,
    buttonRef: handleButtonRef,
    defaultOpen,
    defaultValue,
    value: valueProp,
    disabled: disabledProp,
    options,
    multiple,
    open: openProp,
    // getSerializedValue,
    onChange,
  });

  const id = useUniqueId(idProp);
  const selectId = useUniqueId(setId(idProp, "error"));
  const errorId = useUniqueId(setId(idProp, "error"));

  const [validationMessage] = useControlled({
    name: "HvSelect.statusMessage",
    controlled: statusMessage,
    default: "Required",
  });
  const [validationState] = useControlled<HvFormStatus>({
    name: "HvSelect.status",
    controlled: status,
    default: "standBy",
  });

  // the error message area will only be created if:
  // - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) ||
      (status === undefined && required));

  const actualValue = isMultiSelect(value, multiple)
    ? value
        .map((v) => getOptionMetadata(v))
        .filter((v): v is SelectOption<OptionValue> => v !== undefined)
    : getOptionMetadata(value as OptionValue) ?? null;

  return (
    <HvFormElement
      id={id}
      name={name}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      status={validationState}
      className={cx(classes.root, className, {
        [classes.disabled]: disabled,
        [classes.readOnly]: readOnly,
      })}
      {...others}
    >
      {(label || description) && (
        <div className={classes.labelContainer}>
          {label && (
            <HvLabel
              htmlFor={selectId}
              label={label}
              className={classes.label}
            />
          )}
          {description && (
            <HvInfoMessage className={classes.description}>
              {description}
            </HvInfoMessage>
          )}
        </div>
      )}

      <HvDropdownButton
        id={selectId}
        open={open}
        disabled={disabled}
        readOnly={readOnly}
        className={cx(classes.select, {
          [classes.invalid]: validationState === "invalid",
        })}
        placement={placement}
        {...getButtonProps()}
      >
        <HvTypography noWrap>
          {defaultRenderValue(actualValue) ?? placeholder}
        </HvTypography>
      </HvDropdownButton>
      <Popper
        modifiers={[
          {
            enabled: true,
            phase: "main",
            fn: ({ state }) => setPlacement(state.placement),
          },
        ]}
        open={open}
        keepMounted
        disablePortal
        anchorEl={buttonRef.current}
        className={classes.popper}
      >
        <HvDropdownPanel
          placement={placement}
          style={{ width: (buttonRef.current?.clientWidth || 0) + 2 }}
        >
          <SelectProvider value={contextValue}>
            <HvListContainer condensed {...getListboxProps()}>
              {children}
            </HvListContainer>
          </SelectProvider>
        </HvDropdownPanel>
      </Popper>

      <input {...getHiddenInputProps()} autoComplete={autoComplete} />

      {canShowError && (
        <HvWarningText id={errorId} disableBorder className={classes.error}>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
});
