import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "/src/styles/css/header.css";
import Logo from "../../assets/svg/LOGO_1.svg";


function FooterComponent() {
  return (
    <>
      <footer className="bg-custom-primary text-white py-5">
        <div className="container">
          <div className="row">
            {/* Coluna Logo e Endereço */}
            <div className="col-md-4">
              <a href="/">
                <img
                  src={Logo}
                  alt="Zé Aluga Logo"
                  className="mb-3"
                  style={{ width: "150px" }}
                />
              </a>
              <address>
                <p className="text-custom-tertiary">
                  Avenida das Nações Unidas, nº 3.003, bairro Bonfim, Osasco,
                  São Paulo, CEP 06233-903
                </p>
                <p className="text-custom-secondary">
                  <i className="bi bi-clock text-custom-secondary"></i> Segunda
                  - Sexta / 8AM até 6PM
                </p>
                <p className="text-custom-secondary">
                  <i className="bi bi-telephone text-custom-secondary"></i> +55
                  (11) 99999-9999
                </p>
              </address>
            </div>

            {/* Coluna Navigation */}
            <div className="col-md-2">
              <h5 className="text-uppercase text-custom-secondary">Descubra</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Nossos Serviços
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Trabalhe Conosco
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna Serviços */}
            <div className="col-md-2">
              <h5 className="text-uppercase text-custom-secondary">Serviços</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Aluguel de Equipamentos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Logística e Entregas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Seja um Seller
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna Ajuda */}
            <div className="col-md-2">
              <h5 className="text-uppercase text-custom-secondary">Ajuda</h5>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="/support"
                    className="text-white text-decoration-none"
                  >
                    Suporte ao Consumidor
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Como Funciona?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Termos & Condições
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Política e Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Linha inferior com redes sociais e copyright */}
          <div className="row mt-4">
            <div className="col-md-6 d-flex align-items-center">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook color-custom-secondary"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter color-custom-secondary"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-linkedin color-custom-secondary"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-instagram color-custom-secondary"></i>
              </a>
            </div>
            <div className="col-md-6 text-md-end text-custom-secondary">
              <small>&copy; 2025 Zé Aluga </small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterComponent;
