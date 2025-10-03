import "../../scss/styles/components/sidebar.scss";
import GasLogo from "../../assets/logo/logo-1.png";
import { useState } from "react";

const Sidebar = ({
  isOpen,
  menuItems,
  activeItem,
  onChangeState = () => {},
}) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleSubMenu = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const hasSubItems = (item) => {
    return item.subItems && item.subItems.length > 0;
  };

  const renderMenuItem = (item, level = 0) => {
    const isExpanded = expandedItems[item.id];
    const hasSubs = hasSubItems(item);
    const isActive = activeItem === item.id;
    return (
      <div key={item.id} className="menu-item-wrapper">
        <a
          // href={item.path}
          className={`nav-item ${isActive ? "active" : ""} ${
            hasSubs ? "has-submenu" : ""
          } level-${level}`}
          onClick={(e) => {
            onChangeState(item.id);
            if (hasSubs) {
              e.preventDefault();
              toggleSubMenu(item.id);
            }
          }}
        >
          <span>{item.icon}</span>
          <span className="nav-label">{item.label}</span>
          {hasSubs && (
            <span className={`submenu-arrow ${isExpanded ? "expanded" : ""}`}>
              {isOpen ? "▼" : "›"}
            </span>
          )}
        </a>

        {hasSubs && isExpanded && isOpen && (
          <div className="submenu">
            {item.subItems.map((subItem) => renderMenuItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-topbar">
        <div className="topbar-user">
          <div className="user-avatar">
            <span>A</span>
          </div>
          <div className="user-info">
            <span className="user-name">Usuário</span>
            <span className="user-role">Administrador</span>
          </div>
        </div>

        <div className="topbar-actions">
          <button className="action-btn">
            <span>🔔</span>
            {isOpen && <span className="notification-badge">3</span>}
          </button>
          <button className="action-btn">
            <span>⚙️</span>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="sidebar-logo">
          <img src={GasLogo} alt="Gas Control Logo" />
        </div>
      )}

      <div className="sidebar-content">
        {menuItems.map((item) => renderMenuItem(item))}
      </div>
    </div>
  );
};

export default Sidebar;
