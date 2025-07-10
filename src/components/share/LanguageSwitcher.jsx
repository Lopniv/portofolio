// src/components/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();

	return (
		<div className="lang-switcher">
			<button
				className={i18n.language === "en" ? "active" : ""}
				onClick={() => i18n.changeLanguage("en")}>
				EN
			</button>
			<button
				className={i18n.language === "ja" ? "active" : ""}
				onClick={() => i18n.changeLanguage("ja")}>
				日本語
			</button>
		</div>
	);
}
