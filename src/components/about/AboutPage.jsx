import React from "react";
import "./AboutPage.css";
import Navbar from "../share/Navbar";
import { useTranslation } from "react-i18next";

// Replace with your actual image and social links
const profilePhoto = "/images/fahmi.jpg";
const socials = [
	{
		name: "GitHub",
		icon: "fa-github",
		url: "https://github.com/lopniv",
	},
	{
		name: "LinkedIn",
		icon: "fa-linkedin",
		url: "https://www.linkedin.com/in/abdullah-fahmi/",
	},
	{
		name: "Instagram",
		icon: "fa-instagram",
		url: "https://instagram.com/lopniv",
	},
	{
		name: "YouTube",
		icon: "fa-youtube",
		url: "https://youtube.com/@Akalogy",
	},
];

const techSkills = [
	{ name: "Android Studio", icon: "fa-android" },
	{ name: "Kotlin", icon: "fa-k" },
	{ name: "Java", icon: "fa-java" },
	{ name: "VS Code", icon: "fa-code" },
	{ name: "Angular", icon: "fa-angular" },
	{ name: "React", icon: "fa-react" },
];

function AboutPage() {
	const { t } = useTranslation();

	return (
		<div className="about-root">
			<Navbar />
			<div className="about-left">
				<h1 className="about-title">{t("greeting")}</h1>
				<p className="about-desc">{t("description")}</p>
				<div className="about-tech">
					<h3>{t("techSkills")}</h3>
					<div className="about-tech-icons">
						{techSkills.map((skill, idx) => (
							<div className="about-tech-item" key={idx}>
								<i
									className={`fab ${skill.icon} about-tech-icon`}
								/>
								<span>{skill.name}</span>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="about-right">
				<div className="about-photo-container">
					<img
						src={profilePhoto}
						alt="Fahmi"
						className="about-photo"
					/>
				</div>
				<div className="about-socials">
					{socials.map((social, idx) => (
						<a
							key={idx}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							className="about-social-link"
							title={social.name}>
							<i className={`fab ${social.icon}`} />
						</a>
					))}
				</div>
				<a
					href="mailto:abdullahfahmi2406@gmail.com"
					className="about-contact-btn">
					{t("getInTouch")}
				</a>
			</div>
		</div>
	);
}

export default AboutPage;
