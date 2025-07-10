import React from "react";
import "./Navbar.css";
import LanguageSwitcher from "./LanguageSwitcher";

function Navbar() {
	return (
		<nav className="navbar">
			<div className="logo">Lopniv</div>
			<div className="links">
				<a href="/" className="link">
					Home
				</a>
				<a href="gallery" className="link">
					Gallery
				</a>
				<a href="project" className="link">
					Project
				</a>
				<a href="about" className="link">
					About
				</a>
				<LanguageSwitcher />
			</div>
		</nav>
	);
}

export default Navbar;
