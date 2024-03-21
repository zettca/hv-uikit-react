import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

import { data } from "./data";

export const Precipitation: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      description="Precipitation data"
      group="sources"
      groupItem="precipitation"
      expanded
      params={[
        {
          id: "country",
          label: "Country",
          type: "select",
          options: Object.keys(data).map((key) => ({
            id: key,
            label: key,
          })),
        },
      ]}
      outputs={[
        {
          label: "Data",
          isMandatory: true,
          provides: "data",
        },
      ]}
      {...props}
    />
  );
};
