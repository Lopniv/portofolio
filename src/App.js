import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import GalleryPage from "./components/gallery/GalleryPage";
import ProjectsPage from "./components/projects/ProjectPage";
import AboutPage from "./components/about/AboutPage";
import DetailStoryPage from "./components/detailStory/DetailStoryPage";
import "./i18n";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/gallery" element={<GalleryPage />} />
				<Route path="/project" element={<ProjectsPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/story/:id" element={<DetailStoryPage />} />
			</Routes>
		</Router>
	);
}

export default App;
