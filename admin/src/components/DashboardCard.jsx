export default function DashboardCard({
  title,
  value,
  icon,
  accent = "saffron",
}) {
  return (
    <div className={`card card-accent-${accent}`}>
      <div className="card-top">
        <span className="card-title">{title}</span>
        <div className="card-icon-bubble">{icon}</div>
      </div>
      <div className="card-bottom">
        <h2 className="card-value">{value}</h2>
        <span className="card-badge">Updated Live</span>
      </div>
    </div>
  );
}