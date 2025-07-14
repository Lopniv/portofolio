import React, { useState } from "react";
import "./BubblePopup.css";

function BubblePopupText({ text, maxLength = 30 }) {
	const [showPopup, setShowPopup] = useState(false);

	const isLong = text.length > maxLength;
	const displayText = isLong ? text.slice(0, maxLength) + "..." : text;

	return (
		<div
			className="bubble-popup-wrapper"
			onMouseEnter={() => isLong && setShowPopup(true)}
			onMouseLeave={() => setShowPopup(false)}>
			<span className="bubble-popup-text">{displayText}</span>
			{isLong && showPopup && (
				<div className="bubble-popup">
					{text}
					<span className="bubble-popup-arrow" />
				</div>
			)}
		</div>
	);
}

export default BubblePopupText;
