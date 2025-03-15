import "../../../styles/css/home.css";
import "../../../styles/css/custom_styles.css";

const EasierChoiceSection = () => {
  const cards = [
    {
      id: 1,
      icon: 'bi bi-fire',
      title: 'O que está em alta',
      subtitle: 'Produtos',
      gradient: 'bg-gradient-purple'
    },
    {
      id: 2,
      icon: 'bi bi-search',
      title: 'Mais procurados',
      subtitle: 'Produtos',
      gradient: 'bg-gradient-teal'
    },
    {
      id: 3,
      icon: 'bi bi-coin',
      title: 'Investimento para seu negócio',
      subtitle: 'Crédito Rural',
      gradient: 'bg-gradient-red'
    },
    {
      id: 4,
      icon: 'bi bi-clipboard2-data',
      title: 'Administre sua receita',
      subtitle: 'Educação Financeira',
      gradient: 'bg-gradient-orange'
    },
    {
      id: 5,
      icon: 'bi bi-brightness-alt-high',
      title: 'Cultive do jeito certo',
      subtitle: 'Planejamento Rural',
      gradient: 'bg-gradient-pink'
    }
  ];

  return (
    <>
      <div id="easier-choice" className="container my-5">
        <div className="d-flex align-items-center mb-2">
          <h2 className="font-family-primary me-2">
            Saiba o que outros agricultores estão usando
          </h2>
          <span className="badge bg-custom-secondary text-custom-primary">
            Feito para você
          </span>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
          {cards.map((card) => (
            <div key={card.id} className="col">
              <div
                className={`card text-white ${card.gradient} p-3 shadow-sm h-100`}
              >
                <div className="d-flex align-items-center mb-3">
                  <i className={`${card.icon} fs-2`}></i>
                  <div className="ms-3">
                    <h5 className="mb-0">{card.title}</h5>
                    <small>{card.subtitle}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EasierChoiceSection;