import { SelectOption } from "@mui/base/useOption";
import { SelectValue } from "@mui/base/useSelect";

export function defaultRenderValue<Value>(
  options: SelectOption<Value> | SelectOption<Value>[] | null
) {
  if (Array.isArray(options)) {
    if (options.length === 0) return null;
    return <>{options.map((o) => o.label).join(", ")}</>;
  }

  return options?.label ?? null;
}

export function isMultiSelect<Value extends {}>(
  value: SelectValue<Value, boolean>,
  multiple?: boolean
): value is SelectValue<Value, true> {
  return !!multiple;
}
