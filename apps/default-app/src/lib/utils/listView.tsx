import {
  HvCellProps,
  HvTableColumnConfig,
  HvTooltip,
  HvTypography
} from "@hitachivantara/uikit-react-core";
import {
  Level0Good,
  Level1,
  Level2Average,
  Level3Bad,
  Refresh
} from "@hitachivantara/uikit-react-icons";

interface Entry {
  name: string;
  description: string;
}

const entries = [
  { name: "Previous", description: "Clean Data Logs" },
  { name: "Home", description: "Review Log" },
  { name: "Carriage", description: "Deploy Cloud Run" },
  { name: "Black", description: "Clean Session" },
  { name: "Forward", description: "Update Build" }
];

const getDate = entryIndex => {
  const date = new Date(2023, 1, entryIndex);

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`;
};

const getStatus = entryIndex => {
  return Math.floor(entryIndex * 4);
};

const getServerID = entryIndex =>
  Math.floor(100000000 + entryIndex * 1000000000);

const getBuild = entryIndex => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 6; i += 1) {
    result += characters.charAt(Math.floor(entryIndex + i));
  }
  return result;
};

const getRandEntry = (localEntries: Entry[], entryIndex: number) =>
  localEntries[entryIndex % localEntries.length];

const getNewEntry = (i: number) => {
  const entry = getRandEntry(entries, i);
  return {
    id: `${i + 1}`,
    name: entry.name,
    description: entry.description,
    serverId: getServerID(i),
    created: getDate(i),
    build: getBuild(i),
    status: getStatus(i)
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

export const getStatusIcon = (status: number) => {
  switch (status) {
    case 0:
      return <Level0Good semantic="sema1" iconSize="XS" />;
    case 1:
      return <Level3Bad semantic="sema4" iconSize="XS" />;
    case 2:
      return <Level2Average semantic="sema3" iconSize="XS" />;
    default:
      return <Level1 semantic="sema2" iconSize="XS" />;
  }
};

export const getColumns = (): HvTableColumnConfig<NewEntry>[] => [
  {
    Header: "Status",
    accessor: "status",
    style: { width: 40 },
    Cell: (cellData: HvCellProps<NewEntry>) => {
      const { row } = cellData;

      switch (row.original.status) {
        case 0:
          return (
            <HvTooltip title={<HvTypography>Success</HvTypography>}>
              <div>{getStatusIcon(0)}</div>
            </HvTooltip>
          );
        case 1:
          return (
            <HvTooltip title={<HvTypography>Error</HvTypography>}>
              <div>{getStatusIcon(1)}</div>
            </HvTooltip>
          );
        case 2:
          return (
            <HvTooltip title={<HvTypography>Open</HvTypography>}>
              <div>{getStatusIcon(2)}</div>
            </HvTooltip>
          );
        default:
          return (
            <HvTooltip title={<HvTypography>Unassigned</HvTypography>}>
              <div>{getStatusIcon(3)}</div>
            </HvTooltip>
          );
      }
    }
  },
  { Header: "Name", accessor: "name", style: { minWidth: 200 } },
  { Header: "Description", accessor: "description", style: { minWidth: 200 } },
  { Header: "Server ID", accessor: "serverId", style: { width: 120 } },
  { Header: "Created", accessor: "created" },
  { Header: "Build", accessor: "build", style: { width: 120 } }
];

export type NewEntry = {
  id: string;
  name: string;
  description: string;
  serverId: number;
  created: string;
  build: string;
  status: number;
};

export const actions = [{ id: "refresh", label: "Refresh", icon: <Refresh /> }];
