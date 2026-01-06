// src/components/projects/ProjectsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import ProjectCard from "./ProjectCard";
import "./ProjectPage.css";
import Navbar from "../share/Navbar";
import { useTranslation } from "react-i18next";

function ProjectsPage() {
	const { t } = useTranslation();

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
			<h2 className="projects-title">{t("myProjects")}</h2>
			<div className="projects-grid">
				{projects
					.sort((a, b) => {
						const pa = a.priority ?? 0;
						const pb = b.priority ?? 0;
						if (pb !== pa) return pb - pa;
						return a.id - b.id;
					})
					.map((project, idx) => (
						<ProjectCard key={idx} {...project} />
					))}
			</div>
		</section>
	);
}

export default ProjectsPage;
