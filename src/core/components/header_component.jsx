import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "/src/styles/css/header.css";
import Logo from "../../assets/svg/LOGO_1.svg";
import LocationIcon from "../../assets/svg/location_icon.svg";
import productsData from "../../data/products.json";
import "../../styles/css/custom_styles.css";
import { useUser } from "../../context/user_context";
import { toast } from "react-toastify";

function HeaderComponent() {
  const { currentUser, isLoggedIn, logout } = useUser();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const searchRef = useRef(null);
  const userDropdownRef = useRef(null);
  const inputRef = useRef(null);

  const firstName = currentUser ? currentUser.name.split(" ")[0] : "";

  const getAvatarText = () => {
    if (!currentUser) return "";

    const nameParts = currentUser.name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

    return (
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Configuração do Fuse.js para busca
  const fuseOptions = {
    keys: [
      { name: "name", weight: 0.4 },
      { name: "category", weight: 0.3 },
      { name: "description", weight: 0.2 },
      { name: "technical_details", weight: 0.1 },
    ],
    threshold: 0.3,
    distance: 100,
    includeScore: true,
    minMatchCharLength: 2,
    useExtendedSearch: true,
    ignoreLocation: true,
    findAllMatches: true,
  };

  // Inicializa o Fuse.js com memoização
  const fuse = useMemo(() => new Fuse(productsData, fuseOptions), []);

  // Fechar resultados quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }

      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Função debounce para evitar muitas chamadas
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Função de busca com debounce
  const handleSearch = useCallback(
    debounce((value) => {
      setLoading(true);
      try {
        if (value.length >= 2) {
          // Realiza a busca com Fuse.js
          const results = fuse.search(value, { limit: 5 });

          // Organiza os resultados por relevância
          const processedResults = results
            .map(({ item, score }) => ({
              item,
              score,
              relevance: Math.round((1 - score) * 100),
            }))
            .filter((result) => result.relevance > 30); // Filtra resultados com menos de 30% de relevância

          setSearchResults(processedResults);
          setShowResults(true);
        } else {
          setSearchResults([]);
          setShowResults(false);
        }
      } catch (error) {
        console.error("Erro na busca:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [fuse]
  );

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    toast.success("Logout realizado com sucesso!", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/");
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
  };

  // Manipular mudanças no input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  // Navegar para a página do produto
  const handleProductClick = (productId) => {
    setShowResults(false);
    setSearchTerm("");
    navigate(`/produto/${productId}`);
  };

  // Manipular teclas especiais
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowResults(false);
    } else if (e.key === "Enter" && searchResults.length > 0) {
      handleProductClick(searchResults[0].item.id);
    }
  };

  // Função para destacar o texto encontrado
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    try {
      const regex = new RegExp(`(${searchTerm})`, "gi");
      return text.replace(regex, "<mark>$1</mark>");
    } catch {
      return text;
    }
  };

  return (
    <div id="header" className="container-fluid bg-custom-primary text-white">
      <div className="w-100 py-3 d-flex align-items-center justify-content-between">
        {/* Logo e Localização */}
        <div className="d-flex align-items-center col-md-3">
          <Link to="/">
            <img id="logo" src={Logo} alt="Logo" className="me-3" />
          </Link>
          <div id="location" className="d-flex align-items-center">
            <img src={LocationIcon} alt="Location Pin" className="me-2" />
            <span>São Paulo, Brasil</span>
          </div>
        </div>

        {/* Campo de Busca */}
        <div className="col-md-5" ref={searchRef}>
          <div className="d-flex position-relative">
            <div className="input-group">
              <input
                ref={inputRef}
                type="text"
                id="search-input"
                className="form-control"
                placeholder="O que você precisa para fazer seu negócio crescer?"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
              />
              <button
                className="btn bg-white border-start-0"
                onClick={() => inputRef.current?.focus()}
              >
                {loading ? (
                  <i className="bi bi-arrow-clockwise rotating"></i>
                ) : (
                  <i className="bi bi-search"></i>
                )}
              </button>

              {/* Resultados da Busca */}
              {showResults && (
                <ul id="search-results" className="show">
                  {searchResults.length === 0 ? (
                    <li className="text-center py-3">
                      <small className="text-muted">
                        {searchTerm.length < 2
                          ? "Digite pelo menos 2 caracteres"
                          : "Nenhum resultado encontrado"}
                      </small>
                    </li>
                  ) : (
                    searchResults.map(({ item, relevance }) => (
                      <li
                        key={item.id}
                        onClick={() => handleProductClick(item.id)}
                        className="d-flex align-items-center py-2 px-3"
                      >
                        <img
                          src={
                            item.image ||
                            `https://placehold.co/50x50/003321/DCFFD7/png?text=${encodeURIComponent(
                              item.name.charAt(0)
                            )}`
                          }
                          alt={item.name}
                          className="me-2 rounded"
                          style={{ width: "50px", height: "50px" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/50x50/003321/DCFFD7/png?text=${encodeURIComponent(
                              item.name.charAt(0)
                            )}`;
                          }}
                        />
                        <div className="flex-grow-1">
                          <div
                            className="fw-bold text-custom-primary"
                            dangerouslySetInnerHTML={{
                              __html: highlightText(item.name, searchTerm),
                            }}
                          />
                          <small
                            className="text-muted d-block"
                            dangerouslySetInnerHTML={{
                              __html: highlightText(item.category, searchTerm),
                            }}
                          />
                          {item.description && (
                            <small
                              className="text-muted d-block text-truncate"
                              style={{ maxWidth: "300px" }}
                              dangerouslySetInnerHTML={{
                                __html: highlightText(
                                  item.description,
                                  searchTerm
                                ),
                              }}
                            />
                          )}
                        </div>
                        <div className="ms-2 text-end">
                          <small className="text-muted d-block">
                            {relevance}% relevante
                          </small>
                          {item.has_discount && (
                            <span className="badge bg-danger">
                              -{item.discount_percentage}%
                            </span>
                          )}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Ícones e Usuário */}
        <div className="d-flex align-items-center justify-content-end col-md-4">
          <div className="d-flex align-items-center gap-1">
            <Link
              to="/favoritos"
              className="btn outline-custom-secondary text-custom-secondary"
            >
              <i className="bi bi-heart me-2"></i>
              Favoritos
            </Link>

            <Link
              to="/busca-avancada"
              className="btn outline-custom-secondary text-custom-secondary"
            >
              Zé Busca
            </Link>

            {isLoggedIn ? (
              <div
                className="user-menu position-relative"
                ref={userDropdownRef}
              >
                <button
                  className="btn bg-custom-secondary text-custom-primary d-flex align-items-center"
                  onClick={toggleUserDropdown}
                >
                  <div className="user-avatar me-2">{getAvatarText()}</div>
                  <span className="d-none d-md-inline">Olá, {firstName}</span>
                  <i className="bi bi-chevron-down ms-2"></i>
                </button>

                {showUserDropdown && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <div className="d-flex align-items-center">
                        <div className="user-avatar-large me-3">
                          {getAvatarText()}
                        </div>
                        <div>
                          <h6 className="mb-0">{currentUser.name}</h6>
                          <small className="text-muted">
                            {currentUser.email}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="user-dropdown-body">
                      <a href="#" className="user-dropdown-item">
                        <i className="bi bi-person me-2"></i>
                        Meu Perfil
                      </a>
                      {currentUser.is_seller && (
                        <a href="#" className="user-dropdown-item">
                          <i className="bi bi-shop me-2"></i>
                          Minha Loja
                        </a>
                      )}
                      <a href="#" className="user-dropdown-item">
                        <i className="bi bi-gear me-2"></i>
                        Configurações
                      </a>
                      <hr className="dropdown-divider" />
                      <button
                        className="user-dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="btn bg-custom-secondary text-custom-primary"
                >
                  Entrar
                </Link>
                <Link
                  to="/signup"
                  className="btn bg-custom-secondary text-custom-primary"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
