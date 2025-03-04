import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/css/suport.css";
import HeaderComponent from "../../core/components/header_component";
import FooterComponent from "../../core/components/footer_component";
import SupportComponent from "../../core/components/support/support_component";

function SupportPage() {
  // Inicializa o Bootstrap quando o componente é montado
  useEffect(() => {
    // Verifica se o Bootstrap está disponível
    if (typeof window !== 'undefined' && window.bootstrap) {
      // Inicializa os dropdowns do Bootstrap
      const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
      dropdownElementList.map(function (dropdownToggleEl) {
        return new window.bootstrap.Dropdown(dropdownToggleEl);
      });
      
      // Inicializa os accordions do Bootstrap
      const accordionElementList = [].slice.call(document.querySelectorAll('.accordion-button'));
      accordionElementList.map(function (accordionButton) {
        accordionButton.addEventListener('click', function() {
          this.classList.toggle('collapsed');
          const target = document.querySelector(this.getAttribute('data-bs-target'));
          if (target) {
            target.classList.toggle('show');
          }
        });
      });
    }
  }, []);

  return (
    <>
      <HeaderComponent />
      <SupportComponent />
      <FooterComponent />
    </>
  );
}

export default SupportPage;
