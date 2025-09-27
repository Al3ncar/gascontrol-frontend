// components/Charts/AreaChart.jsx
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../charts-config";
import "../../../../scss/styles/components/charts.scss"

const AreaChart = ({ title, data }) => {
  const options = {
    chart: {
      type: "areaspline",
    },
    title: {
      text: "",
      align: "left",
    },
    xAxis: {
      categories: data.map((item) => item.name),
    },
    yAxis: {
      title: {
        text: "Crescimento (%)",
      },
    },
    series: [
      {
        name: "Crescimento",
        data: data.map((item) => item.crescimento),
        color: "#2563eb",
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(37, 99, 235, 0.3)"],
            [1, "rgba(37, 99, 235, 0.05)"],
          ],
        },
        lineWidth: 3,
        marker: {
          radius: 4,
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="chart-actions">
          <button className="chart-filter active">2024</button>
          <button className="chart-filter">2023</button>
        </div>
      </div>

      <div className="chart-wrapper">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default AreaChart;
