import Chart from "react-google-charts";

const getTrendData = (variation: string) => {
  if (variation === "up") {
    return [
      ["Count", "Requests"],
      ["1", 200],
      ["2", 500],
      ["3", 1000],
      ["4", 2000]
    ];
  }
  return [
    ["Count", "Requests"],
    ["1", 2000],
    ["2", 1000],
    ["3", 500],
    ["4", 200]
  ];
};

interface IndicatorProps {
  variation: string;
}

const Indicator = ({ variation }: IndicatorProps) => (
  <div style={{ pointerEvents: "none", marginRight: -4 }}>
    <Chart
      width="50px"
      height="32px"
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={getTrendData(variation)}
      options={{
        legend: "none",
        colors: variation === "up" ? ["green"] : ["red"],
        tooltip: {
          trigger: "none"
        },
        hAxis: {
          minValue: 0,
          maxValue: 10,
          gridlines: {
            color: "transparent"
          },
          baselineColor: "transparent"
        },
        backgroundColor: "transparent",
        vAxis: {
          gridlines: {
            color: "transparent"
          },
          baselineColor: "transparent"
        }
      }}
    />
  </div>
);

export default Indicator;
