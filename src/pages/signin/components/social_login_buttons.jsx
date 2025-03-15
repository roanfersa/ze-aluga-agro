import React from "react";

const SocialLoginButtons = () => {
  return (
    <div className="social-login-container">
      <button type="button" className="btn social-btn google-btn">
        <i className="bi bi-google"></i> Entrar com Google
      </button>

      <button type="button" className="btn social-btn facebook-btn">
        <i className="bi bi-facebook"></i> Entrar com Facebook
      </button>
    </div>
  );
};

export default SocialLoginButtons;
