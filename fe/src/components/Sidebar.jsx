import { NavLink } from "react-router-dom";
import CreateTracker from "./Trackers/CreateTracker";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="nav" id="nav">
        <NavLink to="/" className="button">
          Relic Trackers
        </NavLink>
        <NavLink to="/progress" className="button">
          Total Progress
        </NavLink>
      </nav>
      <section className="section">
        <CreateTracker />
      </section>
    </aside>
  );
};

export default Sidebar;
