import Icon from "./Icon";

import "../css/Sidebar.css";

function Sidebar({ isOpen, onClose, initiatives = []}) {
  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>

        {/* Navigation */}
        <div className="sidebar-content">
          <h2 className="sidebar-title">Plan your own events!</h2>

          <div className="initiative-list">
            {initiatives.length > 0 && (
              initiatives.map((initiative) => (
                <button key={initiative.id} className="initiative-btn">
                  <img
                    src={initiative.image}
                    alt={initiative.name}
                    className="initiative-img"
                  />
                  {initiative.name}
                </button>
              ))
            )}

            <button className="new-page-btn">New Page</button>
          </div>


          <div className="section">
            <h3 className="section-title">Yours</h3>

            <nav className="nav-list">
              <NavItem icon={<Icon name="Bell" size={16} />} label="Notifications" />
              <NavItem icon={<Icon name="MapPin" size={16} />} label="Locations" />
              <NavItem icon={<Icon name="Hash" size={16} />} label="Tags" />
              <NavItem icon={<Icon name="Calendar" size={16} />} label="Events" />
              <NavItem icon={<Icon name="Heart" size={16} />} label="Subscriptions" />
              <NavItem icon={<Icon name="Ban" size={16} />} label="Blocked" />
            </nav>
          </div>

          <div className="section">
            <h3 className="section-title">MakeAScene</h3>

            <nav className="nav-list">
              <NavItem icon={<Icon name="BookOpen" size={16} />} label="User Guidelines" />
              <NavItem icon={<Icon name="Users" size={16} />} label="Send in your Ideas" />
              <NavItem icon={<Icon name="Tool" size={16} />} label="Report a Bug" />
              <NavItem icon={<Icon name="HelpCircle" size={16} />} label="Support us" />
              <NavItem icon={<Icon name="Users" size={16} />} label="Join our Discord" />
            </nav>
          </div>

        </div>
      </div>
    </>
  );
}

function NavItem({ icon, label }) {
  return (
    <button className="nav-item">
      <span className="nav-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default Sidebar;