import "../../scss/styles/components/sidebar.scss";
import GasLogo from "../../assets/logo/logo-1.png";

const Sidebar = ({ isOpen, menuItems, activeItem }) => (
  <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
    <div className="sidebar-logo">
      <img src={GasLogo} alt="Gas Control Logo" />
    </div>
    
    <div className="sidebar-content">
      {menuItems.map((item) => (
        <a
          key={item.id}
          href={item.path}
          className={`nav-item ${activeItem === item.id ? "active" : ""}`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  </div>
);

export default Sidebar;
