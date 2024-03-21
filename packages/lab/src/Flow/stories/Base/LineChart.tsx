import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const LineChart: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      description="LineChart description"
      group="insights"
      groupItem="lineChart"
      inputs={[
        {
          label: "Data",
          isMandatory: true,
          accepts: ["prediction", "detection"],
          maxConnections: 1,
        },
      ]}
      outputs={[
        {
          label: "Insight",
          isMandatory: true,
          provides: "lineChart",
        },
      ]}
      {...props}
    />
  );
};
