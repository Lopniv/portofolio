import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./GalleryPage.css";
import Navbar from "../Navbar";

// --- Dummy Data (replace with your actual images) ---
const globeBg = "/images/image-world.png";

const stories = [
	{ id: 1, title: "Story 1", img: "/images/story1.jpg" },
	{ id: 2, title: "Story 2", img: "/images/story2.jpg" },
	{ id: 3, title: "Story 3", img: "/images/story3.jpg" },
	{ id: 4, title: "Story 4", img: "/images/story4.jpg" },
	{ id: 5, title: "Story 5", img: "/images/story5.jpg" },
	{ id: 6, title: "Story 6", img: "/images/story6.jpg" },
	{ id: 7, title: "Story 7", img: "/images/story7.jpg" },
];

function getRandomPhotos(photos, count) {
	if (photos.length <= count) return photos;
	const shuffled = [...photos].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}

// --- Main Component ---
function GalleryPage() {
	const [viewerOpen, setViewerOpen] = useState(false);
	const [currentPhoto, setCurrentPhoto] = useState(null);

	const [highlights, setHighlights] = useState([]);
	const [photos, setPhotos] = useState([]);
	const [displayPhotos, setDisplayPhotos] = useState([]);

	const shuffledPhotosRef = useRef([]);
	const currentIndexRef = useRef(0);

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
			<Navbar/>
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
							{/* Uncover the Story <br /> Behind Every Artwork */}
							{Array.from(
								"Uncover the Story Behind Every Artwork"
							).map((char, i) => (
								<span className="shine-letter" key={i}>
									{char}
								</span>
							))}
						</h1>
						<p className="gallery-landing-desc">
							Behind every stroke, color, and composition lies a
							story. Whether it’s a moment of joy, sorrow, hope,
							or imagination drawn from the deepest parts of the
							soul — every piece on Lopniv reflects something
							real, something personal.
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
				<h2 className="gallery-section-title">Explore the Story</h2>
				<div className="story-scroll">
					{stories.map((story) => (
						<div className="story-card" key={story.id}>
							<img src={story.img} alt={story.title} />
							<div className="story-title">{story.title}</div>
						</div>
					))}
				</div>
			</section>

			{/* --- Section 3: Photos --- */}
			<section className="gallery-section" id="photos">
				<h2 className="gallery-section-title">Photos</h2>
				<div className="photos-collage">
					{displayPhotos.map((photo, idx) => (
						<div
							className={`photo-collage-item photo-collage-item-${
								idx + 1
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
