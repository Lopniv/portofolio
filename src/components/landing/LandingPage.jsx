import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./LandingPage.css";
import Navbar from "../share/Navbar";
import { useTranslation } from "react-i18next";

function LandingPage() {
	const { t } = useTranslation();

	const [bgImage, setBgImage] = useState("");
	const [highlights, setHighlights] = useState([]);

	const bubbleMessages = [
		t("message1") || "Welcome to Lopniv!",
		t("message2") || "Explore my creative world.",
		t("message3") || "Check out my latest projects!",
		t("message4") || "Art speaks where words are unable to explain.",
		t("message5") || "Let’s create something amazing together!",
	];

	useEffect(() => {
		async function fetchHighlights() {
			const querySnapshot = await getDocs(collection(db, "highlights"));
			const items = [];
			querySnapshot.forEach((doc) => {
				items.push({ id: doc.id, ...doc.data() });
			});
			setHighlights(items);
			setBgImage(items.length > 0 ? items[0].url : "");
		}
		fetchHighlights();
	}, []);

	const [show, setShow] = useState(true);
	const [msgIndex, setMsgIndex] = useState(0);

	useEffect(() => {
		// Show bubble for 2.5s, hide for 1.5s, then repeat with next message
		const showDuration = 2500;
		const hideDuration = 1500;

		let timeout;
		if (show) {
			timeout = setTimeout(() => setShow(false), showDuration);
		} else {
			timeout = setTimeout(() => {
				setShow(true);
				setMsgIndex((prev) => (prev + 1) % bubbleMessages.length);
			}, hideDuration);
		}
		return () => clearTimeout(timeout);
	}, [show]);

	return (
		<div
			className="landing-root"
			style={{
				backgroundImage: bgImage ? `url(${bgImage})` : "none",
			}}>
			<div className="landing-bubble-container">
				{/* Bubble */}
				<div className={`bubble-pop ${show ? "show" : ""}`}>
					{bubbleMessages[msgIndex]}
					<span className="bubble-arrow" />
				</div>
				{/* GIF Character */}
				<video
					className="landing-character"
					src="/images/character.mp4"
					autoPlay
					loop
					muted
					playsInline
					style={{ width: 320, height: 320, borderRadius: 24 }}
				/>
			</div>
			{bgImage && <div className="landing-overlay" />}
			<Navbar />
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
						{t("landingTitle")}
					</h1>
					<a href="gallery" className="landing-explore-btn">
						{t("landingButton")}
					</a>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
