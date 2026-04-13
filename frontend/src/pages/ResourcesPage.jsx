import { useMemo, useState } from "react";
import ResourceCard from "../components/ResourceCard";

const defaultForm = {
  name: "",
  type: "hospital",
  latitude: "",
  longitude: "",
  availability: "available"
};

const ResourcesPage = ({ resources, isAdmin, onCreateResource, onDeleteResource, onFilter }) => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = useMemo(
    () => resources.filter((resource) => (typeFilter ? resource.type === typeFilter : true)),
    [resources, typeFilter]
  );

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    await onCreateResource({
      ...form,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude)
    });
    setForm(defaultForm);
    setLoading(false);
  };

  const handleFilter = async (event) => {
    const value = event.target.value;
    setTypeFilter(value);
    await onFilter(value);
  };

  return (
    <section>
      <h2>Resource Mapping</h2>
      <div className="filter-row">
        <label htmlFor="resource-type">Filter by type:</label>
        <select id="resource-type" value={typeFilter} onChange={handleFilter}>
          <option value="">All</option>
          <option value="hospital">Hospital</option>
          <option value="shelter">Relief Camp</option>
          <option value="police">Police Station</option>
        </select>
      </div>

      {isAdmin && (
        <form className="glass-card form-grid" onSubmit={submitForm}>
          <h3>Add Resource</h3>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="hospital">Hospital</option>
            <option value="shelter">Relief Camp</option>
            <option value="police">Police Station</option>
          </select>
          <input
            name="latitude"
            type="number"
            step="any"
            value={form.latitude}
            onChange={handleChange}
            placeholder="Latitude"
            required
          />
          <input
            name="longitude"
            type="number"
            step="any"
            value={form.longitude}
            onChange={handleChange}
            placeholder="Longitude"
            required
          />
          <select name="availability" value={form.availability} onChange={handleChange}>
            <option value="available">Available</option>
            <option value="limited">Limited</option>
            <option value="full">Full</option>
          </select>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Create Resource"}
          </button>
        </form>
      )}

      <div className="grid">
        {filtered.map((resource) => (
          <div key={resource._id}>
            <ResourceCard resource={resource} />
            {isAdmin && (
              <button type="button" className="btn btn-danger" onClick={() => onDeleteResource(resource._id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResourcesPage;
