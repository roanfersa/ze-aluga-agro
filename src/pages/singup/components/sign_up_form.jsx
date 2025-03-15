import React, { useState } from "react";

const SignUpForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "", // Changed from radio buttons to dropdown selection
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate full name (requires at least first and last name)
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    } else if (formData.fullName.trim().split(" ").length < 2) {
      newErrors.fullName = "Por favor, forneça nome e sobrenome";
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    // User type validation
    if (!formData.userType) {
      newErrors.userType = "Por favor, selecione uma opção";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Process form submission
    console.log("Form submitted:", formData);
    // Here you would typically make an API call to register the user
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="fullName"
          className={`form-control signin-input ${
            errors.fullName ? "is-invalid" : ""
          }`}
          placeholder="Nome completo"
          value={formData.fullName}
          onChange={handleInputChange}
          required
          autoComplete="name"
        />
        {errors.fullName && (
          <div className="invalid-feedback">{errors.fullName}</div>
        )}
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          className={`form-control signin-input ${
            errors.email ? "is-invalid" : ""
          }`}
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          autoComplete="email"
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="form-group">
        <input
          type="tel"
          name="phone"
          className="form-control signin-input"
          placeholder="Telefone / WhatsApp (opcional)"
          value={formData.phone}
          onChange={handleInputChange}
          autoComplete="tel"
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          name="password"
          className={`form-control signin-input ${
            errors.password ? "is-invalid" : ""
          }`}
          placeholder="Senha"
          value={formData.password}
          onChange={handleInputChange}
          required
          autoComplete="new-password"
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>

      <div className="form-group">
        <input
          type="password"
          name="confirmPassword"
          className={`form-control signin-input ${
            errors.confirmPassword ? "is-invalid" : ""
          }`}
          placeholder="Confirmar senha"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <div className="invalid-feedback">{errors.confirmPassword}</div>
        )}
      </div>

      {/* Dropdown with custom arrow icon */}
      <div className="form-group">
        <div className="position-relative">
          <select
            name="userType"
            className={`form-control signin-input ${
              errors.userType ? "is-invalid" : ""
            }`}
            value={formData.userType}
            onChange={handleInputChange}
            required
            style={{ paddingRight: "30px" }} // Add space for the arrow
          >
            <option value="" disabled>
              Escolha uma opção
            </option>
            <option value="renter">Quero alugar equipamentos</option>
            <option value="owner">Quero disponibilizar equipamentos</option>
          </select>
          {/* Custom dropdown arrow icon */}
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#FFFFFF",
              fontSize: "16px",
            }}
          >
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>
        {errors.userType && (
          <div className="invalid-feedback">{errors.userType}</div>
        )}
      </div>

      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="termsCheck"
          required
        />
        <label
          className="form-check-label"
          htmlFor="termsCheck"
          style={{ color: "#FFFFFF" }}
        >
          Eu concordo com os
          <a href="#" className="signin-link">
            Termos de Uso
          </a>{" "}
          e
          <a href="#" className="signin-link">
            Política de Privacidade
          </a>
        </label>
      </div>

      <button type="submit" className="btn signin-btn mb-3">
        Cadastrar
      </button>
    </form>
  );
};

export default SignUpForm;
