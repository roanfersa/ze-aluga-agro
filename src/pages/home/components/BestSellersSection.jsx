import React, { useEffect, useState } from "react";
import { UserSellerModel } from "../../../models/users/user_seller_model";
import usersData from "../../../data/users.json";
import "../../../styles/css/home.css";
import "../../../styles/css/custom_styles.css";

class SellerCardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set seller(data) {
    this.render(data);
  }

  render(seller) {
    const defaultBanner = `https://placehold.co/800x200/003321/DCFFD7/png?text=${encodeURIComponent(
      seller.store_name
    )}`;
    const defaultProfile = `https://placehold.co/150x150/003321/DCFFD7/png?text=${encodeURIComponent(
      seller.name.charAt(0)
    )}`;

    this.shadowRoot.innerHTML = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/src/styles/css/home.css">
    <link rel="stylesheet" href="/src/styles/css/custom_styles.css">

        <div class="card">
            <img
                src="${seller.banner || defaultBanner}"
                alt="Banner"
                class="banner"
                loading="lazy"
                onerror="this.src='${defaultBanner}'"
            >
            <img
                src="${seller.profile_picture || defaultProfile}"
                alt="Foto de Perfil"
                class="profile-pic"
                loading="lazy"
                onerror="this.src='${defaultProfile}'"
            >
            <div class="card-body">
                <div class="store-name">${seller.store_name}</div>
                <div class="seller-name">por ${seller.name}</div>
                <div class="stats">
                    <div>
                        <span>${seller.product_count || 0}</span>
                        Produtos
                    </div>
                    <div>
                        <span>${seller.deals_count || 0}</span>
                        Negócios
                    </div>
                    <div>
                        <span>${seller.followers_count || 0}</span>
                        Seguidores
                    </div>
                </div>
                <button class="follow-button">Seguir</button>
            </div>
        </div>
    `;
  }
}

customElements.define("seller-card", SellerCardComponent);

const BestSellersSection = () => {
  const [sellers, setSellers] = useState([]);
  const itemsPerSlide = 4;

  useEffect(() => {
    const sellerUsers = usersData
      .filter((user) => user.is_seller)
      .map(
        (user) =>
          new UserSellerModel(
            user.id,
            user.name,
            user.email,
            user.phone,
            user.is_seller,
            user.store_name,
            user.product_count,
            user.followers_count
          )
      );

    setSellers(sellerUsers);
  }, []);

  useEffect(() => {
    const carousel = document.getElementById("best-sellers-carousel");
    const carouselInner = document.getElementById(
      "best-sellers-carousel-inner"
    );
    const indicators = document.querySelector(
      ".carousel-indicators.custom-indicators"
    );

    if (carousel && carouselInner && indicators) {
      // Limpa o conteúdo existente
      carouselInner.innerHTML = "";
      indicators.innerHTML = "";

      // Agrupa os vendedores em slides
      const groupedSellers = sellers.reduce((acc, seller, index) => {
        const slideIndex = Math.floor(index / itemsPerSlide);
        if (!acc[slideIndex]) {
          acc[slideIndex] = [];
        }
        acc[slideIndex].push(seller);
        return acc;
      }, []);

      // Cria os slides e indicadores
      groupedSellers.forEach((sellerGroup, index) => {
        // Cria o indicador
        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", "#best-sellers-carousel");
        indicator.setAttribute("data-bs-slide-to", index);
        if (index === 0) {
          indicator.classList.add("active");
          indicator.setAttribute("aria-current", "true");
        }
        indicator.setAttribute("aria-label", `Slide ${index + 1}`);
        indicators.appendChild(indicator);

        // Cria o slide
        const slide = document.createElement("div");
        slide.className = `carousel-item ${index === 0 ? "active" : ""}`;

        const slideContent = document.createElement("div");
        slideContent.className = "d-flex";

        // Preenche com cards vazios se necessário
        const paddedGroup = [...sellerGroup];
        while (paddedGroup.length < itemsPerSlide) {
          paddedGroup.push(null);
        }

        paddedGroup.forEach((seller) => {
          if (seller) {
            const sellerCard = document.createElement("seller-card");
            sellerCard.seller = seller;
            slideContent.appendChild(sellerCard);
          } else {
            // Adiciona um espaço vazio para manter o layout
            const emptySpace = document.createElement("div");
            emptySpace.style.width = "calc(25% - 20px)";
            slideContent.appendChild(emptySpace);
          }
        });

        slide.appendChild(slideContent);
        carouselInner.appendChild(slide);
      });

      // Inicializa o carrossel
      const bsCarousel = new window.bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true,
        touch: true,
      });
    }
  }, [sellers]);

  return (
    <div id="best-sellers-section" className="container my-5">
      <h2 className="mb-4">Melhores Vendedores</h2>

      <div
        id="best-sellers-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators custom-indicators"></div>
        <div className="carousel-inner" id="best-sellers-carousel-inner"></div>

        <button
          className="carousel-control-prev custom-control"
          type="button"
          data-bs-target="#best-sellers-carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next custom-control"
          type="button"
          data-bs-target="#best-sellers-carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>
    </div>
  );
};

export default BestSellersSection;
