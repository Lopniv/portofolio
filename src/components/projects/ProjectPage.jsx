// src/components/projects/ProjectsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import ProjectCard from "./ProjectCard";
import "./ProjectPage.css";
import Navbar from "../share/Navbar";

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
	const [projects, setProjects] = useState([]);

	// Fetch projects
	useEffect(() => {
		async function fetchProjects() {
			const querySnapshot = await getDocs(collection(db, "projects"));
			const items = [];
			querySnapshot.forEach((doc) => {
				items.push({ id: doc.id, ...doc.data() });
			});
			setProjects(items);
		}
		fetchProjects();
	}, []);


	return (
		<section className="projects-page" id="explore">
			<Navbar />
			<h2 className="projects-title">My Projects</h2>
			<div className="projects-grid">
				{projects.map((project, idx) => (
					<ProjectCard key={idx} {...project} />
				))}
			</div>
		</section>
	);
}

export default ProjectsPage;
