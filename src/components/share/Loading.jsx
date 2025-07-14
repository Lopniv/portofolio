import React from "react";
import { SyncLoader  } from "react-spinners";

const override = {
	display: "block",
	margin: "0 auto",
	borderColor: "orange",
};

function Loading({ state }) {
	return (
		<div className="sweet-loading">
			<SyncLoader
				cssOverride={override}
				size={10}
				color={"#ff7e5f"}
				loading={state}
				speedMultiplier={1.5}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
}

export default Loading;
