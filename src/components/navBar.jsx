import React, { useState } from "react";
import { IoIosHome, IoIosSearch, IoMdMenu } from "react-icons/io";
import SideBar from "./sideBar";

function NavBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [menuButton, setMenuButton] = useState("Menu");

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
    setMenuButton(showSideBar ? "Menu" : "Fermer");
  };

  return (
    <div className="content-body">
      <div className="navBar-wrapper">
        <div className="SearchBar-left">
          <button className="MenuButton" onClick={toggleSideBar}>
            <div className="menuIcons">
              <IoMdMenu />
            </div>
            <p>{menuButton}</p>
          </button>

          <div className="Input">
            <div className="searchIcon">
              <IoIosSearch />
            </div>
            <input className="search" type="text" placeholder="search" />
          </div>
        </div>
        <div className="WebsiteTitle">
          <p>E-Com Raph</p>
        </div>
        <div className="navBar-utilities">
          <div className="navIcons">
            <IoIosHome />
          </div>
          <div className="Utilities">
            <p>Home</p>
          </div>
          <div className="Utilities">
            <p>About</p>
          </div>
          <div className="Utilities">Login</div>
          <div className="Utilities">Log-out</div>
        </div>
      </div>

      {showSideBar && <SideBar />}
    </div>
  );
}

export default NavBar;
