import { Background, BackgroundProps } from "reactflow";
import { getColor, HvColorAny } from "@hitachivantara/uikit-styles";

export interface HvFlowBackgroundProps extends Omit<BackgroundProps, "color"> {
  /** Color for the background dots. Defaults to `secondary`. */
  color?: HvColorAny;
}

export const HvFlowBackground = (props: HvFlowBackgroundProps) => {
  const { color = "text", ...others } = props;
  return <Background color={getColor(color, "text")} {...others} />;
};
