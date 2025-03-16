import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/css/singin.css";
import SignUpForm from "./components/sign_up_form";
import SocialLoginButtons from "../signin/components/social_login_buttons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpPage() {
  return (
    <div className="signin-wrapper">

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="signin-container">
        <div className="row g-0 h-100">
          <div className="col-md-6 d-none d-md-block signin-banner">
            <img
              src="/src/assets/images/img-login.jpg"
              alt="Zé Aluga Banner"
              className="signin-banner-img"
            />
          </div>

          <div className="col-12 col-md-6 signin-form-container bg-custom-primary">
            <div className="signin-form-wrapper">
              <div className="signin-logo-container">
                <a href="/">
                  <img
                    src="/src/assets/svg/LOGO_1.svg"
                    alt="Zé Aluga Logo"
                    className="signin-logo"
                  />
                </a>
              </div>

              <h1 className="signin-title">Cadastro</h1>
              <p className="signin-subtitle">
                Já tem uma conta?{" "}
                <a href="/signin" className="btn signin-cadastre">
                  Entrar
                </a>
              </p>

              <SignUpForm />

              <div className="signin-divider">
                <span>ou</span>
              </div>

              <SocialLoginButtons />

              <p className="text-center mt-3 text-white">
                Ao se cadastrar, você concorda com nossos{" "}
                <a href="#" className="signin-link">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#" className="signin-link">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
