// components/Charts/LineChart.jsx
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../charts-config";
import "../../../../scss/styles/components/charts.scss"


const LineChart = ({ title, data }) => {
  const options = {
    title: {
      text: title,
      align: "left",
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
    },
    xAxis: {
      categories: data.map((item) => item.name),
    },
    series: [
      {
        name: "Usuários",
        data: data.map((item) => item.usuarios),
        color: "#2563eb",
        lineWidth: 3,
        marker: {
          radius: 4,
        },
      },
      {
        name: "Sessões",
        data: data.map((item) => item.sessões),
        color: "#10b981",
        lineWidth: 3,
        marker: {
          radius: 4,
        },
      },
    ],
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        marker: {
          fillColor: "#ffffff",
          lineWidth: 2,
          lineColor: null,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="chart-actions">
          <button className="chart-filter active">7d</button>
          <button className="chart-filter">30d</button>
          <button className="chart-filter">90d</button>
        </div>
      </div>

      <div className="chart-wrapper">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
