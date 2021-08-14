import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <div className="header-top">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/characters">Characters</Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
