import { useRef } from "react";
import "./DetailStoryPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";
import Navbar from "../share/Navbar";
import Loading from "../share/Loading";

function DetailStoryPage() {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [showStory, setShowStory] = useState(false);
    const [loading, setLoading] = useState(true);

    const storyRef = useRef(null);

    const { t } = useTranslation();

    const { i18n } = useTranslation();
    const lang = i18n.language;

    const handleScrollToStory = () => {
        storyRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        async function fetchStory() {
            const docRef = doc(db, "stories", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setStory({ id: docSnap.id, ...docSnap.data() });
                setShowStory(true);
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        }
        fetchStory();
    }, [id]);

    return (
        <div>
            {showStory && (
                <div className="detail-story-root">
                    <Navbar />
                    {/* Video Section */}
                    <div className="video-section section">
                        <div className="explore-button-container">
                            <button onClick={handleScrollToStory} className="explore-botton">
                                {t("exploreButton")}
                            </button>
                        </div>
                        <iframe
                            className="story-video"
                            src={story.videolink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            style={{ width: "100vw", height: "95vh", objectFit: "cover" }}
                        />
                        <div className="video-overlay" />
                    </div>

                    {/* Stories Section */}
                    <div ref={storyRef} className="stories-section">
                        {story.stories.map((item, idx) => (
                            <div
                                className={`section story-row ${idx % 2 === 0 ? "text-left" : "text-right"}`}
                                key={idx}
                            >
                                {idx % 2 === 0 ? (
                                    <>
                                        <div className="story-content">
                                            <h2>{item.title[lang]}</h2>
                                            <p>{item.description[lang]}</p>
                                        </div>
                                        <div className="story-divider" />
                                        <div className="story-image-container">
                                            <img src={item.image} alt={item.title[lang]} className="story-image" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="story-image-container">
                                            <img src={item.image} alt={item.title[lang]} className="story-image" />
                                        </div>
                                        <div className="story-divider" />
                                        <div className="story-content">
                                            <h2>{item.title[lang]}</h2>
                                            <p>{item.description[lang]}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {loading && (
                <Loading state={loading} />
            )}
            {!showStory && !loading && (
                <div className="detail-story-root">
                    <div className="detail-story-not-found">
                        <img className="image-not-found" src="/images/404-error.svg" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailStoryPage;