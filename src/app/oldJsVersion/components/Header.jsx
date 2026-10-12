"use client";
import React, { useState, useEffect } from "react";
import '../css/Header.css'
import SearchIcon from "../assets/searchIcon.jsx";
import FilterIcon from "../assets/filterIcon.jsx";
const placeholder = "/images/image.png";


const Header = ({ activeSetting, setActiveSetting, onSidebarClick, onFilterbarClick }) => {
 
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  const navLinks = [
    { id: 1, name: "Nearby", href: "#" },
    { id: 2, name: "MyScene", href: "#" },
    { id: 3, name: "GetInvolved", href: "#" },
  ];

  return (
    <header className={isVisible ? "visible" : ""}>
      <div className="container">
        <div className="navbar">
            <button
                type="button"
                className="menu-btn"
                onClick={onSidebarClick}
                aria-label="Toggle sidebar"
            >
                <span />
                <span />
                <span />
            </button>

            <div className="left">
                <div className="logo-icon">
                <img src={placeholder} alt="MakeAScene logo" />
                </div>

                <div className="logo">MakeAScene</div>

                <nav className="nav-links">
                {navLinks.map((link) => (
                    <a
                    key={link.id}
                    href={link.href}
                    className={activeSetting === link.name ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        setActiveSetting(link.name);
                    }}
                    >
                    {link.name}
                    </a>
                ))}
                </nav>
            </div>

            <div className="right">
                <div className="search">
                    <span className="search-icon">
                    <SearchIcon className="icon" />
                    </span>
                    <input type="text" placeholder="Search..." />
                </div>

                <div className="filter" onClick={onFilterbarClick}>
                    <span className="filter-icon">
                    <FilterIcon className="icon" />
                    </span>
                </div>

                <div className="mobile-search-icon">
                    <SearchIcon className="icon" />
                </div>
            </div>
            </div>

      </div>
    </header>
  );
};

export default Header;