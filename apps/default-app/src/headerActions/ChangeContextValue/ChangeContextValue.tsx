import { HvButton } from "@hitachivantara/uikit-react-core";
import { HazyDay } from "@hitachivantara/uikit-react-icons";
import { useContext } from "react";
import { DefaultAppContext } from "../../providers/DefaultAppProvider";

const ChangeContextValue = () => {
  const { setText } = useContext(DefaultAppContext);

  const handleClick = () =>
    setText("Change default-app context value from default-app");

  return (
    <HvButton
      icon
      onClick={handleClick}
      variant="secondaryGhost"
      aria-label="Change default-app context value from default-app">
      <HazyDay />
    </HvButton>
  );
};

export default ChangeContextValue;
