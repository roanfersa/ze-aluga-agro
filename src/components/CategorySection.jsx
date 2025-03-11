import { BiWater } from 'react-icons/bi';
import tractorIcon from '../assets/images/tractor.png';
import droneIcon from '../assets/images/drone.png';
import soilIcon from '../assets/images/soil.png';
import hoeIcon from '../assets/images/hoe.png';
import fertilizerIcon from '../assets/images/fertilizer.png';
import safetyHatIcon from '../assets/images/safety-hat.png';
import creditIcon from '../assets/images/credit.png';
import moneyIcon from '../assets/images/money.png';
import agricultureIcon from '../assets/images/agriculture.png';

const categories = [
  { icon: tractorIcon, title: 'Máquinas de\nPlantio e Colheita', type: 'img' },
  { icon: BiWater, title: 'Equipamento\nde Irrigação', type: 'component' },
  { icon: droneIcon, title: 'Tecnologia de Monitoramento', type: 'img' },
  { icon: soilIcon, title: 'Implemento\nde Solo', type: 'img' },
  { icon: hoeIcon, title: 'Ferramenta\nde Manutenção', type: 'img' },
  { icon: fertilizerIcon, title: 'Processamento e Armazenamento', type: 'img' },
  { icon: safetyHatIcon, title: 'Equipamentos de Proteção (EPIs)', type: 'img' },
  { icon: creditIcon, title: 'Crédito Rural', type: 'img' },
  { icon: moneyIcon, title: 'Educação Financeira', type: 'img' },
  { icon: agricultureIcon, title: 'Planejamento Rural', type: 'img' }
];

const CategorySection = () => {
  return (
    <div id="category_section" className="container mt-5 px-4 mx-auto">
      <div className="row">
        <div className="col-12">
          <h2 className="text-start font-family-primary px-2">Categorias</h2>
        </div>

        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 mt-3 mx-auto">
          {categories.map((category, index) => (
            <div key={index} className="col text-center">
              <a href="#">
                <div className="category_btn col-md-2 me-3">
                  {category.type === 'img' ? (
                    <img 
                      className="d-flex align-items-center justify-content-center mb-1" 
                      src={category.icon} 
                      alt={category.title}
                    />
                  ) : (
                    <category.icon className="d-flex align-items-center justify-content-center mb-1" />
                  )}
                  <p className="text-center">
                    {category.title}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection; 