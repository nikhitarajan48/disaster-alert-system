import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar glass-card">
      <h1>Disaster Assist</h1>
      <p className="muted">{user ? `Hi, ${user.username}` : "Community Safety Dashboard"}</p>

      <nav className="nav-list">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/map" className={linkClass}>
          Map
        </NavLink>
        <NavLink to="/alerts" className={linkClass}>
          Alerts
        </NavLink>
        <NavLink to="/resources" className={linkClass}>
          Resources
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        {user ? (
          <button type="button" className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="btn btn-secondary">
            Login
          </NavLink>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
