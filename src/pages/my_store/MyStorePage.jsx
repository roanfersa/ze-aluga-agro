import React, { useState, useEffect } from "react";
import { useUser } from "../../context/user_context";
import { useProfile } from "../../core/hooks/useProfile";
import HeaderComponent from "../../core/components/header_component";
import FooterComponent from "../../core/components/footer_component";
import { toast } from "react-toastify";
import "../../styles/css/my-store.css";

const MyStorePage = () => {
  const { currentUser } = useUser();
  const { profileData, getStats, loading: profileLoading } = useProfile();
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockProducts = [
    {
      id: 1,
      name: "Furadeira Elétrica Profissional",
      price: 89.90,
      category: "Ferramentas",
      status: "active",
      stock: 15,
      views: 234,
      favorites: 12,
      image: "/src/assets/images/product-placeholder.jpg"
    },
    {
      id: 2,
      name: "Martelo de Unha 500g",
      price: 25.50,
      category: "Ferramentas",
      status: "active",
      stock: 8,
      views: 189,
      favorites: 5,
      image: "/src/assets/images/product-placeholder.jpg"
    },
    {
      id: 3,
      name: "Chave de Fenda Conjunto 6 Peças",
      price: 32.00,
      category: "Ferramentas",
      status: "inactive",
      stock: 0,
      views: 67,
      favorites: 2,
      image: "/src/assets/images/product-placeholder.jpg"
    }
  ];

  const mockOrders = [
    {
      id: "#12345",
      customer: "João Silva",
      date: "2025-05-20",
      status: "pending",
      total: 89.90,
      items: 1
    },
    {
      id: "#12344",
      customer: "Maria Santos",
      date: "2025-05-19",
      status: "shipped",
      total: 57.50,
      items: 2
    },
    {
      id: "#12343",
      customer: "Carlos Oliveira",
      date: "2025-05-18",
      status: "delivered",
      total: 125.40,
      items: 3
    }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    setProducts(mockProducts);
    setOrders(mockOrders);
  }, []);

  const userData = profileData || currentUser;
  const stats = getStats();

  const getStatusBadge = (status) => {
    const badges = {
      active: { class: "bg-success", text: "Ativo" },
      inactive: { class: "bg-secondary", text: "Inativo" },
      pending: { class: "bg-warning text-dark", text: "Pendente" },
      shipped: { class: "bg-info", text: "Enviado" },
      delivered: { class: "bg-success", text: "Entregue" },
      cancelled: { class: "bg-danger", text: "Cancelado" }
    };
    
    const badge = badges[status] || badges.pending;
    return <span className={`badge ${badge.class}`}>{badge.text}</span>;
  };

  const handleProductAction = (productId, action) => {
    toast.info(`Ação "${action}" para produto ${productId} em desenvolvimento`);
  };

  const handleOrderAction = (orderId, action) => {
    toast.info(`Ação "${action}" para pedido ${orderId} em desenvolvimento`);
  };

  if (!userData || !userData.is_seller) {
    return (
      <>
        <HeaderComponent />
        <div className="container my-5">
          <div className="text-center">
            <h2>Acesso restrito</h2>
            <p>Esta página é destinada apenas para vendedores.</p>
            <a href="/" className="btn btn-primary">Voltar ao Início</a>
          </div>
        </div>
        <FooterComponent />
      </>
    );
  }

  return (
    <>
      <HeaderComponent />
      
      <div className="store-wrapper">
        <div className="container py-4">
          {/* Store Header */}
          <div className="store-header">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="store-avatar">
                  <i className="bi bi-shop"></i>
                </div>
              </div>
              <div className="col">
                <h1 className="store-name font-family-primary">
                  {userData.store_name || `Loja de ${userData.name}`}
                </h1>
                <p className="store-owner text-custom-tertiary">
                  Proprietário: {userData.name}
                </p>
                <div className="store-status">
                  <span className="badge bg-success me-2">
                    <i className="bi bi-check-circle me-1"></i>
                    Loja Ativa
                  </span>
                  <small className="text-custom-tertiary">
                    Membro desde {new Date().getFullYear()}
                  </small>
                </div>
              </div>
              <div className="col-auto">
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-primary">
                    <i className="bi bi-eye me-2"></i>
                    Ver Loja Pública
                  </button>
                  <button className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>
                    Novo Produto
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          {stats && (
            <div className="quick-stats">
              <div className="row g-3">
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card">
                    <div className="stat-icon bg-primary">
                      <i className="bi bi-box-seam text-white"></i>
                    </div>
                    <div className="stat-content">
                      <h3>{stats.products}</h3>
                      <p>Total de Produtos</p>
                      <small className="text-success">
                        <i className="bi bi-arrow-up"></i> +5 este mês
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card">
                    <div className="stat-icon bg-success">
                      <i className="bi bi-currency-dollar text-white"></i>
                    </div>
                    <div className="stat-content">
                      <h3>R$ 2.340</h3>
                      <p>Vendas do Mês</p>
                      <small className="text-success">
                        <i className="bi bi-arrow-up"></i> +12% vs mês anterior
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card">
                    <div className="stat-icon bg-info">
                      <i className="bi bi-bag text-white"></i>
                    </div>
                    <div className="stat-content">
                      <h3>18</h3>
                      <p>Pedidos Pendentes</p>
                      <small className="text-warning">
                        <i className="bi bi-exclamation-triangle"></i> Requer atenção
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card">
                    <div className="stat-icon bg-warning">
                      <i className="bi bi-star text-white"></i>
                    </div>
                    <div className="stat-content">
                      <h3>{stats.rating}</h3>
                      <p>Avaliação Média</p>
                      <small className="text-muted">
                        Baseado em 47 avaliações
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="store-tabs">
            <nav className="nav nav-pills">
              <button 
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <i className="bi bi-house me-2"></i>
                Visão Geral
              </button>
              <button 
                className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                <i className="bi bi-box me-2"></i>
                Produtos ({products.length})
              </button>
              <button 
                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <i className="bi bi-bag me-2"></i>
                Pedidos ({orders.length})
              </button>
              <button 
                className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                <i className="bi bi-graph-up me-2"></i>
                Relatórios
              </button>
              <button 
                className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <i className="bi bi-gear me-2"></i>
                Configurações
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="store-content">
            {activeTab === 'overview' && (
              <div className="row g-4">
                <div className="col-md-8">
                  <div className="content-card">
                    <div className="card-header">
                      <h4>Atividades Recentes</h4>
                    </div>
                    <div className="card-body">
                      <div className="activity-list">
                        <div className="activity-item">
                          <div className="activity-icon bg-success">
                            <i className="bi bi-plus-circle"></i>
                          </div>
                          <div className="activity-content">
                            <h6>Novo produto adicionado</h6>
                            <p>Furadeira Elétrica Profissional foi adicionada ao catálogo</p>
                            <small className="text-muted">Há 2 horas</small>
                          </div>
                        </div>
                        <div className="activity-item">
                          <div className="activity-icon bg-info">
                            <i className="bi bi-bag-check"></i>
                          </div>
                          <div className="activity-content">
                            <h6>Pedido confirmado</h6>
                            <p>Pedido #12345 foi confirmado e está sendo preparado</p>
                            <small className="text-muted">Há 4 horas</small>
                          </div>
                        </div>
                        <div className="activity-item">
                          <div className="activity-icon bg-warning">
                            <i className="bi bi-star"></i>
                          </div>
                          <div className="activity-content">
                            <h6>Nova avaliação</h6>
                            <p>Você recebeu uma avaliação de 5 estrelas</p>
                            <small className="text-muted">Ontem</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="content-card">
                    <div className="card-header">
                      <h4>Ações Rápidas</h4>
                    </div>
                    <div className="card-body">
                      <div className="quick-actions">
                        <button className="quick-action-btn">
                          <i className="bi bi-plus-circle"></i>
                          <span>Adicionar Produto</span>
                        </button>
                        <button className="quick-action-btn">
                          <i className="bi bi-truck"></i>
                          <span>Processar Envios</span>
                        </button>
                        <button className="quick-action-btn">
                          <i className="bi bi-chat-dots"></i>
                          <span>Mensagens</span>
                        </button>
                        <button className="quick-action-btn">
                          <i className="bi bi-megaphone"></i>
                          <span>Criar Promoção</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="content-card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <h4>Meus Produtos</h4>
                    <p className="text-custom-tertiary mb-0">
                      Gerencie seu catálogo de produtos
                    </p>
                  </div>
                  <button className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>
                    Novo Produto
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table products-table">
                      <thead>
                        <tr>
                          <th>Produto</th>
                          <th>Preço</th>
                          <th>Estoque</th>
                          <th>Status</th>
                          <th>Visualizações</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="product-thumb me-3"
                                  onError={(e) => {
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjlGOUY5Ii8+CjxwYXRoIGQ9Ik0yMCAyNkMyMyAyNiAyNSAyNCAyNSAyMUMyNSAxOCAyMyAxNiAyMCAxNkMxNyAxNiAxNSAxOCAxNSAyMUMxNSAyNCAxNyAyNiAyMCAyNloiIGZpbGw9IiNEQ0ZGRDciLz4KPC9zdmc+';
                                  }}
                                />
                                <div>
                                  <h6 className="mb-1">{product.name}</h6>
                                  <small className="text-muted">{product.category}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <strong className="text-success">
                                R$ {product.price.toFixed(2)}
                              </strong>
                            </td>
                            <td>
                              <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                {product.stock} unidades
                              </span>
                            </td>
                            <td>{getStatusBadge(product.status)}</td>
                            <td>
                              <span className="d-flex align-items-center">
                                <i className="bi bi-eye me-1"></i>
                                {product.views}
                              </span>
                            </td>
                            <td>
                              <div className="btn-group">
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleProductAction(product.id, 'edit')}
                                >
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-info"
                                  onClick={() => handleProductAction(product.id, 'view')}
                                >
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleProductAction(product.id, 'delete')}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="content-card">
                <div className="card-header">
                  <h4>Pedidos Recentes</h4>
                  <p className="text-custom-tertiary mb-0">
                    Gerencie os pedidos da sua loja
                  </p>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table orders-table">
                      <thead>
                        <tr>
                          <th>Pedido</th>
                          <th>Cliente</th>
                          <th>Data</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td>
                              <strong>{order.id}</strong>
                              <br />
                              <small className="text-muted">{order.items} item(s)</small>
                            </td>
                            <td>{order.customer}</td>
                            <td>{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                            <td>{getStatusBadge(order.status)}</td>
                            <td>
                              <strong className="text-success">
                                R$ {order.total.toFixed(2)}
                              </strong>
                            </td>
                            <td>
                              <div className="btn-group">
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleOrderAction(order.id, 'view')}
                                >
                                  <i className="bi bi-eye"></i>
                                </button>
                                {order.status === 'pending' && (
                                  <button 
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => handleOrderAction(order.id, 'process')}
                                  >
                                    <i className="bi bi-check"></i>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="row g-4">
                <div className="col-12">
                  <div className="content-card">
                    <div className="card-header">
                      <h4>Relatórios e Análises</h4>
                      <p className="text-custom-tertiary mb-0">
                        Acompanhe o desempenho da sua loja
                      </p>
                    </div>
                    <div className="card-body text-center py-5">
                      <i className="bi bi-graph-up display-1 text-custom-secondary mb-3"></i>
                      <h5>Relatórios em Desenvolvimento</h5>
                      <p className="text-custom-tertiary">
                        Em breve você terá acesso a relatórios detalhados sobre vendas, 
                        produtos mais vendidos e muito mais.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="content-card">
                <div className="card-header">
                  <h4>Configurações da Loja</h4>
                  <p className="text-custom-tertiary mb-0">
                    Personalize as configurações da sua loja
                  </p>
                </div>
                <div className="card-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label">Nome da Loja</label>
                      <input
                        type="text"
                        className="form-control profile-input"
                        value={userData.store_name || ''}
                        placeholder="Digite o nome da sua loja"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Categoria Principal</label>
                      <select className="form-control profile-input">
                        <option>Ferramentas</option>
                        <option>Eletrônicos</option>
                        <option>Casa e Jardim</option>
                        <option>Esporte</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Descrição da Loja</label>
                      <textarea
                        className="form-control profile-input"
                        rows="4"
                        placeholder="Descreva sua loja e os produtos que você oferece..."
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary">
                        Salvar Configurações
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <FooterComponent />
    </>
  );
};

export default MyStorePage;