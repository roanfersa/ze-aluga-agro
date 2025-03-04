import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supportBanner from "../../../assets/images/suport-banner.jpg";

function SupportComponent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    contactPreference: "",
    message: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    fullName: false,
    email: false,
    whatsapp: false,
    message: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateFullName = () => {
    const nameParts = formData.fullName.trim().split(" ");
    return nameParts.length >= 2 && !nameParts.some(part => part === "");
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email.trim());
  };

  const validateWhatsapp = () => {
    const whatsappRegex = /^\+?\d{10,15}$/;
    return whatsappRegex.test(formData.whatsapp.trim());
  };

  const validateMessage = () => {
    return formData.message.trim().length >= 30 && formData.message.trim().length <= 500;
  };

  const handleBlur = (field) => {
    let isValid = true;
    
    switch (field) {
      case 'fullName':
        isValid = validateFullName();
        break;
      case 'email':
        isValid = validateEmail();
        break;
      case 'whatsapp':
        isValid = validateWhatsapp();
        break;
      case 'message':
        isValid = validateMessage();
        break;
      default:
        break;
    }

    setValidationErrors({
      ...validationErrors,
      [field]: !isValid
    });
  };

  const selectContactPreference = (preference) => {
    setFormData({
      ...formData,
      contactPreference: preference
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = {
      fullName: !validateFullName(),
      email: !validateEmail(),
      whatsapp: !validateWhatsapp(),
      message: !validateMessage()
    };
    
    setValidationErrors(errors);
    
    // Check if there are any errors
    if (!Object.values(errors).some(error => error)) {
      // Form is valid, submit it
      console.log("Form submitted:", formData);
      alert("Formulário enviado com sucesso!");
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        whatsapp: "",
        contactPreference: "",
        message: ""
      });
    }
  };

  return (
    <>
      {/* Banner Image */}
      <div className="container-fluid">
        <img 
          src={supportBanner} 
          alt="suport_banner" 
          className="img-fluid w-100 rounded mt-2" 
        />
      </div>

      {/* Contact Form Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left Column - Text */}
          <div className="col-md-6">
            <div className="contact-header font-family-secondary text-warning fw-bold">Entre em contato</div>
            <h2 className="contact-title font-family-primary text-custom-primary fw-bold">Como podemos te ajudar?</h2>
            <p className="contact-subtitle">
              Preencha o formulário abaixo para nos enviar sua mensagem.
            </p>
            <div className="contact-image mt-4"></div>
          </div>

          {/* Right Column - Form */}
          <div id="form-card" className="card col-md-6 outline-custom-primary p-4">
            <div className="contact-form card-body">
              <h5 className="text-center mb-3 font-family-primary text-custom-primary fw-bold">
                Fale com um de nossos especialistas
              </h5>

              <form id="contactForm" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="row">
                  <div className="col-md-12">
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName" 
                      className={`form-control outline-custom-primary ${validationErrors.fullName ? 'is-invalid' : ''}`}
                      placeholder="Digite seu nome completo" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('fullName')}
                      required
                    />
                    <div className="invalid-feedback">
                      Por favor, insira o nome completo (incluindo sobrenome).
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="row">
                  <div className="col-md-12">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className={`form-control outline-custom-primary ${validationErrors.email ? 'is-invalid' : ''}`}
                      placeholder="Digite seu e-mail" 
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('email')}
                      required
                    />
                    <div className="invalid-feedback">
                      Insira um e-mail válido.
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="row">
                  <div className="col-md-12">
                    <input 
                      type="tel" 
                      id="whatsapp" 
                      name="whatsapp" 
                      className={`form-control outline-custom-primary ${validationErrors.whatsapp ? 'is-invalid' : ''}`}
                      placeholder="Digite seu número de WhatsApp" 
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('whatsapp')}
                      required
                    />
                    <div className="invalid-feedback">
                      Insira um número de WhatsApp válido com código de área. Ex: +5511999999999
                    </div>
                  </div>
                </div>

                {/* Contact Preference - Dropdown */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="dropdown">
                      <input 
                        type="text" 
                        id="userTypeInput" 
                        placeholder="Selecione como prefere o contato" 
                        className="form-control dropdown-toggle" 
                        readOnly
                        value={formData.contactPreference}
                        data-bs-toggle="dropdown"
                      />
                      <i className="bi bi-chevron-down dropdown-icon"></i>

                      <ul className="dropdown-menu w-100 custom-dropdown">
                        <li><a className="dropdown-item" onClick={() => selectContactPreference('Email')}>Email</a></li>
                        <li><a className="dropdown-item" onClick={() => selectContactPreference('Whatsapp')}>Whatsapp</a></li>
                        <li><a className="dropdown-item" onClick={() => selectContactPreference('Ligação')}>Ligação</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-3 mt-2">
                  <label htmlFor="message" className="form-label font-family-secondary text-custom-primary fw-bold">
                    Qual problema gostaria de resolver?
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className={`form-control outline-custom-primary ${validationErrors.message ? 'is-invalid' : ''}`}
                    placeholder="Digite sua mensagem" 
                    rows="4" 
                    minLength="30" 
                    maxLength="500" 
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('message')}
                    required
                  ></textarea>
                  <div className="invalid-feedback">
                    A mensagem deve ter entre 30 e 500 caracteres.
                  </div>
                </div>

                {/* Submit Button */}
                <div className="row mt-2">
                  <div className="col-md-12">
                    <button 
                      type="submit" 
                      className="btn bg-custom-primary text-custom-secondary font-family-primary fw-bold p-2 w-100"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container-fluid stats-section">
        <div className="container">
          <div className="row">
            {/* Left Column - Stats */}
            <div className="col-md-6">
              <p className="text-uppercase text-warning font-family-secondary fw-bold">Seu problema é nosso problema!</p>
              <h2 className="stats-title">Suporte de Qualidade</h2>
              
              <div className="row mt-4">
                <div className="col-md-6 mb-4">
                  <div className="stat-item">15+</div>
                  <p className="stat-description">Anos de Experiência</p>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="stat-item">93%</div>
                  <p className="stat-description">Dos Casos São Resolvidos</p>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="stat-item">2X</div>
                  <p className="stat-description">Mais Rápido</p>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="stat-item">50K</div>
                  <p className="stat-description">Clientes Satisfeitos</p>
                </div>
              </div>
            </div>

            {/* Right Column - Description and Button */}
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <p className="description-text">
                Aliquam pellentesque lorem dictum leo mauris nulla id. Ante id odio in quis adipiscing amet adipiscing velit fringilla. Leo quisque sem nisl habitasse molestie volutpat. Nec elementum dolor.
              </p>
              <button className="learn-more-btn mt-4">Saiba Mais</button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container faq-section">
        <h2 className="faq-title font-family-primary text-custom-primary fw-bold">Dúvida Frequentes</h2>
        <div className="accordion" id="faqAccordion">
          {/* Pergunta 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button 
                className="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseOne" 
                aria-expanded="false" 
                aria-controls="collapseOne"
              >
                Lorem ipsum dolor sit amet?
              </button>
            </h2>
            <div 
              id="collapseOne" 
              className="accordion-collapse collapse" 
              aria-labelledby="headingOne" 
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quaerat numquam iure ipsum quidem recusandae ad magni possimus vitae! Nihil officia, accusamus quidem quis magni cupiditate vel necessitatibus tempore iste.
              </div>
            </div>
          </div>

          {/* Pergunta 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button 
                className="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseTwo" 
                aria-expanded="false" 
                aria-controls="collapseTwo"
              >
                Lorem ipsum dolor sit amet?
              </button>
            </h2>
            <div 
              id="collapseTwo" 
              className="accordion-collapse collapse" 
              aria-labelledby="headingTwo" 
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quaerat numquam iure ipsum quidem recusandae ad magni possimus vitae! Nihil officia, accusamus quidem quis magni cupiditate vel necessitatibus tempore iste.
              </div>
            </div>
          </div>

          {/* Pergunta 3 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button 
                className="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseThree" 
                aria-expanded="false" 
                aria-controls="collapseThree"
              >
                Lorem ipsum dolor sit amet?
              </button>
            </h2>
            <div 
              id="collapseThree" 
              className="accordion-collapse collapse" 
              aria-labelledby="headingThree" 
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quaerat numquam iure ipsum quidem recusandae ad magni possimus vitae! Nihil officia, accusamus quidem quis magni cupiditate vel necessitatibus tempore iste.
              </div>
            </div>
          </div>

          {/* Pergunta 4 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button 
                className="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseFour" 
                aria-expanded="false" 
                aria-controls="collapseFour"
              >
                Lorem ipsum dolor sit amet?
              </button>
            </h2>
            <div 
              id="collapseFour" 
              className="accordion-collapse collapse" 
              aria-labelledby="headingFour" 
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quaerat numquam iure ipsum quidem recusandae ad magni possimus vitae! Nihil officia, accusamus quidem quis magni cupiditate vel necessitatibus tempore iste.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SupportComponent;
