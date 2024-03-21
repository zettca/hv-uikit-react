import { useMemo } from "react";
import {
  HvFlowNode,
  HvFlowNodeProps,
  HvFlowNodeFC,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";

import { NodeData } from "../types";

export const LineChart: HvFlowNodeFC = (props) => {
  const inputNodes = useFlowInputNodes<NodeData>();

  const params: HvFlowNodeProps["params"] = useMemo(() => {
    const columns = inputNodes[0]?.data.columns;

    return columns
      ? [
          { label: "Title", id: "title", type: "text" },
          {
            label: "Measure",
            id: "measure",
            type: "select",
            options: columns,
            multiple: true,
          },
          {
            label: "Group by",
            id: "groupBy",
            type: "select",
            options: columns,
            multiple: true,
          },
          {
            label: "Split by",
            id: "splitBy",
            type: "select",
            options: columns,
            multiple: true,
          },
        ]
      : undefined;
  }, [inputNodes]);

  return (
    <HvFlowNode
      description="Line Chart"
      group="visualization"
      groupItem="lineChart"
      params={params}
      expanded
      inputs={[
        {
          label: "Dataset",
          isMandatory: true,
          accepts: ["dataset"],
          maxConnections: 1,
        },
      ]}
      outputs={[
        {
          label: "Visualization",
          isMandatory: true,
          provides: "visualizations",
        },
      ]}
      {...props}
    />
  );
};
