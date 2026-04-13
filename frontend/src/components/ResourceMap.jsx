import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

const ResourceMap = ({ userLocation, resources }) => {
  const center = useMemo(() => userLocation || [20.5937, 78.9629], [userLocation]);

  return (
    <MapContainer center={center} zoom={5} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && (
        <Marker position={userLocation}>
          <Popup>You are here.</Popup>
        </Marker>
      )}

      {resources.map((resource) => (
        <Marker key={resource._id} position={[resource.latitude, resource.longitude]}>
          <Popup>
            <strong>{resource.name}</strong>
            <br />
            Type: {resource.type}
            <br />
            Availability: {resource.availability}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ResourceMap;
