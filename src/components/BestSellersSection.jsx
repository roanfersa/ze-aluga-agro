const BestSellersSection = () => {
  return (
    <div id="best-sellers-section" className="container my-5">
      <h2 className="mb-4">Melhores Vendedores</h2>
      
      <div id="best-sellers-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators custom-indicators"></div>
        <div className="carousel-inner" id="best-sellers-carousel-inner"></div>
        
        <button className="carousel-control-prev custom-control" type="button" data-bs-target="#best-sellers-carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next custom-control" type="button" data-bs-target="#best-sellers-carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>
    </div>
  );
};

export default BestSellersSection; 