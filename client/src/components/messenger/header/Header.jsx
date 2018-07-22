import React from "react";
import MdDonutLarge from "react-icons/lib/md/donut-large";
import "../../../css/messageApp/header/header.css";

const Header = () => (
  <div className="header-wrap">
    <div className="header-icon header-icon__logo">
      <MdDonutLarge size={24} color="rgba(0, 90, 230, 0.85)" />
    </div>
  </div>
);

export default Header;
