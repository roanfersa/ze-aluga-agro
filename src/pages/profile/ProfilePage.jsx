import React, { useState, useEffect } from "react";
import { useUser } from "../../context/user_context";
import { useProfile } from "../../core/hooks/useProfile";
import HeaderComponent from "../../core/components/header_component";
import FooterComponent from "../../core/components/footer_component";
import { toast } from "react-toastify";
import "../../styles/css/profile.css";

const ProfilePage = () => {
  const { currentUser, logout } = useUser();
  const { 
    profileData, 
    updateProfile, 
    changePassword, 
    getStats,
    loading: profileLoading 
  } = useProfile();

  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    store_name: "",
  });

  // Atualizar formData quando profileData ou currentUser mudarem
  useEffect(() => {
    const userData = profileData || currentUser;
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        store_name: userData.store_name || "",
      });
    }
  }, [profileData, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const result = await updateProfile(formData);
      
      if (result.success) {
        toast.success('Perfil atualizado com sucesso!', {
          position: "top-right",
          autoClose: 3000,
        });
        setIsEditing(false);
        
        // Recarregar a página para atualizar o contexto do usuário
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(result.error || 'Erro ao atualizar perfil', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error('Erro inesperado ao atualizar perfil', {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleCancel = () => {
    const userData = profileData || currentUser;
    setFormData({
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      store_name: userData?.store_name || "",
    });
    setIsEditing(false);
  };

  const handlePasswordChange = async (currentPassword, newPassword) => {
    return await changePassword(currentPassword, newPassword);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Usar profileData se disponível, caso contrário currentUser
  const userData = profileData || currentUser;
  const stats = getStats();

  if (!userData) {
    return (
      <>
        <HeaderComponent />
        <div className="container my-5">
          <div className="text-center">
            <h2>Acesso negado</h2>
            <p>Você precisa estar logado para acessar esta página.</p>
          </div>
        </div>
        <FooterComponent />
      </>
    );
  }

  return (
    <>
      <HeaderComponent />
      
      <div className="profile-wrapper">
        <div className="container py-4">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="profile-avatar-large">
                  {getInitials(userData.name)}
                </div>
              </div>
              <div className="col">
                <h1 className="profile-name font-family-primary">
                  {userData.name}
                </h1>
                <p className="profile-email text-custom-tertiary">
                  {userData.email}
                </p>
                {userData.is_seller && (
                  <span className="seller-badge">
                    <i className="bi bi-shop me-1"></i>
                    Vendedor
                  </span>
                )}
              </div>
              <div className="col-auto">
                <button 
                  className="btn btn-outline-primary profile-edit-btn"
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={profileLoading}
                >
                  {profileLoading ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : (
                    <i className="bi bi-pencil me-2"></i>
                  )}
                  {isEditing ? 'Cancelar' : 'Editar Perfil'}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards (para vendedores) */}
          {userData.is_seller && stats && (
            <div className="profile-stats">
              <div className="row g-3">
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card">
                    <div className="stats-icon bg-custom-secondary">
                      <i className="bi bi-box-seam text-custom-primary"></i>
                    </div>
                    <div className="stats-content">
                      <h3>{stats.products}</h3>
                      <p>Produtos</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card">
                    <div className="stats-icon bg-custom-secondary">
                      <i className="bi bi-people text-custom-primary"></i>
                    </div>
                    <div className="stats-content">
                      <h3>{stats.followers}</h3>
                      <p>Seguidores</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card">
                    <div className="stats-icon bg-custom-secondary">
                      <i className="bi bi-star text-custom-primary"></i>
                    </div>
                    <div className="stats-content">
                      <h3>{stats.rating}</h3>
                      <p>Avaliação</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card">
                    <div className="stats-icon bg-custom-secondary">
                      <i className="bi bi-graph-up text-custom-primary"></i>
                    </div>
                    <div className="stats-content">
                      <h3>{stats.sales}</h3>
                      <p>Vendas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="profile-tabs">
            <nav className="nav nav-pills">
              <button 
                className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                <i className="bi bi-person me-2"></i>
                Informações Pessoais
              </button>
              <button 
                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <i className="bi bi-bag me-2"></i>
                Meus Pedidos
              </button>
              <button 
                className={`nav-link ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                <i className="bi bi-heart me-2"></i>
                Favoritos
              </button>
              {userData.is_seller && (
                <button 
                  className={`nav-link ${activeTab === 'store' ? 'active' : ''}`}
                  onClick={() => setActiveTab('store')}
                >
                  <i className="bi bi-shop me-2"></i>
                  Minha Loja
                </button>
              )}
              <button 
                className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <i className="bi bi-shield-lock me-2"></i>
                Segurança
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="profile-content">
            {activeTab === 'personal' && (
              <div className="content-card">
                <div className="card-header">
                  <h3>Informações Pessoais</h3>
                  <p className="text-custom-tertiary">
                    Gerencie suas informações pessoais e de contato
                  </p>
                </div>
                <div className="card-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label">Nome Completo</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control profile-input"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing || profileLoading}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control profile-input"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing || profileLoading}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Telefone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control profile-input"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing || profileLoading}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    {userData.is_seller && (
                      <div className="col-md-6">
                        <label className="form-label">Nome da Loja</label>
                        <input
                          type="text"
                          name="store_name"
                          className="form-control profile-input"
                          value={formData.store_name}
                          onChange={handleInputChange}
                          disabled={!isEditing || profileLoading}
                        />
                      </div>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="mt-4">
                      <button 
                        className="btn btn-primary me-3"
                        onClick={handleSave}
                        disabled={profileLoading}
                      >
                        {profileLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Salvando...
                          </>
                        ) : (
                          'Salvar Alterações'
                        )}
                      </button>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={handleCancel}
                        disabled={profileLoading}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="content-card">
                <div className="card-header">
                  <h3>Meus Pedidos</h3>
                  <p className="text-custom-tertiary">
                    Acompanhe o status dos seus pedidos
                  </p>
                </div>
                <div className="card-body">
                  <div className="empty-state">
                    <i className="bi bi-bag-x"></i>
                    <h4>Nenhum pedido encontrado</h4>
                    <p>Você ainda não fez nenhum pedido em nossa plataforma.</p>
                    <a href="/" className="btn btn-primary">
                      Começar a Comprar
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="content-card">
                <div className="card-header">
                  <h3>Meus Favoritos</h3>
                  <p className="text-custom-tertiary">
                    Produtos que você salvou para comprar depois
                  </p>
                </div>
                <div className="card-body">
                  <div className="empty-state">
                    <i className="bi bi-heart"></i>
                    <h4>Nenhum favorito ainda</h4>
                    <p>Adicione produtos aos seus favoritos para encontrá-los facilmente.</p>
                    <a href="/" className="btn btn-primary">
                      Explorar Produtos
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'store' && userData.is_seller && (
              <div className="content-card">
                <div className="card-header">
                  <h3>Minha Loja</h3>
                  <p className="text-custom-tertiary">
                    Gerencie sua loja e produtos
                  </p>
                </div>
                <div className="card-body">
                  <div className="store-actions">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="action-card">
                          <i className="bi bi-plus-circle"></i>
                          <h5>Adicionar Produto</h5>
                          <p>Cadastre novos produtos em sua loja</p>
                          <a href="/my-store" className="btn btn-primary btn-sm">
                            Ir para Minha Loja
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="action-card">
                          <i className="bi bi-graph-up"></i>
                          <h5>Minha Loja</h5>
                          <p>Gerencie produtos, pedidos e relatórios</p>
                          <a href="/my-store" className="btn btn-primary btn-sm">
                            Acessar Loja
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="content-card">
                <div className="card-header">
                  <h3>Segurança</h3>
                  <p className="text-custom-tertiary">
                    Gerencie sua senha e configurações de segurança
                  </p>
                </div>
                <div className="card-body">
                  <div className="security-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>Alterar Senha</h5>
                        <p className="text-custom-tertiary mb-0">
                          Mantenha sua conta segura com uma senha forte
                        </p>
                      </div>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => setShowPasswordModal(true)}
                      >
                        Alterar
                      </button>
                    </div>
                  </div>
                  
                  <hr />
                  
                  <div className="security-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>Autenticação de Dois Fatores</h5>
                        <p className="text-custom-tertiary mb-0">
                          Adicione uma camada extra de segurança
                        </p>
                      </div>
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="twoFactorSwitch"
                        />
                        <label 
                          className="form-check-label" 
                          htmlFor="twoFactorSwitch"
                        >
                          Ativado
                        </label>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="security-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="text-danger">Excluir Conta</h5>
                        <p className="text-custom-tertiary mb-0">
                          Esta ação não pode ser desfeita
                        </p>
                      </div>
                      <button className="btn btn-outline-danger">
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Password Modal - Placeholder for now */}
      {showPasswordModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Alterar Senha</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowPasswordModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Funcionalidade de alteração de senha em desenvolvimento...</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Fechar
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

export default ProfilePage;