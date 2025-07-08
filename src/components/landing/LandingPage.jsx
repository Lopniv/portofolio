import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./LandingPage.css";
import Navbar from "../Navbar";

const gifSrc = "/images/character.gif"; // Replace with your gif path

function LandingPage() {
	const [bgImage, setBgImage] = useState(
		"https://res.cloudinary.com/djuzjcbjz/image/upload/v1751850205/image-3_2_kat4ns.jpg"
	);
	const [highlights, setHighlights] = useState([]);

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

	return (
		<div
			className="landing-root"
			style={{
				backgroundImage: bgImage ? `url(${bgImage})` : "none",
			}}>
			<video
				className="landing-character"
				src="/images/character.mp4"
				autoPlay
				loop
				muted
				playsInline
				style={{ width: 320, height: 320, borderRadius: 24 }}
			/>
			{bgImage && <div className="landing-overlay" />}
			<Navbar/>
			<div className="landing-main">
				<div className="landing-left"></div>
				<div className="landing-right">
					<div className="landing-cards">
						{highlights.map((image, idx) => (
							<div
								key={idx}
								className="landing-card"
								onClick={() => setBgImage(image.url)}>
								<img src={image.url} loading="lazy" />
								<div className="landing-card-title-overlay">
									<div className="landing-card-title">
										{image.title || "Untitled"}
									</div>
								</div>
							</div>
						))}
					</div>
					<h1 className="landing-title">
						Enter Lopniv — Where Creativity Inspires, and Art Speaks
						to the Heart
					</h1>
					<a href="gallery" className="landing-explore-btn">
						Start Explore the Gallery
					</a>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
