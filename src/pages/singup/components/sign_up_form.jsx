import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/user_context";

const SignUpForm = () => {
  const { register } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
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
      newErrors.fullName = "Por favor, forneça nome e sobrenome";
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    if (!formData.userType) {
      newErrors.userType = "Por favor, selecione uma opção";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
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

    setIsSubmitting(true);

    try {
      const result = await register(formData);

      if (result.success) {
        toast.success("Cadastro realizado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(
          result.error ||
            "Erro ao realizar o cadastro. Por favor, tente novamente.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          }
        );
      }
    } catch (error) {
      toast.error("Erro ao realizar o cadastro. Por favor, tente novamente.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <div className="invalid-feedback">{errors.confirmPassword}</div>
        )}
      </div>

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
            style={{ paddingRight: "30px" }}
            disabled={isSubmitting}
          >
            <option value="" disabled>
              Escolha uma opção
            </option>
            <option value="renter">Quero alugar equipamentos</option>
            <option value="owner">Quero disponibilizar equipamentos</option>
          </select>

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
          disabled={isSubmitting}
        />
        <label
          className="form-check-label"
          htmlFor="termsCheck"
          style={{ color: "#FFFFFF" }}
        >
          Eu concordo com os{" "}
          <a href="#" className="signin-link">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="#" className="signin-link">
            Política de Privacidade
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="btn signin-btn mb-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span>
            <i className="bi bi-arrow-repeat spinning me-2"></i>
            Cadastrando...
          </span>
        ) : (
          "Cadastrar"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
