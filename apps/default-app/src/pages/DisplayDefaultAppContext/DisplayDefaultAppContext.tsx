import {
  HvGlobalActions,
  HvGrid,
  HvTypography,
  theme
} from "@hitachivantara/uikit-react-core";
import { useContext } from "react";
import { DefaultAppContext } from "providers/DefaultAppProvider";

const DisplayDefaultAppContext = () => {
  const { text } = useContext(DefaultAppContext);

  return (
    <>
      <HvGlobalActions
        title="Display default-app context value"
        style={{ marginBottom: theme.space.xs }}
      />

      <HvGrid container>
        <HvGrid item xs={12} display="flex">
          <HvTypography variant="label">{text}</HvTypography>
        </HvGrid>
      </HvGrid>
    </>
  );
};

export default DisplayDefaultAppContext;
