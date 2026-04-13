import { useMemo } from "react";
import AlertCard from "../components/AlertCard";
import ResourceCard from "../components/ResourceCard";

const DashboardPage = ({ alerts, resources }) => {
  const highAlerts = useMemo(() => alerts.filter((item) => item.severity === "High").slice(0, 3), [alerts]);

  return (
    <section>
      <h2>Emergency Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <p className="muted">Total Alerts</p>
          <h3>{alerts.length}</h3>
        </div>
        <div className="stat-card">
          <p className="muted">High Severity Alerts</p>
          <h3>{highAlerts.length}</h3>
        </div>
        <div className="stat-card">
          <p className="muted">Available Resources</p>
          <h3>{resources.filter((resource) => resource.availability === "available").length}</h3>
        </div>
      </div>

      <h3>Critical Alerts</h3>
      <div className="grid">
        {highAlerts.length ? (
          highAlerts.map((alert) => <AlertCard key={alert._id} alert={alert} />)
        ) : (
          <p className="muted">No high severity alerts right now.</p>
        )}
      </div>

      <h3>Recent Resources</h3>
      <div className="grid">
        {resources.slice(0, 3).map((resource) => (
          <ResourceCard key={resource._id} resource={resource} />
        ))}
      </div>
    </section>
  );
};

export default DashboardPage;
