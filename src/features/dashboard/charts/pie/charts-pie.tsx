// components/Charts/PieChart.jsx
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../charts-config";
import "../../../../scss/styles/components/charts.scss"


const PieChart = ({ title, data }) => {
  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "",
      align: "left",
    },
    series: [
      {
        name: "Dispositivos",
        data: data.map((item, index) => ({
          name: item.name,
          y: item.value,
          color: ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][index],
        })),
      },
    ],
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          style: {
            fontWeight: "500",
          },
        },
        showInLegend: true,
      },
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>{title}</h3>
      </div>
      <div className="chart-wrapper">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
