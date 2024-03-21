import {
  Cards,
  Cluster,
  MachineLearning,
  LineChartAlt,
} from "@hitachivantara/uikit-react-icons";
import { HvFlowProps } from "@hitachivantara/uikit-react-lab";
import { Modifier } from "@dnd-kit/core";

// The code for these components are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base
import { Dashboard } from "./Dashboard";
import { KPI } from "./KPI";
import { LineChart } from "./LineChart";
import { MLModel } from "./MLModel";
import { Table } from "./Table";
import { Asset } from "./Asset";

const predefinedLayout = {
  items: [
    {
      id: "kpi1",
      type: "kpi",
      label: "KPI 1",
      predefined: true,
    },
    {
      id: "kpi2",
      type: "kpi",
      label: "KPI 2",
      predefined: true,
    },
    {
      id: "kpi3",
      type: "kpi",
      label: "KPI 3",
      predefined: true,
    },
    {
      id: "lineChart1",
      type: "lineChart",
      label: "Line Chart 1",
      predefined: true,
    },
    {
      id: "lineChart2",
      type: "lineChart",
      label: "Line Chart 2",
      predefined: true,
    },
    {
      id: "table1",
      type: "table",
      label: "Table 1",
      predefined: true,
    },
    {
      id: "table2",
      type: "table",
      label: "Table 2",
      predefined: true,
    },
  ],
  layout: [
    { w: 4, h: 1, x: 0, y: 0, i: "kpi1" },
    { w: 4, h: 1, x: 4, y: 0, i: "kpi2" },
    { w: 4, h: 1, x: 8, y: 0, i: "kpi3" },

    { w: 6, h: 2, x: 0, y: 1, i: "lineChart1" },
    { w: 6, h: 2, x: 6, y: 1, i: "lineChart2" },

    { w: 6, h: 2, x: 0, y: 3, i: "table1" },
    { w: 6, h: 2, x: 6, y: 3, i: "table2" },
  ],
};

export const nodeGroups = {
  assets: {
    label: "Asset",
    color: "cat3_80",
    description: "Find here all the available assets.",
    icon: <Cluster />,
    items: {
      asset: {
        type: "asset",
        label: "Asset",
        data: {
          asset: "option1",
        },
      },
    },
  },
  models: {
    label: "ML Model",
    color: "cat1_80",
    description: "Find here all the available ML models.",
    icon: <MachineLearning />,
    items: {
      prediction: {
        type: "model",
        label: "ML Model Prediction",
        data: { type: "prediction" },
      },
      detection: {
        type: "model",
        label: "ML Model Detection",
        data: { type: "detection" },
      },
    },
  },
  insights: {
    label: "Insight",
    color: "cat6_80",
    description: "Find here all the available insights.",
    icon: <LineChartAlt />,
    items: {
      kpi: { type: "kpi", label: "KPI" },
      lineChart: { type: "lineChart", label: "Line Chart" },
      table: { type: "table", label: "Table" },
    },
  },
  dashboards: {
    label: "Dashboard",
    color: "cat2_80",
    description: "Find here all the available dashboards.",
    icon: <Cards />,
    items: {
      dashboard: {
        type: "dashboard",
        label: "Dashboard",
        data: {
          config: {
            cols: 12,
            ...predefinedLayout,
          },
        },
      },
    },
  },
} satisfies HvFlowProps["nodeGroups"];

export type NodeGroup = keyof typeof nodeGroups;

export const nodeTypes: HvFlowProps["nodeTypes"] = {
  asset: Asset,
  model: MLModel,
  kpi: KPI,
  lineChart: LineChart,
  table: Table,
  dashboard: Dashboard,
} satisfies HvFlowProps["nodeTypes"];

export type NodeType = keyof typeof nodeTypes;

// Fixes a problem we have while dragging node types from the sidebar to the flow in storybook docs mode
type RestrictToSampleModifier = Modifier extends (...args: infer A) => infer R
  ? (rootId: string, ...args: A) => R
  : unknown;

export const restrictToSample: RestrictToSampleModifier = (
  rootId,
  { transform }
) => {
  const rect = document.getElementById(rootId)?.getBoundingClientRect();

  const docsMode = window.location.search.includes("?viewMode=docs");

  return {
    ...transform,
    x: docsMode && rect?.x ? -rect.x + transform.x : transform.x,
    y: docsMode && rect?.y ? -rect.y + transform.y : transform.y,
  };
};
