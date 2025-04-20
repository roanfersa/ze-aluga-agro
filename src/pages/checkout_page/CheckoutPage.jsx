import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../core/components/header_component";
import FooterComponent from "../../core/components/footer_component";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/user_context";
import { toast } from "react-toastify";
import "../../styles/css/checkout_page.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart, formatPrice } = useCart();
  const { isLoggedIn, currentUser } = useUser();

  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [shippingCost, setShippingCost] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    zipCode: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",
    installments: "1",
  });

  const [errors, setErrors] = useState({});

  // Usar useEffect apenas no nível superior, não dentro de condicionais
  useEffect(() => {
    if (!isLoggedIn) {
      toast.warning("Por favor, faça login para continuar com a compra.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/signin?redirect=checkout");
    } else if (currentUser) {
      // Pre-fill form with user data if available
      setFormData((prevData) => ({
        ...prevData,
        fullName: currentUser.name || prevData.fullName,
        email: currentUser.email || prevData.email,
        phone: currentUser.phone || prevData.phone,
      }));
    }
  }, [isLoggedIn, currentUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length <= 2) {
      return v;
    }

    let month = v.substring(0, 2);
    let year = v.substring(2, 4);

    if (parseInt(month) > 12) {
      month = "12";
    }

    return `${month}/${year}`;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }));
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData((prev) => ({
      ...prev,
      cardExpiry: formatted,
    }));
  };

  const calculateShipping = async () => {
    if (!formData.zipCode || formData.zipCode.length < 8) {
      setErrors((prev) => ({
        ...prev,
        zipCode: "CEP inválido",
      }));
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const originCEP = "05426100"; // Faria Lima CEP

      const distance = Math.abs(
        parseInt(formData.zipCode) - parseInt(originCEP)
      );
      const baseCost = 25;
      let calculatedCost;

      if (deliveryOption === "express") {
        calculatedCost = baseCost + distance * 0.0005 + 15;
      } else {
        calculatedCost = baseCost + distance * 0.0005;
      }

      calculatedCost = Math.round(calculatedCost * 100) / 100;

      setShippingCost(calculatedCost);

      try {
        const cepResponse = await fetch(
          `https://viacep.com.br/ws/${formData.zipCode}/json/`
        );
        const cepData = await cepResponse.json();

        if (!cepData.erro) {
          setFormData((prev) => ({
            ...prev,
            address: cepData.logradouro || prev.address,
            neighborhood: cepData.bairro || prev.neighborhood,
            city: cepData.localidade || prev.city,
            state: cepData.uf || prev.state,
          }));
        }
      } catch (error) {
        console.error("Error fetching address from CEP:", error);
      }

      toast.success(`Frete calculado: ${formatPrice(calculatedCost)}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error calculating shipping:", error);
      toast.error("Erro ao calcular o frete. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const validateShippingForm = () => {
    const newErrors = {};

    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Nome completo é obrigatório";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email válido é obrigatório";
    }

    if (!formData.phone || formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Telefone válido é obrigatório";
    }

    if (!formData.zipCode || formData.zipCode.replace(/\D/g, "").length < 8) {
      newErrors.zipCode = "CEP válido é obrigatório";
    }

    if (!formData.address) {
      newErrors.address = "Endereço é obrigatório";
    }

    if (!formData.number) {
      newErrors.number = "Número é obrigatório";
    }

    if (!formData.neighborhood) {
      newErrors.neighborhood = "Bairro é obrigatório";
    }

    if (!formData.city) {
      newErrors.city = "Cidade é obrigatória";
    }

    if (!formData.state) {
      newErrors.state = "Estado é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    if (paymentMethod !== "credit") {
      return true;
    }

    const newErrors = {};

    if (
      !formData.cardNumber ||
      formData.cardNumber.replace(/\s/g, "").length < 16
    ) {
      newErrors.cardNumber = "Número de cartão válido é obrigatório";
    }

    if (!formData.cardName || formData.cardName.trim().length < 3) {
      newErrors.cardName = "Nome no cartão é obrigatório";
    }

    if (!formData.cardExpiry || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Data de validade válida é obrigatória (MM/AA)";
    }

    if (!formData.cardCVV || !/^\d{3,4}$/.test(formData.cardCVV)) {
      newErrors.cardCVV = "CVV válido é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Go to next step
  const handleNextStep = () => {
    if (activeStep === 1 && validateShippingForm()) {
      setActiveStep(2);
      window.scrollTo(0, 0);
    } else if (activeStep === 2 && validatePaymentForm()) {
      setActiveStep(3);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleCompleteOrder = () => {
    setLoading(true);

    setTimeout(() => {
      toast.success("Pedido realizado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
      });

      clearCart();
      navigate("/order-success");
      setLoading(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <HeaderComponent />
        <div className="container py-5 text-center">
          <h2 className="font-family-primary text-custom-primary mb-4">
            Seu carrinho está vazio
          </h2>
          <p className="mb-4">
            Adicione produtos ao carrinho antes de finalizar a compra.
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn bg-custom-primary text-custom-secondary"
          >
            Voltar para a loja
          </button>
        </div>
        <FooterComponent />
      </>
    );
  }

  return (
    <>
      <HeaderComponent />
      <div className="checkout-page-container">
        <div className="container py-5">
          <h1 className="checkout-title font-family-primary text-custom-primary mb-4">
            Finalizar Pedido
          </h1>

          <div className="checkout-progress mb-5">
            <div className={`progress-step ${activeStep >= 1 ? "active" : ""}`}>
              <div className="step-number">1</div>
              <div className="step-label">Envio</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${activeStep >= 2 ? "active" : ""}`}>
              <div className="step-number">2</div>
              <div className="step-label">Pagamento</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${activeStep >= 3 ? "active" : ""}`}>
              <div className="step-number">3</div>
              <div className="step-label">Revisão</div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              {activeStep === 1 && (
                <div className="checkout-section shipping-section">
                  <h2 className="section-title font-family-primary">
                    Informações de Envio
                  </h2>

                  <div className="form-group">
                    <label htmlFor="fullName">Nome Completo</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className={`form-control ${
                        errors.fullName ? "is-invalid" : ""
                      }`}
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone">Telefone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className={`form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(00) 00000-0000"
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="zipCode">CEP</label>
                        <div className="input-group">
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            className={`form-control ${
                              errors.zipCode ? "is-invalid" : ""
                            }`}
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            maxLength="8"
                            placeholder="00000000"
                          />
                          <button
                            className="btn bg-custom-primary text-custom-secondary"
                            type="button"
                            onClick={calculateShipping}
                            disabled={loading}
                          >
                            {loading ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              "Buscar CEP"
                            )}
                          </button>
                        </div>
                        {errors.zipCode && (
                          <div className="invalid-feedback d-block">
                            {errors.zipCode}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="address">Endereço</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className={`form-control ${
                            errors.address ? "is-invalid" : ""
                          }`}
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        {errors.address && (
                          <div className="invalid-feedback">
                            {errors.address}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="number">Número</label>
                        <input
                          type="text"
                          id="number"
                          name="number"
                          className={`form-control ${
                            errors.number ? "is-invalid" : ""
                          }`}
                          value={formData.number}
                          onChange={handleInputChange}
                        />
                        {errors.number && (
                          <div className="invalid-feedback">
                            {errors.number}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="complement">Complemento (opcional)</label>
                    <input
                      type="text"
                      id="complement"
                      name="complement"
                      className="form-control"
                      value={formData.complement}
                      onChange={handleInputChange}
                      placeholder="Apto, Bloco, etc."
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="neighborhood">Bairro</label>
                        <input
                          type="text"
                          id="neighborhood"
                          name="neighborhood"
                          className={`form-control ${
                            errors.neighborhood ? "is-invalid" : ""
                          }`}
                          value={formData.neighborhood}
                          onChange={handleInputChange}
                        />
                        {errors.neighborhood && (
                          <div className="invalid-feedback">
                            {errors.neighborhood}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="city">Cidade</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className={`form-control ${
                            errors.city ? "is-invalid" : ""
                          }`}
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                        {errors.city && (
                          <div className="invalid-feedback">{errors.city}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="state">Estado</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          className={`form-control ${
                            errors.state ? "is-invalid" : ""
                          }`}
                          value={formData.state}
                          onChange={handleInputChange}
                          maxLength="2"
                          placeholder="UF"
                        />
                        {errors.state && (
                          <div className="invalid-feedback">{errors.state}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <label>Opções de Entrega</label>
                    <div className="delivery-options">
                      <div
                        className={`delivery-option ${
                          deliveryOption === "standard" ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          id="standard-delivery"
                          name="deliveryOption"
                          value="standard"
                          checked={deliveryOption === "standard"}
                          onChange={() => setDeliveryOption("standard")}
                        />
                        <label
                          htmlFor="standard-delivery"
                          className="delivery-option-label"
                        >
                          <div>
                            <strong>Entrega Padrão</strong>
                            <p>Receba em até 7 dias úteis</p>
                          </div>
                          <span>
                            {shippingCost > 0
                              ? formatPrice(shippingCost)
                              : "A calcular"}
                          </span>
                        </label>
                      </div>
                      <div
                        className={`delivery-option ${
                          deliveryOption === "express" ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          id="express-delivery"
                          name="deliveryOption"
                          value="express"
                          checked={deliveryOption === "express"}
                          onChange={() => setDeliveryOption("express")}
                        />
                        <label
                          htmlFor="express-delivery"
                          className="delivery-option-label"
                        >
                          <div>
                            <strong>Entrega Expressa</strong>
                            <p>Receba em até 3 dias úteis</p>
                          </div>
                          <span>
                            {shippingCost > 0
                              ? formatPrice(shippingCost + 15)
                              : "A calcular"}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {activeStep === 2 && (
                <div className="checkout-section payment-section">
                  <h2 className="section-title font-family-primary">
                    Informações de Pagamento
                  </h2>

                  <div className="payment-methods mb-4">
                    <div
                      className={`payment-method ${
                        paymentMethod === "credit" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="credit-payment"
                        name="paymentMethod"
                        value="credit"
                        checked={paymentMethod === "credit"}
                        onChange={() => setPaymentMethod("credit")}
                      />
                      <label
                        htmlFor="credit-payment"
                        className="payment-method-label"
                      >
                        <i className="bi bi-credit-card"></i>
                        <span>Cartão de Crédito</span>
                      </label>
                    </div>
                    <div
                      className={`payment-method ${
                        paymentMethod === "boleto" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="boleto-payment"
                        name="paymentMethod"
                        value="boleto"
                        checked={paymentMethod === "boleto"}
                        onChange={() => setPaymentMethod("boleto")}
                      />
                      <label
                        htmlFor="boleto-payment"
                        className="payment-method-label"
                      >
                        <i className="bi bi-upc"></i>
                        <span>Boleto Bancário</span>
                      </label>
                    </div>
                    <div
                      className={`payment-method ${
                        paymentMethod === "pix" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="pix-payment"
                        name="paymentMethod"
                        value="pix"
                        checked={paymentMethod === "pix"}
                        onChange={() => setPaymentMethod("pix")}
                      />
                      <label
                        htmlFor="pix-payment"
                        className="payment-method-label"
                      >
                        <i className="bi bi-qr-code"></i>
                        <span>PIX</span>
                      </label>
                    </div>
                  </div>

                  {paymentMethod === "credit" && (
                    <div className="credit-card-form">
                      <div className="form-group">
                        <label htmlFor="cardNumber">Número do Cartão</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          className={`form-control ${
                            errors.cardNumber ? "is-invalid" : ""
                          }`}
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength="19"
                          placeholder="0000 0000 0000 0000"
                        />
                        {errors.cardNumber && (
                          <div className="invalid-feedback">
                            {errors.cardNumber}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="cardName">Nome no Cartão</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          className={`form-control ${
                            errors.cardName ? "is-invalid" : ""
                          }`}
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="Nome como está no cartão"
                        />
                        {errors.cardName && (
                          <div className="invalid-feedback">
                            {errors.cardName}
                          </div>
                        )}
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="cardExpiry">Validade</label>
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              className={`form-control ${
                                errors.cardExpiry ? "is-invalid" : ""
                              }`}
                              value={formData.cardExpiry}
                              onChange={handleExpiryChange}
                              maxLength="5"
                              placeholder="MM/AA"
                            />
                            {errors.cardExpiry && (
                              <div className="invalid-feedback">
                                {errors.cardExpiry}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="cardCVV">CVV</label>
                            <input
                              type="text"
                              id="cardCVV"
                              name="cardCVV"
                              className={`form-control ${
                                errors.cardCVV ? "is-invalid" : ""
                              }`}
                              value={formData.cardCVV}
                              onChange={handleInputChange}
                              maxLength="4"
                              placeholder="123"
                            />
                            {errors.cardCVV && (
                              <div className="invalid-feedback">
                                {errors.cardCVV}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="installments">Parcelas</label>
                        <select
                          id="installments"
                          name="installments"
                          className="form-control"
                          value={formData.installments}
                          onChange={handleInputChange}
                        >
                          <option value="1">
                            1x de {formatPrice(totalAmount + shippingCost)} (sem
                            juros)
                          </option>
                          <option value="2">
                            2x de{" "}
                            {formatPrice((totalAmount + shippingCost) / 2)} (sem
                            juros)
                          </option>
                          <option value="3">
                            3x de{" "}
                            {formatPrice((totalAmount + shippingCost) / 3)} (sem
                            juros)
                          </option>
                          <option value="4">
                            4x de{" "}
                            {formatPrice((totalAmount + shippingCost) / 4)} (sem
                            juros)
                          </option>
                          <option value="5">
                            5x de{" "}
                            {formatPrice((totalAmount + shippingCost) / 5)} (sem
                            juros)
                          </option>
                          <option value="6">
                            6x de{" "}
                            {formatPrice((totalAmount + shippingCost) / 6)} (sem
                            juros)
                          </option>
                        </select>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "boleto" && (
                    <div className="boleto-info">
                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>O boleto será
                        gerado após a conclusão do pedido e terá vencimento em 3
                        dias úteis. Após o pagamento, o produto será liberado
                        para envio em até 2 dias úteis.
                      </div>
                    </div>
                  )}

                  {paymentMethod === "pix" && (
                    <div className="pix-info">
                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>O QR Code do
                        PIX será gerado após a conclusão do pedido. O pagamento
                        deve ser realizado em até 30 minutos, caso contrário, o
                        pedido será cancelado.
                      </div>
                      <div className="text-center mb-3">
                        <i className="bi bi-qr-code-scan pix-icon"></i>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review Order */}
              {activeStep === 3 && (
                <div className="checkout-section review-section">
                  <h2 className="section-title font-family-primary">
                    Revise seu Pedido
                  </h2>

                  <div className="review-items mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="review-item">
                        <div className="review-item-image">
                          <img
                            src={
                              item.image ||
                              `https://placehold.co/100x100/003321/DCFFD7/png?text=${encodeURIComponent(
                                item.name.charAt(0)
                              )}`
                            }
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://placehold.co/100x100/003321/DCFFD7/png?text=${encodeURIComponent(
                                item.name.charAt(0)
                              )}`;
                            }}
                          />
                        </div>
                        <div className="review-item-details">
                          <h4 className="item-name">{item.name}</h4>
                          <p className="item-qty">
                            Quantidade: {item.quantity}
                          </p>
                          <p className="item-price">
                            {item.has_discount
                              ? formatPrice(
                                  parseFloat(
                                    item.price
                                      .replace("R$", "")
                                      .replace(".", "")
                                      .replace(",", ".")
                                      .trim()
                                  ) *
                                    (1 - item.discount_percentage / 100) *
                                    item.quantity
                                )
                              : formatPrice(
                                  parseFloat(
                                    item.price
                                      .replace("R$", "")
                                      .replace(".", "")
                                      .replace(",", ".")
                                      .trim()
                                  ) * item.quantity
                                )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="shipping-summary mb-4">
                    <h3 className="summary-subtitle">Endereço de Entrega</h3>
                    <div className="address-details">
                      <p>
                        <strong>{formData.fullName}</strong>
                      </p>
                      <p>
                        {formData.address}, {formData.number}
                        {formData.complement ? ` - ${formData.complement}` : ""}
                      </p>
                      <p>
                        {formData.neighborhood}, {formData.city} -{" "}
                        {formData.state}
                      </p>
                      <p>CEP: {formData.zipCode}</p>
                    </div>
                  </div>

                  <div className="payment-summary mb-4">
                    <h3 className="summary-subtitle">Forma de Pagamento</h3>
                    <div className="payment-details">
                      {paymentMethod === "credit" && (
                        <p>
                          <i className="bi bi-credit-card me-2"></i>
                          Cartão de crédito terminando em{" "}
                          {formData.cardNumber.slice(-4)}
                          <br />
                          {formData.installments}x de{" "}
                          {formatPrice(
                            (totalAmount + shippingCost) /
                              parseInt(formData.installments)
                          )}
                        </p>
                      )}
                      {paymentMethod === "boleto" && (
                        <p>
                          <i className="bi bi-upc me-2"></i>
                          Boleto Bancário
                        </p>
                      )}
                      {paymentMethod === "pix" && (
                        <p>
                          <i className="bi bi-qr-code me-2"></i>
                          PIX
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="delivery-summary mb-4">
                    <h3 className="summary-subtitle">Método de Entrega</h3>
                    <div className="delivery-details">
                      {deliveryOption === "standard" ? (
                        <p>
                          <i className="bi bi-truck me-2"></i>
                          Entrega Padrão - Até 7 dias úteis
                        </p>
                      ) : (
                        <p>
                          <i className="bi bi-truck me-2"></i>
                          Entrega Expressa - Até 3 dias úteis
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="checkout-actions mt-4">
                {activeStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="btn outline-custom-primary text-custom-primary me-3"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar
                  </button>
                )}

                {activeStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="btn bg-custom-primary text-custom-secondary"
                  >
                    Continuar
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteOrder}
                    className="btn bg-custom-primary text-custom-secondary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Processando...
                      </>
                    ) : (
                      <>
                        Finalizar Compra
                        <i className="bi bi-check-circle ms-2"></i>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="order-summary">
                <h2 className="summary-title font-family-primary">
                  Resumo do Pedido
                </h2>
                <div className="summary-items">
                  <div className="summary-item">
                    <span>
                      Subtotal ({cartItems.length}{" "}
                      {cartItems.length === 1 ? "item" : "itens"})
                    </span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Frete</span>
                    <span>
                      {shippingCost > 0
                        ? formatPrice(
                            deliveryOption === "express"
                              ? shippingCost + 15
                              : shippingCost
                          )
                        : "A calcular"}
                    </span>
                  </div>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>
                    {shippingCost > 0
                      ? formatPrice(
                          totalAmount +
                            (deliveryOption === "express"
                              ? shippingCost + 15
                              : shippingCost)
                        )
                      : formatPrice(totalAmount)}
                  </span>
                </div>
                {activeStep === 3 && (
                  <button
                    onClick={handleCompleteOrder}
                    className="btn checkout-btn bg-custom-primary text-custom-secondary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Processando...
                      </>
                    ) : (
                      <>
                        Finalizar Compra
                        <i className="bi bi-check-circle ms-2"></i>
                      </>
                    )}
                  </button>
                )}

                <div className="secure-checkout mt-3">
                  <p className="text-center mb-2">
                    <i className="bi bi-shield-lock me-2"></i>
                    Pagamento 100% Seguro
                  </p>
                  <div className="payment-icons text-center">
                    <i className="bi bi-credit-card me-2"></i>
                    <i className="bi bi-cash me-2"></i>
                    <i className="bi bi-bank me-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default CheckoutPage;
