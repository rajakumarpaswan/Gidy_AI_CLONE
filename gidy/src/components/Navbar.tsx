import { useState } from "react";
import "./Navbar.css";
import { IconMenu2 } from "@tabler/icons-react";

import ThemeToggle from "./ThemeToggle";




const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
    //  const { theme, toggleTheme } = useTheme();


   

  return (
    <div className="navbar">

      {/* HAMBURGER */}
      <div
        className="nav-left"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <IconMenu2 size={24} />
      </div>

      {/* LOGO */}
      <div className="nav-logo">
        <span className="logo-icon">◈</span> Gidy
      </div>

      {/* MENU */}
      <div className={`ul-list ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>Jobs</li>
          <li>Hackathons</li>
          <li>Projects</li>
          <li>Tasks</li>
          <li>Organizations</li>
        </ul>
      </div>

      {/* PROFILE */}
      <div className="nav-right">

            <ThemeToggle />
        <div className="avatar-small">R</div>
        <span className="mobile-dropdown">▼</span>
      </div>

    </div>
  );
};

export default Navbar;