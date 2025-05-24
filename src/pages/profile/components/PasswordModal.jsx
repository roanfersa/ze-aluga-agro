import React, { useState } from 'react';
import { toast } from 'react-toastify';

const PasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações
    if (formData.newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error('A nova senha deve ser diferente da atual');
      return;
    }

    setLoading(true);

    try {
      const result = await onSubmit(formData.currentPassword, formData.newPassword);
      
      if (result.success) {
        toast.success('Senha alterada com sucesso!');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        onClose();
      } else {
        toast.error(result.error || 'Erro ao alterar senha');
      }
    } catch (error) {
      toast.error('Erro inesperado ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        onClick={handleClose}
        style={{ zIndex: 1040 }}
      ></div>
      
      {/* Modal */}
      <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font-family-primary">
                <i className="bi bi-shield-lock me-2"></i>
                Alterar Senha
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleClose}
                disabled={loading}
              ></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Senha Atual *</label>
                  <div className="input-group">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      className="form-control profile-input"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      placeholder="Digite sua senha atual"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility('current')}
                      disabled={loading}
                    >
                      <i className={`bi bi-eye${showPasswords.current ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Nova Senha *</label>
                  <div className="input-group">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      name="newPassword"
                      className="form-control profile-input"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      placeholder="Digite a nova senha (min. 6 caracteres)"
                      minLength="6"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility('new')}
                      disabled={loading}
                    >
                      <i className={`bi bi-eye${showPasswords.new ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                  <small className="text-muted">
                    A senha deve ter pelo menos 6 caracteres
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirmar Nova Senha *</label>
                  <div className="input-group">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmPassword"
                      className="form-control profile-input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      placeholder="Digite a nova senha novamente"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility('confirm')}
                      disabled={loading}
                    >
                      <i className={`bi bi-eye${showPasswords.confirm ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                </div>

                <div className="alert alert-info d-flex align-items-start mb-0">
                  <i className="bi bi-info-circle me-2 mt-1"></i>
                  <div>
                    <strong>Dicas para uma senha segura:</strong>
                    <ul className="mb-0 mt-1 small">
                      <li>Use pelo menos 8 caracteres</li>
                      <li>Combine letras maiúsculas e minúsculas</li>
                      <li>Inclua números e símbolos</li>
                      <li>Evite informações pessoais</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Alterando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-2"></i>
                      Alterar Senha
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordModal;