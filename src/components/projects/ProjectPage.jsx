// src/components/projects/ProjectsPage.jsx
import React from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectPage.css";
import Navbar from "../Navbar";

// Example static data (replace with Firestore if you want)
const projects = [
	{
		image: "/images/project1.jpg",
		title: "Portfolio Website",
		description: "A modern portfolio site built with React and Firebase.",
		link: "https://your-portfolio.com",
	},
	{
		image: "/images/project2.jpg",
		title: "E-commerce App",
		description:
			"A full-stack e-commerce platform with payment integration.",
		link: "https://your-ecommerce.com",
	},
	{
		image: "/images/project2.jpg",
		title: "E-commerce App",
		description:
			"A full-stack e-commerce platform with payment integration.",
		link: "https://your-ecommerce.com",
	},
	{
		image: "/images/project2.jpg",
		title: "E-commerce App",
		description:
			"A full-stack e-commerce platform with payment integration.",
		link: "https://your-ecommerce.com",
	},
	{
		image: "/images/project2.jpg",
		title: "E-commerce App",
		description:
			"A full-stack e-commerce platform with payment integration.",
		link: "https://your-ecommerce.com",
	},
	{
		image: "/images/project2.jpg",
		title: "E-commerce App",
		description:
			"A full-stack e-commerce platform with payment integration.",
		link: "https://your-ecommerce.com",
	},
	// Add more projects as needed
];

function ProjectsPage() {
	return (
		<div className="projects-page">
            <Navbar/>
			<h1 className="projects-title">My Projects</h1>
			<div className="projects-grid">
				{projects.map((project, idx) => (
					<ProjectCard key={idx} {...project} />
				))}
			</div>
		</div>
	);
}

export default ProjectsPage;
