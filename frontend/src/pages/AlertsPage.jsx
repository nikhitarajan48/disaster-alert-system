import { useState } from "react";
import AlertCard from "../components/AlertCard";

const defaultForm = {
  title: "",
  description: "",
  location: "",
  severity: "Low"
};

const AlertsPage = ({ alerts, isAdmin, onCreateAlert, onDeleteAlert }) => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await onCreateAlert(form);
    setForm(defaultForm);
    setLoading(false);
  };

  return (
    <section>
      <h2>Disaster Alerts</h2>

      {isAdmin && (
        <form className="glass-card form-grid" onSubmit={handleSubmit}>
          <h3>Add Alert</h3>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
          <select name="severity" value={form.severity} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Create Alert"}
          </button>
        </form>
      )}

      <div className="grid">
        {alerts.map((alert) => (
          <div key={alert._id}>
            <AlertCard alert={alert} />
            {isAdmin && (
              <button type="button" className="btn btn-danger" onClick={() => onDeleteAlert(alert._id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlertsPage;
