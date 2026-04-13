import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { api } from "./api/api";
import AlertsPage from "./pages/AlertsPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage";
import ResourcesPage from "./pages/ResourcesPage";
import SignupPage from "./pages/SignupPage";
import Sidebar from "./components/Sidebar";
import SOSButton from "./components/SOSButton";
import SOSModal from "./components/SOSModal";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user, isAdmin } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [resources, setResources] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sosOpen, setSosOpen] = useState(false);
  const [nearestResources, setNearestResources] = useState([]);
  const [notice, setNotice] = useState("");
  const previousAlertCount = useRef(0);

  const fetchAlerts = async () => {
    const { data } = await api.get("/alerts");
    setAlerts(data);

    if (previousAlertCount.current && data.length > previousAlertCount.current) {
      setNotice("New disaster alert received.");
      setTimeout(() => setNotice(""), 3500);
    }
    previousAlertCount.current = data.length;
  };

  const fetchResources = async (type = "") => {
    const { data } = await api.get("/resources", {
      params: type ? { type } : {}
    });
    setResources(data);
  };

  const fetchInitialData = async () => {
    try {
      await Promise.all([fetchAlerts(), fetchResources()]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.warn("Geolocation unavailable:", error.message);
      }
    );
  }, []);

  const createAlert = async (payload) => {
    await api.post("/alerts", payload);
    await fetchAlerts();
  };

  const deleteAlert = async (id) => {
    await api.delete(`/alerts/${id}`);
    await fetchAlerts();
  };

  const createResource = async (payload) => {
    await api.post("/resources", payload);
    await fetchResources();
  };

  const deleteResource = async (id) => {
    await api.delete(`/resources/${id}`);
    await fetchResources();
  };

  const openSos = async () => {
    if (!userLocation) {
      setSosOpen(true);
      return;
    }

    const { data } = await api.get("/resources/nearest", {
      params: {
        latitude: userLocation[0],
        longitude: userLocation[1],
        limit: 5
      }
    });
    setNearestResources(data);
    setSosOpen(true);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader" />
        <p>Loading emergency dashboard...</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content">
        {notice && <div className="notice">{notice}</div>}
        <Routes>
          <Route path="/" element={<DashboardPage alerts={alerts} resources={resources} />} />
          <Route path="/map" element={<MapPage resources={resources} userLocation={userLocation} />} />
          <Route
            path="/alerts"
            element={
              <AlertsPage
                alerts={alerts}
                isAdmin={isAdmin}
                onCreateAlert={createAlert}
                onDeleteAlert={deleteAlert}
              />
            }
          />
          <Route
            path="/resources"
            element={
              <ResourcesPage
                resources={resources}
                isAdmin={isAdmin}
                onCreateResource={createResource}
                onDeleteResource={deleteResource}
                onFilter={fetchResources}
              />
            }
          />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignupPage />} />
        </Routes>
      </main>

      <SOSButton onClick={openSos} />
      <SOSModal open={sosOpen} onClose={() => setSosOpen(false)} nearestResources={nearestResources} />
    </div>
  );
};

export default App;
