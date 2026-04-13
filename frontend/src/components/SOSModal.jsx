import ResourceCard from "./ResourceCard";

const emergencyContacts = [
  { label: "National Emergency", value: "112" },
  { label: "Fire Service", value: "101" },
  { label: "Ambulance", value: "108" },
  { label: "Police", value: "100" }
];

const SOSModal = ({ open, onClose, nearestResources }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal glass-card" onClick={(event) => event.stopPropagation()}>
        <h2>Emergency Assistance</h2>
        <p className="muted">Here are emergency contacts and your nearest resources.</p>

        <div className="contact-grid">
          {emergencyContacts.map((contact) => (
            <div className="contact-item" key={contact.label}>
              <span>{contact.label}</span>
              <a href={`tel:${contact.value}`}>{contact.value}</a>
            </div>
          ))}
        </div>

        <h3>Nearest Resources</h3>
        <div className="grid">
          {nearestResources.length ? (
            nearestResources.map((resource) => <ResourceCard key={resource._id} resource={resource} />)
          ) : (
            <p className="muted">No nearby resources found.</p>
          )}
        </div>

        <button type="button" className="btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SOSModal;
