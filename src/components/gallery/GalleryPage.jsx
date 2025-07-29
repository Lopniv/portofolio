import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./GalleryPage.css";
import Navbar from "../share/Navbar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const globeBg = "/images/image-world.png";

function getRandomPhotos(photos, count) {
	if (photos.length <= count) return photos;
	const shuffled = [...photos].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}

// --- Main Component ---
function GalleryPage() {
	const MIN_CARDS = 8;

	const { t } = useTranslation();

	const [viewerOpen, setViewerOpen] = useState(false);
	const [currentPhoto, setCurrentPhoto] = useState(null);

	const [highlights, setHighlights] = useState([]);
	const [photos, setPhotos] = useState([]);
	const [displayPhotos, setDisplayPhotos] = useState([]);

	const [stories, setStories] = useState([]);

	const { i18n } = useTranslation();
	const [lang, setLang] = useState(i18n.language);

	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const navigate = useNavigate();

	// Fetch highlights
	useEffect(() => {
		async function fetchHighlights() {
			const querySnapshot = await getDocs(collection(db, "highlights"));
			const items = [];
			querySnapshot.forEach((doc) => {
				items.push({ id: doc.id, ...doc.data() });
			});
			setHighlights(items);
		}
		fetchHighlights();
	}, []);

	// Fetch stories
	useEffect(() => {
		async function fetchStories() {
			const querySnapshot = await getDocs(collection(db, "stories highlight"));
			const items = [];
			querySnapshot.forEach((doc) => {
				items.push({ id: doc.id, ...doc.data() });
			});
			setStories(items);
		}
		fetchStories();
	}, []);

	useEffect(() => {
		setLang(i18n.language);
	}, [i18n.language]);

	const cards = [
		...stories,
		...Array(Math.max(0, MIN_CARDS - stories.length)).fill({ comingSoon: true })
	];

	// Fetch photos
	useEffect(() => {
		async function fetchPhotos() {
			const querySnapshot = await getDocs(collection(db, "photos"));
			const items = [];
			querySnapshot.forEach((doc) => {
				items.push({ id: doc.id, ...doc.data() });
			});
			setPhotos(items);
		}
		fetchPhotos();
	}, []);

	// On photos load and every 30s, pick 6 random photos
	useEffect(() => {
		if (photos.length === 0) return;

		// Initial random selection
		setDisplayPhotos(getRandomPhotos(photos, 6));

		// Interval for random selection every 30s
		const interval = setInterval(() => {
			setDisplayPhotos(getRandomPhotos(photos, 6));
		}, 5000);

		return () => clearInterval(interval);
	}, [photos]);

	return (
		<div className="gallery-root">
			<Navbar />
			{/* --- Section 1: Gallery Landing --- */}
			<section
				className="gallery-landing-section gallery-section"
				id="gallery-landing">
				<div
					className="gallery-landing-background"
					style={{ backgroundImage: `url(${globeBg})` }}></div>
				<div className="gallery-landing-content">
					{/* Left: Title and Description */}
					<div className="gallery-landing-left">
						<h1 className="gallery-landing-title">
							{isMobile ? (
								t("galleryTitle")
							) : (
								Array.from(t("galleryTitle")).map((char, i) => (
									<span className="shine-letter" key={i}>
										{char}
									</span>
								))
							)}
						</h1>
						<p className="gallery-landing-desc">
							{t("galleryDescription")}
						</p>
					</div>
					{/* Right: 3 Images */}
					<div className="gallery-landing-right">
						{highlights.slice(0, 3).map((image, idx) => {
							// Define custom class for each image
							let customClass = "";
							if (idx === 0)
								customClass = "gallery-landing-img-main";
							if (idx === 1)
								customClass =
									"gallery-landing-img-side gallery-landing-img-side1";
							if (idx === 2)
								customClass =
									"gallery-landing-img-side gallery-landing-img-side2";

							return (
								<div
									className={`gallery-landing-img ${customClass}`}
									key={image.url}>
									<img
										src={image.url}
										loading="lazy"
										alt={`Landing ${idx + 1}`}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* --- Section 2: Explore the Story --- */}
			<section className="gallery-section" id="explore">
				<h2 className="gallery-section-title">{t("galleryExplore")}</h2>
				<div className="story-scroll">
					{cards
						.slice()
						.sort((a, b) => (a.id - b.id))
						.map((story, idx) =>
							story.comingSoon ? (
								<div className="story-card coming-soon" key={`coming-soon-${idx}`}>
									<span>{t("comingSoon") + "..."}</span>
								</div>
							) : (
								<div className="story-card" onClick={() => navigate(`/story/${story.id}`)}
									style={{ cursor: "pointer" }}>
									<img src={story.image} alt={story.title[lang]} />
									<div className="story-title">{story.title[lang]}</div>
								</div>
							)
					)}
				</div>
			</section>

			{/* --- Section 3: Photos --- */}
			<section className="gallery-section" id="photos">
				<h2 className="gallery-section-title">{t("galleryPhotos")}</h2>
				<div className="photos-collage">
					{displayPhotos.map((photo, idx) => (
						<div
							className={`photo-collage-item photo-collage-item-${idx + 1
								}`}
							key={photo.id}
							onClick={() => {
								setCurrentPhoto(photo.url);
								setViewerOpen(true);
							}}>
							<img
								src={photo.url}
								alt={`Photo ${photo.id}`}
								loading="lazy"
							/>
						</div>
					))}
				</div>
			</section>

			{/* Fullscreen Image Viewer */}
			{viewerOpen && (
				<div
					className="image-viewer"
					onClick={() => setViewerOpen(false)}>
					<img src={currentPhoto} alt="Large view" />
				</div>
			)}
		</div>
	);
}

export default GalleryPage;
