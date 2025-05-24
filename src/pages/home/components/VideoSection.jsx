import React, { useState } from 'react';
import '../../../styles/css/video_section.css';

const VideoSection = ({ 
  videoId = "OwXlS_OqSBQ",
  title = "Descubra como funciona o Zé Aluga",
  subtitle = "Veja nosso vídeo explicativo e saiba como alugar produtos de forma fácil e segura"
}) => {
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <>
      <section className="video-section">
        <div className="container">
          <div className="video-banner" onClick={handlePlayVideo}>
            <div className="video-content">
              <div className="video-icon">
                <i className="bi bi-play-circle-fill"></i>
              </div>
              <div className="video-text">
                <h3 className="video-title font-family-primary">{title}</h3>
                <p className="video-subtitle">{subtitle}</p>
              </div>
            </div>
            <div className="video-thumbnail">
              <img 
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="thumbnail-img"
              />
              <div className="play-overlay">
                <div className="play-button">
                  <i className="bi bi-play-fill"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal do Vídeo */}
      {showVideo && (
        <div className="video-modal-overlay" onClick={handleCloseVideo}>
          <div className="video-modal">
            <button className="video-close-btn" onClick={handleCloseVideo}>
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoSection;