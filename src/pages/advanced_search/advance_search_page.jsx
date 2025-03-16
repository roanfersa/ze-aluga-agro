import React, { useState, useEffect } from "react";
import HeaderComponent from "../../core/components/header_component";
import FooterComponent from "../../core/components/footer_component";
import ProductCard from "../home/components/ProductCard";
import DataService from "../../services/data_service";
import "../../styles/css/advanced_search.css";
import "../../styles/css/custom_styles.css";

const AdvancedSearchPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    availability: "",
    hasDiscount: false,
    minRating: "",
    searchTerm: "",
  });

  const [activeFilters, setActiveFilters] = useState([]);

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = DataService.getAllProducts();
        setAllProducts(products);
        setFilteredProducts(products);

        const uniqueCategories = [
          ...new Set(products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);

        const uniqueLocations = [
          ...new Set(
            products.map((product) => {
              const locationParts = product.location.split(",");
              return locationParts[0].trim();
            })
          ),
        ];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFilters((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...allProducts];
    const activeFiltersList = [];

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
      activeFiltersList.push({ key: "category", value: filters.category });
    }

    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      filtered = filtered.filter((product) => {
        const numericPrice = parseFloat(
          product.price
            .replace("R$", "")
            .replace(".", "")
            .replace(",", ".")
            .trim()
        );
        return numericPrice >= minPrice;
      });
      activeFiltersList.push({
        key: "minPrice",
        value: `Min: R$ ${filters.minPrice}`,
      });
    }

    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      filtered = filtered.filter((product) => {
        const numericPrice = parseFloat(
          product.price
            .replace("R$", "")
            .replace(".", "")
            .replace(",", ".")
            .trim()
        );
        return numericPrice <= maxPrice;
      });
      activeFiltersList.push({
        key: "maxPrice",
        value: `Max: R$ ${filters.maxPrice}`,
      });
    }

    if (filters.location) {
      filtered = filtered.filter((product) =>
        product.location.includes(filters.location)
      );
      activeFiltersList.push({ key: "location", value: filters.location });
    }

    if (filters.availability) {
      if (filters.availability === "available") {
        filtered = filtered.filter((product) => product.is_available);
        activeFiltersList.push({ key: "availability", value: "Disponível" });
      } else if (filters.availability === "unavailable") {
        filtered = filtered.filter((product) => !product.is_available);
        activeFiltersList.push({ key: "availability", value: "Indisponível" });
      }
    }

    if (filters.hasDiscount) {
      filtered = filtered.filter((product) => product.has_discount);
      activeFiltersList.push({ key: "hasDiscount", value: "Com desconto" });
    }

    if (filters.minRating) {
      const minRating = parseFloat(filters.minRating);
      filtered = filtered.filter((product) => product.rating >= minRating);
      activeFiltersList.push({
        key: "minRating",
        value: `${filters.minRating}★ ou mais`,
      });
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
      activeFiltersList.push({ key: "searchTerm", value: filters.searchTerm });
    }

    setFilteredProducts(filtered);
    setActiveFilters(activeFiltersList);
  };

  const clearFilter = (filterKey) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: filterKey === "hasDiscount" ? false : "",
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      location: "",
      availability: "",
      hasDiscount: false,
      minRating: "",
      searchTerm: "",
    });
    setFilteredProducts(allProducts);
    setActiveFilters([]);
  };

  return (
    <>
      <HeaderComponent />
      <div className="container-fluid py-4">
        <div className="row">
          <div className="d-lg-none d-flex justify-content-between align-items-center mb-3 px-3">
            <h1 className="text-custom-primary font-family-primary h3 mb-0">
              Busca Avançada
            </h1>
            <button
              className="btn bg-custom-primary text-custom-secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className="bi bi-sliders me-2"></i>
              {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
            </button>
          </div>

          <div
            className={`col-lg-3 filters-sidebar ${showFilters ? "show" : ""}`}
          >
            <div className="filter-container">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-custom-primary font-family-primary h4 mb-0">
                  Filtros
                </h2>
                <button
                  className="btn btn-link text-custom-primary p-0"
                  onClick={clearAllFilters}
                >
                  Limpar Filtros
                </button>
              </div>

              <div className="filter-group mb-4">
                <label
                  htmlFor="searchTerm"
                  className="font-family-secondary fw-bold mb-2"
                >
                  Palavra-chave
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    id="searchTerm"
                    name="searchTerm"
                    className="form-control"
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                    placeholder="Buscar por nome, descrição..."
                  />
                  <button className="btn bg-custom-primary text-custom-secondary">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>

              <div className="filter-group mb-4">
                <label
                  htmlFor="category"
                  className="font-family-secondary fw-bold mb-2"
                >
                  Categoria
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">Todas as categorias</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group mb-4">
                <label className="font-family-secondary fw-bold mb-2">
                  Faixa de Preço
                </label>
                <div className="row">
                  <div className="col-6">
                    <input
                      type="number"
                      id="minPrice"
                      name="minPrice"
                      className="form-control"
                      placeholder="Min (R$)"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      id="maxPrice"
                      name="maxPrice"
                      className="form-control"
                      placeholder="Max (R$)"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>

              <div className="filter-group mb-4">
                <label
                  htmlFor="location"
                  className="font-family-secondary fw-bold mb-2"
                >
                  Localização
                </label>
                <select
                  id="location"
                  name="location"
                  className="form-select"
                  value={filters.location}
                  onChange={handleFilterChange}
                >
                  <option value="">Todas as localizações</option>
                  {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group mb-4">
                <label
                  htmlFor="availability"
                  className="font-family-secondary fw-bold mb-2"
                >
                  Disponibilidade
                </label>
                <select
                  id="availability"
                  name="availability"
                  className="form-select"
                  value={filters.availability}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos os produtos</option>
                  <option value="available">Disponíveis</option>
                  <option value="unavailable">Indisponíveis</option>
                </select>
              </div>

              <div className="filter-group mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="hasDiscount"
                    name="hasDiscount"
                    checked={filters.hasDiscount}
                    onChange={handleFilterChange}
                  />
                  <label
                    className="form-check-label font-family-secondary"
                    htmlFor="hasDiscount"
                  >
                    Mostrar apenas produtos com desconto
                  </label>
                </div>
              </div>

              <div className="filter-group mb-4">
                <label
                  htmlFor="minRating"
                  className="font-family-secondary fw-bold mb-2"
                >
                  Avaliação mínima
                </label>
                <select
                  id="minRating"
                  name="minRating"
                  className="form-select"
                  value={filters.minRating}
                  onChange={handleFilterChange}
                >
                  <option value="">Qualquer avaliação</option>
                  <option value="4.5">4.5★ ou mais</option>
                  <option value="4">4★ ou mais</option>
                  <option value="3.5">3.5★ ou mais</option>
                  <option value="3">3★ ou mais</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="products-container">
              {/* Header with results count and active filters */}
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                <h1 className="text-custom-primary font-family-primary h3 d-none d-lg-block">
                  Busca Avançada
                </h1>
                <div className="results-count">
                  <span className="text-muted">
                    {filteredProducts.length}
                    {filteredProducts.length === 1
                      ? " produto encontrado"
                      : " produtos encontrados"}
                  </span>
                </div>
              </div>

              {activeFilters.length > 0 && (
                <div className="active-filters mb-4">
                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    <span className="font-family-secondary fw-bold">
                      Filtros ativos:
                    </span>
                    {activeFilters.map((filter, index) => (
                      <div
                        key={index}
                        className="filter-tag d-flex align-items-center"
                      >
                        <span>{filter.value}</span>
                        <button
                          className="btn-close ms-2"
                          onClick={() => clearFilter(filter.key)}
                          aria-label={`Remover filtro ${filter.value}`}
                        ></button>
                      </div>
                    ))}
                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={clearAllFilters}
                    >
                      Limpar todos
                    </button>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-custom-primary"
                    role="status"
                  >
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-5 empty-results">
                  <i className="bi bi-search display-1 text-muted"></i>
                  <h2 className="text-custom-primary font-family-primary mt-3">
                    Nenhum produto encontrado
                  </h2>
                  <p className="text-muted">
                    Tente ajustar seus filtros para encontrar o que procura.
                  </p>
                  <button
                    className="btn bg-custom-primary text-custom-secondary mt-3"
                    onClick={clearAllFilters}
                  >
                    Limpar todos os filtros
                  </button>
                </div>
              ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default AdvancedSearchPage;
