import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/user_context";

const SignInForm = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast.success("Login realizado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(
          result.error || "Credenciais inválidas. Por favor, tente novamente.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
    } catch (error) {
      toast.error("Erro ao realizar o login. Por favor, tente novamente.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          name="email"
          className="form-control signin-input"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          name="password"
          className="form-control signin-input"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" className="btn signin-btn" disabled={isSubmitting}>
        {isSubmitting ? (
          <span>
            <i className="bi bi-arrow-repeat spinning me-2"></i>
            Entrando...
          </span>
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  );
};

export default SignInForm;
