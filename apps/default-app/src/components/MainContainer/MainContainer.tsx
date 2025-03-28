import { HvContainer } from "@hitachivantara/uikit-react-core";

import useStyles from "./styles";

const MainContainer = ({ children }) => {
  const classes = useStyles();

  return <HvContainer className={classes.container}>{children}</HvContainer>;
};

export default MainContainer;
