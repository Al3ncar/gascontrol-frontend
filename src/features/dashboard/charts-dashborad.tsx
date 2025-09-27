import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "../../scss/styles/dashboards/dashboard.scss";

const ChartDashboard = () => {
  const salesData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas 2024",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const userData = {
    labels: ["Mobile", "Desktop", "Tablet"],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="charts-container">
      <div className="chart-wrapper">
        <h3>Vendas Mensais</h3>
        <Line data={salesData} />
      </div>

      <div className="chart-wrapper">
        <h3>Dispositivos dos Usuários</h3>
        <Doughnut data={userData} />
      </div>
    </div>
  );
};

export default ChartDashboard;
