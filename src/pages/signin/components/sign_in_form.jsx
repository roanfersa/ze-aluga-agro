import React, { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password });
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control signin-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control signin-input"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      <button type="submit" className="btn signin-btn">
        Entrar
      </button>
    </form>
  );
};

export default SignInForm;
