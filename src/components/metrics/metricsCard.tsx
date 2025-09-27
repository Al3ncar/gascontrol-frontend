import "../../scss/styles/components/metric.scss";

const MetricCard = ({ title, value, change, icon, id }: any) => (
  <div id={`card-${id}`} className="metric-card">
    <div className="metric-header">
      <span className="metric-icon">{icon}</span>
      <div className={`metric-change ${change >= 0 ? "positive" : "negative"}`}>
        {change >= 0 ? "↗" : "↘"} {change >= 0 ? "Aumentou: " : "Redução: "}
        {Math.abs(change)}%
      </div>
    </div>
    <div className="metric-value">
      <h3>{title}</h3>
    </div>
    <div className="metric-value">{value}</div>
  </div>
);

export default MetricCard;
