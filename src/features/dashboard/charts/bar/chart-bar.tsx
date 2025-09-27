// components/Charts/BarChart.jsx
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../charts-config";
import "../../../../scss/styles/components/charts.scss"

const BarChart = ({ title, data }) => {
  const options = {
    chart: {
      type: "column",
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
        text: "Valor (R$)",
      },
    },
    series: [
      {
        name: "Receita",
        data: data.map((item) => item.receita),
        color: "#2563eb",
      },
      {
        name: "Meta",
        data: data.map((item) => item.meta),
        color: "#10b981",
      },
    ],
    plotOptions: {
      column: {
        borderRadius: 4,
        pointPadding: 0.1,
        groupPadding: 0.1,
      },
    },
    credits: {
      enabled: false,
    },
  };

  const totalReceita = data.reduce((sum, item) => sum + item.receita, 0);
  const totalMeta = data.reduce((sum, item) => sum + item.meta, 0);
  const percentualAtingido = ((totalReceita / totalMeta) * 100).toFixed(1);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="chart-actions">
          <button className="chart-filter active">Mensal</button>
          <button className="chart-filter">Trimestral</button>
        </div>
      </div>

      <div className="chart-wrapper">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

      <div className="chart-metrics">
        <div className="chart-metric">
          <div className="value">R$ {(totalReceita / 1000).toFixed(1)}k</div>
          <div className="label">Receita Total</div>
        </div>
        <div className="chart-metric">
          <div className="value">+12%</div>
          <div className="label">Crescimento</div>
        </div>
        <div className="chart-metric">
          <div className="value">{percentualAtingido}%</div>
          <div className="label">Meta Atingida</div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
