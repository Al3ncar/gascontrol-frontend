import "../../scss/styles/components/metric.scss";

const MetricCard = ({ title, value, change, icon, id }: any) => (
  <div id={`card-${id}`} className="metric-card">
    <div className="metric-header">
      <span className="metric-icon">{icon}</span>
      <h3>{title}</h3>
    </div>
    <div className="metric-value">{value}</div>
    <div className={`metric-change ${change >= 0 ? "positive" : "negative"}`}>
      {change >= 0 ? "↗" : "↘"} {Math.abs(change)}%
    </div>
  </div>
);

export default MetricCard;
