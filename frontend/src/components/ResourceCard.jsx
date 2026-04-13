const ResourceCard = ({ resource }) => {
  return (
    <article className="card">
      <h3>{resource.name}</h3>
      <p className="muted">
        <strong>Type:</strong> {resource.type}
      </p>
      <p className="muted">
        <strong>Availability:</strong> {resource.availability}
      </p>
      <p className="muted">
        <strong>Coordinates:</strong> {resource.latitude}, {resource.longitude}
      </p>
      {resource.distanceKm !== undefined && (
        <p className="muted">
          <strong>Distance:</strong> {resource.distanceKm.toFixed(2)} km
        </p>
      )}
    </article>
  );
};

export default ResourceCard;
