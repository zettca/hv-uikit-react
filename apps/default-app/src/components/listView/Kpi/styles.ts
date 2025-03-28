import { makeStyles } from "@mui/styles";

import { theme } from "@hitachivantara/uikit-react-core";

const styles = makeStyles({
  container: {
    padding: theme.spacing("sm")
  },
  card: {
    cursor: "pointer"
  },
  title: {
    margin: `${theme.spacing("xs")} 0`
  },
  content: {
    display: "flex",
    alignItems: "center"
  },
  variation: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  selected: {
    outline: `1px solid ${theme.colors.atmo1}`
  }
});

export default styles;
