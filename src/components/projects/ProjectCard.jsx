import React from "react";
import "./ProjectCard.css";

function ProjectCard({ preview, title, description, link }) {
	return (
		<div className="project-card">
			<img src={preview} alt={title} className="project-card-img" />
			<div className="project-card-content">
				<h3 className="project-card-title">{title}</h3>
				<p className="project-card-desc">{description}</p>
				{link && (
					<a
						href={link}
						className="project-card-link"
						target="_blank"
						rel="noopener noreferrer">
						View Project
					</a>
				)}
			</div>
		</div>
	);
}

export default ProjectCard;
