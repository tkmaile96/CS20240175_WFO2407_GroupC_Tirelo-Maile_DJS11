import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleSidebar = () => setIsOpen(!isOpen);
 
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Menu"}
      </button>
      <div className="sidebar-content">
        <nav>
          <ul>
           <button>A-Z</button>
          </ul>
        </nav>
        <footer>
          <p>© 2024 Podcast App</p>
        </footer>
      </div>
    </div>
  );
};

export default Sidebar;
