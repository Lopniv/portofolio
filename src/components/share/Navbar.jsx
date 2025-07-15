import React from "react";
import "./Navbar.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

function Navbar() {
	const { t } = useTranslation();

	return (
		<nav className="navbar">
			<img className="logo" src="/images/logo.png"/>
			<div className="links">
				<a href="/" className="link">
					{t("home")}
				</a>
				<a href="/gallery" className="link">
					{t("gallery")}
				</a>
				<a href="/project" className="link">
					{t("project")}
				</a>
				<a href="/about" className="link">
					{t("about")}
				</a>
				<LanguageSwitcher />
			</div>
		</nav>
	);
}

export default Navbar;
