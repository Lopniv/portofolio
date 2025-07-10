import React from "react";
import "./ProjectCard.css";
import BubblePopupText from "../share/BubblePopup";

function ProjectCard({ preview, title, description, link }) {
	return (
		<div className="project-card">
			<img src={preview} alt={title} className="project-card-img" />
			<div className="project-card-content">
				<h3 className="project-card-title">{title}</h3>
				<BubblePopupText text={description}/>
				{/* <p className="project-card-desc">{description}</p> */}
				{link && (
					<a
						href={link}
						className="project-card-play"
						target="_blank"
						rel="noopener noreferrer"
						title="View Project">
						<i className="fas fa-play"></i>
					</a>
				)}
			</div>
		</div>
	);
}

export default ProjectCard;
