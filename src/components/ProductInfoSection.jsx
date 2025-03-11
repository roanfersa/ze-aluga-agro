const ProductInfoSection = () => {
  return (
    <div id="product-info-section" className="container my-5">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {/* Card 1 */}
        <div className="col">
          <div className="card h-100 p-3 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-start mb-3">
                <div className="color-bar bg-blue me-2"></div>
                <h6 className="card-title mb-0">Produtos para melhor a irrigação</h6>
              </div>
              <div className="product-thumbnail bg-secondary mx-auto rounded"></div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col">
          <div className="card h-100 p-3 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-start mb-3">
                <div className="color-bar bg-pink me-2"></div>
                <h6 className="card-title mb-0">Acabe com pragas e infestações</h6>
              </div>
              <div className="product-thumbnail bg-secondary mx-auto rounded"></div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col">
          <div className="card h-100 p-3 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-start mb-3">
                <div className="color-bar bg-purple me-2"></div>
                <h6 className="card-title mb-0">Frutos maiores e em mais quantidade</h6>
              </div>
              <div className="product-thumbnail bg-secondary mx-auto rounded"></div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col">
          <div className="card h-100 p-3 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-start mb-3">
                <div className="color-bar bg-red me-2"></div>
                <h6 className="card-title mb-0">Estratégias de crescimento</h6>
              </div>
              <div className="product-thumbnail bg-secondary mx-auto rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection; 