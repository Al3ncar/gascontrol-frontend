// components/Charts/HighchartsConfig.js
import Highcharts from "highcharts";

// Configuração global do tema Highcharts
Highcharts.setOptions({
  chart: {
    backgroundColor: "transparent",
    style: {
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    },
  },
  title: {
    style: {
      color: "#1a2035",
      fontSize: "16px",
      fontWeight: "600",
    },
  },
  subtitle: {
    style: {
      color: "#4a5568",
    },
  },
  xAxis: {
    lineColor: "#e2e8f0",
    tickColor: "#e2e8f0",
    labels: {
      style: {
        color: "#4a5568",
      },
    },
    title: {
      style: {
        color: "#4a5568",
      },
    },
  },
  yAxis: {
    gridLineColor: "#f1f5f9",
    lineColor: "#e2e8f0",
    tickColor: "#e2e8f0",
    labels: {
      style: {
        color: "#4a5568",
      },
    },
    title: {
      style: {
        color: "#4a5568",
      },
    },
  },
  legend: {
    itemStyle: {
      color: "#4a5568",
      fontWeight: "500",
    },
    itemHoverStyle: {
      color: "#1a2035",
    },
  },
  tooltip: {
    backgroundColor: "#1a2035",
    borderColor: "#1a2035",
    borderRadius: 6,
    style: {
      color: "#ffffff",
    },
  },
});

export default Highcharts;
