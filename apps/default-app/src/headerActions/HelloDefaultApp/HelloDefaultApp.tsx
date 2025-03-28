import { HvButton } from "@hitachivantara/uikit-react-core";
import { Great } from "@hitachivantara/uikit-react-icons";

const HelloDefaultApp = () => {
  const handleClick = () => {
    alert("Hello from the Default App");
  };

  return (
    <HvButton
      icon
      onClick={handleClick}
      variant="secondaryGhost"
      aria-label="Hello from the Default App">
      <Great />
    </HvButton>
  );
};

export default HelloDefaultApp;
