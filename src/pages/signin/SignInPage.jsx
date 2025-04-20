import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/css/singin.css";
import SignInForm from "./components/sign_in_form";
import SocialLoginButtons from "./components/social_login_buttons";
import { Link } from "react-router-dom";

function SignInPage() {
    const params = new URLSearchParams(location.search);
    const redirectTo = params.get("redirect");

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const result = await login(formData.email, formData.password);

        if (result.success) {
          toast.success("Login realizado com sucesso!", {
            position: "top-right",
            autoClose: 3000,
          });

          setTimeout(() => {
            if (redirectTo === "checkout") {
              navigate("/checkout");
            } else {
              navigate("/");
            }
          }, 1000);
        } else {
          // TODO: Adicionar handler para possiveis erros
        }
      } catch (error) {
        // TODO: Adicionar handler para possiveis erros
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="signin-wrapper">
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
                <Link to={"/"}>
                  <img
                    src="/src/assets/svg/LOGO_1.svg"
                    alt="Zé Aluga Logo"
                    className="signin-logo"
                  />
                </Link>
              </div>

              <h1 className="signin-title">Login</h1>
              <p className="signin-subtitle">
                Não tem uma conta?{" "}
                <Link to={"/signup"} className="btn signin-cadastre">
                  Cadastre-se
                </Link>

              </p>

              <SignInForm />

              <div className="signin-divider">
                <span>ou</span>
              </div>

              <SocialLoginButtons />

              <p className="signin-forgot">
                <a href="#" className="signin-link">
                  Esqueceu sua senha?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
