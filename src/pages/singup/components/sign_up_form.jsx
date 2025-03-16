import React, { useState } from "react";
import { toast } from 'react-toastify';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "buyer",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });


    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};


    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    } else if (formData.fullName.trim().split(" ").length < 2) {
      newErrors.fullName = "Por favor, insira nome e sobrenome";
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }


    if (formData.phone) {
      const phoneRegex = /^\+?\d{10,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Telefone inválido";
      }
    }


    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 8) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres";
    }

    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não conferem";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);

      const errorMessage = Object.values(formErrors)[0];
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return;
    }

    console.log("Form submitted:", formData);

    try {
      
      toast.success('Cadastro realizado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
      
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        userType: "buyer",
      });
      
    } catch (error) {
      
      toast.error('Erro ao realizar o cadastro. Por favor, tente novamente.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
    }
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className={`form-control signin-input ${
            errors.fullName ? "is-invalid" : ""
          }`}
          placeholder="Nome completo"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        {errors.fullName && (
          <div className="invalid-feedback">{errors.fullName}</div>
        )}
      </div>

      <div className="form-group">
        <input
          type="email"
          className={`form-control signin-input ${
            errors.email ? "is-invalid" : ""
          }`}
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="form-group">
        <input
          type="tel"
          className={`form-control signin-input ${
            errors.phone ? "is-invalid" : ""
          }`}
          placeholder="Telefone / WhatsApp (opcional)"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>

      <div className="form-group">
        <input
          type="password"
          className={`form-control signin-input ${
            errors.password ? "is-invalid" : ""
          }`}
          placeholder="Senha"
          name="password"
          value={formData.password}
          onChange={handleChange}
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
          className={`form-control signin-input ${
            errors.confirmPassword ? "is-invalid" : ""
          }`}
          placeholder="Confirmar senha"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <div className="invalid-feedback">{errors.confirmPassword}</div>
        )}
      </div>

      <div className="form-group">
        <div className="d-flex justify-content-between mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="userType"
              id="buyer"
              value="buyer"
              checked={formData.userType === "buyer"}
              onChange={handleChange}
            />
            <label className="form-check-label text-white" htmlFor="buyer">
              Quero alugar equipamentos
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="userType"
              id="seller"
              value="seller"
              checked={formData.userType === "seller"}
              onChange={handleChange}
            />
            <label className="form-check-label text-white" htmlFor="seller">
              Quero disponibilizar equipamentos
            </label>
          </div>
        </div>
      </div>

      <button type="submit" className="btn signin-btn">
        Cadastrar
      </button>
    </form>
  );
};

export default SignUpForm;
