import { OptionGroup, OptionGroupProps } from "@mui/base/OptionGroup";
import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";
import { useDefaultProps } from "../hooks/useDefaultProps";

const { staticClasses, useClasses } = createClasses("HvOption", {
  root: {
    listStyle: "none",
    ...theme.typography.label,
  },
});

export { staticClasses as optionGroupClasses };

export const HvOptionGroup = (props: OptionGroupProps<any>) => {
  const {
    className,
    classes: classesProp,
    ...others
  } = useDefaultProps("HvOptionGroup", props);
  const { classes, cx } = useClasses(classesProp);

  return <OptionGroup className={cx(classes.root, className)} {...others} />;
};
