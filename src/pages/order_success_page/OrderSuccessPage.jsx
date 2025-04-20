import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../../core/components/header_component";
import FooterComponent from "../../core/components/footer_component";
// import "../../../styles/css/order_success_page.css";

const OrderSuccessPage = () => {
  const orderId = "ZA" + Math.floor(10000 + Math.random() * 90000);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderComponent />
      <div className="order-success-container">
        <div className="container py-5">
          <div className="order-success-content">
            <div className="success-icon">
              <i className="bi bi-check-circle"></i>
            </div>
            <h1 className="success-title font-family-primary text-custom-primary">
              Pedido Realizado com Sucesso!
            </h1>
            <p className="success-message">
              Obrigado por escolher o Zé Aluga! Seu pedido foi recebido e está
              sendo processado.
            </p>

            <div className="order-details">
              <div className="order-detail-item">
                <span className="detail-label">Número do Pedido:</span>
                <span className="detail-value">{orderId}</span>
              </div>
              <div className="order-detail-item">
                <span className="detail-label">Data:</span>
                <span className="detail-value">
                  {new Date().toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="order-detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value status-processing">
                  Processando
                </span>
              </div>
            </div>

            <div className="next-steps">
              <h2 className="next-steps-title font-family-primary">
                Próximos Passos
              </h2>
              <div className="step-items">
                <div className="step-item">
                  <div className="step-icon">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="step-content">
                    <h3>Confirmação por E-mail</h3>
                    <p>
                      Você receberá um e-mail com os detalhes do seu pedido em
                      breve.
                    </p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-icon">
                    <i className="bi bi-box-seam"></i>
                  </div>
                  <div className="step-content">
                    <h3>Preparação do Pedido</h3>
                    <p>
                      Estamos preparando seu pedido para envio. Você receberá
                      atualizações por e-mail.
                    </p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-icon">
                    <i className="bi bi-truck"></i>
                  </div>
                  <div className="step-content">
                    <h3>Envio</h3>
                    <p>
                      Assim que seu pedido for enviado, você receberá um e-mail
                      com informações de rastreamento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <Link
                to="/"
                className="btn bg-custom-primary text-custom-secondary"
              >
                Continuar Comprando
              </Link>
            </div>

            <div className="contact-support">
              <p>
                Alguma dúvida sobre seu pedido?{" "}
                <Link to="/support" className="support-link">
                  Entre em contato com o suporte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default OrderSuccessPage;
