import ResourceMap from "../components/ResourceMap";

const MapPage = ({ resources, userLocation }) => {
  return (
    <section>
      <h2>Interactive Resource Map</h2>
      <p className="muted">
        Use this map to locate nearby hospitals, shelters, and police stations in real time.
      </p>
      <ResourceMap resources={resources} userLocation={userLocation} />
    </section>
  );
};

export default MapPage;
