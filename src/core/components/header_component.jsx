import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "/src/styles/css/header.css";
import Logo from "../../assets/svg/LOGO_1.svg";
import LocationIcon from "../../assets/svg/location_icon.svg";
// import "./custom_styles.css";

function HeaderComponent() {
  return (
    <>
      <div id="header" className="container-fluid bg-custom-primary text-white">
        <div className="w-100 py-3 d-flex align-items-center justify-content-between">
          {/* Logo e Localização */}
          <div className="d-flex align-items-center">
            <a href="/">
              <img
                id="logo"
                src={Logo}
                alt="Logo"
                className="me-3"
                style={{ height: "40px" }}
              />
            </a>
            <div id="location" className="d-flex align-items-center">
              <img
                src={LocationIcon}
                alt="Location Pin"
                className="me-2"
                style={{ height: "20px" }}
              />
              <span>São Paulo, Brasil</span>
            </div>
          </div>

          {/* Campo de Busca */}
          <div className="col-md-6 d-flex px-2">
            <div className="input-group">
              <input
                type="text"
                id="search-input"
                className="form-control"
                placeholder="O que você precisa para fazer seu negócio crescer?"
              />
              <button className="input-group-text bg-white border-0">
                <i className="bi bi-search"></i>
              </button>
              <ul id="search-results">
                {/* Resultados da busca serão inseridos aqui */}
              </ul>
            </div>
          </div>

          {/* Ícones e Usuário */}
          <div className="d-flex align-items-center">
            <div className="dropdown me-2">
              <a
                href="/advance_search"
                className="btn outline-custom-secondary text-custom-secondary"
              >
                Zé Busca
              </a>
            </div>

            <div id="logs" className="d-flex align-items-center">
              <a
                href="/signin"
                className="btn bg-custom-secondary text-custom-primary me-2"
              >
                Entrar
              </a>
              <a
                href="/signup"
                className="btn bg-custom-secondary text-custom-primary"
              >
                Cadastrar
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderComponent;
