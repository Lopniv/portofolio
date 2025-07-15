import { useState, useEffect } from "react";
import "./Navbar.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

function Navbar() {
	const { t } = useTranslation();
	const [menuOpen, setMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<nav className="navbar">
			<img
				className="logo"
				src={isMobile ? "/logo192.png" : "/images/logo.png"}
				alt="Lopniv Logo"
			/>
			<button
				className="hamburger"
				onClick={() => setMenuOpen(!menuOpen)}
				aria-label="Toggle menu"
			>
				<span />
				<span />
				<span />
			</button>
			<div className={`links ${menuOpen ? "open" : ""}`}>
				<a href="/" className="link" onClick={() => setMenuOpen(false)}>
					{t("home")}
				</a>
				<a href="/gallery" className="link" onClick={() => setMenuOpen(false)}>
					{t("gallery")}
				</a>
				<a href="/project" className="link" onClick={() => setMenuOpen(false)}>
					{t("project")}
				</a>
				<a href="/about" className="link" onClick={() => setMenuOpen(false)}>
					{t("about")}
				</a>
				<LanguageSwitcher />
			</div>
		</nav>
	);
}

export default Navbar;
