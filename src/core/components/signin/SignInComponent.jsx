import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/svg/LOGO_1.svg";
import imgLogin from "../../../assets/images/img-login.jpg";

function SignInComponent() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <div className="bg-custom-primary">
      <div className="container-fluid">
        <div id="img_banner" className="row">
          {/* Coluna da imagem */}
          <div className="col-md-5 p-0">
            <img src={imgLogin} alt="banner-login" className="img-fluid" />
          </div>

          {/* Coluna do formulário */}
          <div className="col-md-7 d-flex flex-column align-items-center justify-content-center">
            <div className="text-center mb-4">
              <Link to="/">
                <img src={Logo} alt="Logo Zé Aluga" className="logo-img" />
              </Link>
            </div>

            {/* Card do formulário */}
            <div id="form-card" className="card mx-auto outline-custom-secondary rounded-lg">
              <div className="card-body">
                <h1 className="card-title text-custom-secondary fs-custom-heading font-family-primary">Login</h1>
                <h5 className="card-subtitle text-custom-secondary font-family-secondary">
                  Não tem uma conta?{" "}
                  <Link to="/signup" className="bg-custom-secondary p-2 rounded text-custom-primary fs-product-card-title">
                    Cadastre-se
                  </Link>
                </h5>

                {/* Formulário de Login */}
                <form onSubmit={handleSubmit}>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <input 
                        type="email" 
                        placeholder="Email" 
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <input 
                        type="password" 
                        placeholder="Senha" 
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <button 
                        type="submit"
                        className="btn bg-custom-secondary text-custom-primary font-family-primary fw-bold p-2 w-100"
                      >
                        Entrar
                      </button>
                    </div>
                  </div>
                </form>

                <div className="divider mt-4 mb-2"></div>
                <p className="text-center text-light">ou</p>

                {/* Botões de Login com Google e Facebook */}
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-light w-100 mb-2 d-flex align-items-center justify-content-center">
                      <i className="bi bi-google me-2"></i> Entrar com Google
                    </button>
                  </div>
                  <div className="col-md-12">
                    <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center">
                      <i className="bi bi-facebook me-2"></i> Entrar com Facebook
                    </button>
                  </div>
                </div>

                {/* Link para recuperar senha */}
                <div className="text-center mt-3">
                  <Link to="/recover-password" className="text-light">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInComponent;
