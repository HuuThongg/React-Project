import "./Chart.css";
import ChartBar from "./ChartBar";
const Chart = (props) => {
   const dataPointValues = props.dataPoints.map(datapoint => datapoint.value)
   const totalMax = Math.max(...dataPointValues);
   return (
      <div className="chart">
         {props.dataPoints.map((datapoint) => (
         <ChartBar
            key = {datapoint.label}
            value={datapoint.value}
            maxValue={totalMax}
            label={datapoint.label}
         />
         ))}
      </div>
   );
};
export default Chart;
