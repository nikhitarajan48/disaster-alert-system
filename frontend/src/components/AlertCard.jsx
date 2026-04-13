const AlertCard = ({ alert }) => {
  return (
    <article className="card alert-card">
      <div className="card-header">
        <h3>{alert.title}</h3>
        <span className={`severity severity-${alert.severity.toLowerCase()}`}>{alert.severity}</span>
      </div>
      <p>{alert.description}</p>
      <p className="muted">
        <strong>Location:</strong> {alert.location}
      </p>
      <p className="muted">
        <strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}
      </p>
    </article>
  );
};

export default AlertCard;
