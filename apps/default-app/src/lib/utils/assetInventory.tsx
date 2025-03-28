import {
  Cards,
  List,
  Level0Good,
  Level1,
  Level2Average,
  Level3Bad,
  Add,
  Delete,
  Preview
} from "@hitachivantara/uikit-react-icons";

// Data Utils

const getOption = (opts: string[], i: number) => opts[i % opts.length];

const getTime = (priority: string, index: number) => {
  let i = priority === "High" ? index + 4 : index + 3;
  i = priority === "Medium" ? i + 30 : index + 20;
  return `${i % 12}:${i % 60}:${i % 60}`;
};

const getPriority = (i: number) =>
  (i % 2 > 0 && "High") || (i % 2 < 0 && "Medium") || "Low";

const getStatusColor = (status, severity) => {
  if (status === "Open") {
    switch (severity) {
      case "Critical":
        return "catastrophic";
      case "Major":
        return "warning_120";
      case "Average":
        return "warning_20";
      case "Minor":
        return "warning";
      default:
        return "neutral";
    }
  }
  switch (severity) {
    case "Critical":
      return "sema13";
    case "Major":
      return "sema12";
    case "Average":
      return "sema11";
    case "Minor":
      return "sema10";
    default:
      return "sema6";
  }
};

const getNewEntry = (i: number) => {
  const status = getOption(["Closed", "Open"], i);
  const severity = getOption(["Critical", "Major", "Average", "Minor"], i);

  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    eventType: `Anomaly detection ${i % 4}`,
    status,
    severity,
    priority: getPriority(i),
    time: getTime(getPriority(i), i),
    temperature: `${i + 35}`,
    statusColor: getStatusColor(status, severity)
  };
};

export const makeData = (len = 10) => {
  const data: Array<any> = [];
  for (let i = 0; i <= len; i += 1) {
    data.push(getNewEntry(i));
  }
  return data;
};

// Config Utils

export const getColumns = () => [
  { Header: "Title", accessor: "name", style: { minWidth: 220 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { width: 120 } },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
  { Header: "Time", accessor: "time" },
  { Header: "Temperature", accessor: "temperature" }
];

export const getStatusIcon = (color: string) => {
  switch (color) {
    case "sema1":
      return <Level0Good semantic="sema1" />;
    case "sema2":
      return <Level1 semantic="sema2" />;
    case "sema3":
      return <Level2Average semantic="sema3" />;
    case "sema4":
      return <Level3Bad semantic="sema4" />;
    default:
      return undefined;
  }
};

export const actions = [
  { id: "add", label: "Add", icon: <Add /> },
  { id: "delete", label: "Delete", icon: <Delete /> },
  { id: "put", label: "Preview", icon: <Preview /> }
];

export const views = [
  { id: "card", label: "Select card view", icon: <Cards /> },
  { id: "list", label: "Select list view", icon: <List /> }
];

export const idsToControl = {
  cards: "cardsGrid",
  list: "itemList"
};
