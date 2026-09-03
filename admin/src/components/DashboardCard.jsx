export default function DashboardCard({
    title,
    value,
    icon,
  }) {
    return (
      <div className="card">
        <div className="card-icon">{icon}</div>
  
        <h3>{title}</h3>
  
        <h1>{value}</h1>
      </div>
    );
  }