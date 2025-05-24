import React, { useState, useEffect } from "react";
import { useUser } from "../../context/user_context";
import { useProfile } from "../../core/hooks/useProfile";
import HeaderComponent from "../../core/components/header_component";
import FooterComponent from "../../core/components/footer_component";
import { toast } from "react-toastify";
import "../../styles/css/settings.css";

const SettingsPage = () => {
  const { currentUser, logout } = useUser();
  const { profileData, updateProfile, changePassword } = useProfile();
  const [activeSection, setActiveSection] = useState("account");
  const [loading, setLoading] = useState(false);
  
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    const userData = profileData || currentUser;
    if (userData) {
      setAccountData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        bio: userData.bio || ""
      });
    }
  }, [profileData, currentUser]);

  const handleAccountUpdate = async () => {
    setLoading(true);
    try {
      const result = await updateProfile(accountData);
      if (result.success) {
        toast.success("Informações atualizadas com sucesso!");
      } else {
        toast.error(result.error || "Erro ao atualizar informações");
      }
    } catch (error) {
      toast.error("Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (result.success) {
        toast.success("Senha alterada com sucesso!");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(result.error || "Erro ao alterar senha");
      }
    } catch (error) {
      toast.error("Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETAR" || !passwordData.currentPassword) {
      toast.error("Preencha todos os campos corretamente");
      return;
    }

    setLoading(true);
    try {
      // Simular exclusão da conta
      const users = JSON.parse(localStorage.getItem('ze_aluga_users') || '[]');
      const updatedUsers = users.filter(u => u.id !== currentUser.id);
      localStorage.setItem('ze_aluga_users', JSON.stringify(updatedUsers));
      localStorage.removeItem('ze_aluga_current_user');
      
      toast.success("Conta excluída com sucesso!");
      logout();
      setTimeout(() => window.location.href = "/", 2000);
    } catch (error) {
      toast.error("Erro ao excluir conta");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const userData = profileData || currentUser;

  if (!userData) {
    return (
      <>
        <HeaderComponent />
        <div className="container my-5 text-center">
          <h2>Acesso negado</h2>
          <p>Você precisa estar logado para acessar esta página.</p>
          <a href="/signin" className="btn btn-primary">Fazer Login</a>
        </div>
        <FooterComponent />
      </>
    );
  }

  return (
    <>
      <HeaderComponent />
      
      <div className="settings-wrapper">
        <div className="container py-4">
          {/* Header */}
          <div className="settings-header">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="settings-title font-family-primary">
                  <i className="bi bi-gear me-3"></i>
                  Configurações
                </h1>
                <p className="settings-subtitle text-custom-tertiary">
                  Gerencie suas preferências e configurações da conta
                </p>
              </div>
              <div className="col-auto">
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <i className="bi bi-trash me-2"></i>
                  Excluir Conta
                </button>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="settings-sidebar">
                <nav className="settings-nav">
                  <button 
                    className={`settings-nav-item ${activeSection === 'account' ? 'active' : ''}`}
                    onClick={() => setActiveSection('account')}
                  >
                    <i className="bi bi-person"></i>
                    <span>Conta</span>
                  </button>
                  <button 
                    className={`settings-nav-item ${activeSection === 'security' ? 'active' : ''}`}
                    onClick={() => setActiveSection('security')}
                  >
                    <i className="bi bi-shield-lock"></i>
                    <span>Segurança</span>
                  </button>
                  <button 
                    className={`settings-nav-item ${activeSection === 'preferences' ? 'active' : ''}`}
                    onClick={() => setActiveSection('preferences')}
                  >
                    <i className="bi bi-sliders"></i>
                    <span>Preferências</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="col-lg-9">
              {activeSection === 'account' && (
                <div className="content-card">
                  <div className="card-header">
                    <h3>Informações da Conta</h3>
                    <p className="text-custom-tertiary mb-0">
                      Atualize suas informações pessoais
                    </p>
                  </div>
                  <div className="card-body">
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label">Nome Completo</label>
                        <input
                          type="text"
                          className="form-control settings-input"
                          value={accountData.name}
                          onChange={(e) => setAccountData(prev => ({...prev, name: e.target.value}))}
                          placeholder="Digite seu nome completo"
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control settings-input"
                          value={accountData.email}
                          onChange={(e) => setAccountData(prev => ({...prev, email: e.target.value}))}
                          placeholder="Digite seu email"
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Telefone</label>
                        <input
                          type="tel"
                          className="form-control settings-input"
                          value={accountData.phone}
                          onChange={(e) => setAccountData(prev => ({...prev, phone: e.target.value}))}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Tipo de Conta</label>
                        <input
                          type="text"
                          className="form-control settings-input"
                          value={userData.is_seller ? "Vendedor" : "Comprador"}
                          disabled
                        />
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label">Bio</label>
                        <textarea
                          className="form-control settings-input"
                          rows="3"
                          value={accountData.bio}
                          onChange={(e) => setAccountData(prev => ({...prev, bio: e.target.value}))}
                          placeholder="Conte um pouco sobre você..."
                          maxLength="300"
                        />
                        <small className="text-muted">{accountData.bio.length}/300 caracteres</small>
                      </div>
                      
                      <div className="col-12">
                        <button 
                          className="btn btn-primary"
                          onClick={handleAccountUpdate}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Salvando...
                            </>
                          ) : (
                            'Salvar Alterações'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div className="content-card">
                  <div className="card-header">
                    <h3>Segurança</h3>
                    <p className="text-custom-tertiary mb-0">
                      Gerencie a segurança da sua conta
                    </p>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handlePasswordChange}>
                      <div className="row g-4">
                        <div className="col-12">
                          <h5>Alterar Senha</h5>
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Senha Atual *</label>
                          <input
                            type="password"
                            className="form-control settings-input"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({...prev, currentPassword: e.target.value}))}
                            required
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Nova Senha *</label>
                          <input
                            type="password"
                            className="form-control settings-input"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({...prev, newPassword: e.target.value}))}
                            required
                            minLength="6"
                            placeholder="Mínimo 6 caracteres"
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Confirmar Nova Senha *</label>
                          <input
                            type="password"
                            className="form-control settings-input"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({...prev, confirmPassword: e.target.value}))}
                            required
                          />
                        </div>
                        
                        <div className="col-12">
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
                              'Alterar Senha'
                            )}
                          </button>
                        </div>
                      </div>
                    </form>

                    <hr className="my-4" />

                    <div className="security-options">
                      <h5 className="mb-3">Opções de Segurança</h5>
                      
                      <div className="security-option">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6>Autenticação de Dois Fatores</h6>
                            <small className="text-muted">
                              Adicione uma camada extra de segurança
                            </small>
                          </div>
                          <div className="form-check form-switch">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id="twoFactorAuth"
                            />
                            <label className="form-check-label" htmlFor="twoFactorAuth">
                              Ativar
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="security-option">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6>Notificações de Login</h6>
                            <small className="text-muted">
                              Receba alertas de novos logins
                            </small>
                          </div>
                          <div className="form-check form-switch">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id="loginAlerts"
                              defaultChecked
                            />
                            <label className="form-check-label" htmlFor="loginAlerts">
                              Ativar
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'preferences' && (
                <div className="content-card">
                  <div className="card-header">
                    <h3>Preferências</h3>
                    <p className="text-custom-tertiary mb-0">
                      Configure suas preferências da plataforma
                    </p>
                  </div>
                  <div className="card-body">
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label">Idioma</label>
                        <select className="form-control settings-input">
                          <option value="pt-BR">Português (Brasil)</option>
                          <option value="en-US">English (US)</option>
                          <option value="es-ES">Español</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Moeda</label>
                        <select className="form-control settings-input">
                          <option value="BRL">Real (R$)</option>
                          <option value="USD">Dólar ($)</option>
                          <option value="EUR">Euro (€)</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <hr />
                        <h5>Notificações</h5>
                      </div>

                      <div className="col-12">
                        <div className="notification-option">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6>Email de Pedidos</h6>
                              <small className="text-muted">
                                Receber atualizações de pedidos por email
                              </small>
                            </div>
                            <div className="form-check form-switch">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="orderEmails"
                                defaultChecked
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="notification-option">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6>Emails Promocionais</h6>
                              <small className="text-muted">
                                Receber ofertas e promoções
                              </small>
                            </div>
                            <div className="form-check form-switch">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="promoEmails"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <hr />
                        <h5>Privacidade</h5>
                      </div>

                      <div className="col-12">
                        <div className="privacy-option">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6>Perfil Público</h6>
                              <small className="text-muted">
                                Permitir que outros vejam seu perfil
                              </small>
                            </div>
                            <div className="form-check form-switch">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="publicProfile"
                                defaultChecked
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Excluir Conta
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-danger">
                  <strong>Atenção!</strong> Esta ação não pode ser desfeita.
                </div>

                <div className="mb-3">
                  <label className="form-label">Senha atual:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({...prev, currentPassword: e.target.value}))}
                    placeholder="Digite sua senha"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Digite <strong>DELETAR</strong> para confirmar:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="DELETAR"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                  disabled={loading || deleteConfirmation !== 'DELETAR' || !passwordData.currentPassword}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Excluindo...
                    </>
                  ) : (
                    'Excluir Conta'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <FooterComponent />
    </>
  );
};

export default SettingsPage;