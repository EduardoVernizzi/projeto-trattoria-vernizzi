import React from "react";

import chefImage from '../assets/chefe.png';
import trattoriaImage from '../assets/trattoria.jpg';

import '../styles/_about.scss';

export default function About() {
  return (
    <section className="about" id="about">
      <h2 className="about__title">Sobre a Trattoria Vernizzi</h2>
      <p className="about__subtitle">A tradição italiana em cada prato</p>

      <div className="about__content">
      <div className="about__text">
  <p>
    Fundada em 1999, a <span className="highlight">Trattoria Vernizzi</span> carrega a essência da culinária italiana tradicional, preservando receitas originais passadas por gerações da família Vernizzi, diretamente da região da Lombardia.
  </p>
  <p>
    Nosso chef e proprietário, Giovanni Vernizzi, é um verdadeiro mestre da cozinha italiana. Com mais de 30 anos de experiência, Giovanni dedica sua vida a preparar pratos que combinam técnicas clássicas com toques contemporâneos, sempre utilizando ingredientes frescos e selecionados cuidadosamente de fornecedores locais e importados da Itália.
  </p>
  <p>
    Na Trattoria Vernizzi, acreditamos que a comida é uma expressão de cultura e afeto. Cada prato é preparado com amor, buscando transportar nossos clientes a uma autêntica experiência italiana, onde o sabor e a história se encontram na mesa.
  </p>
  <p>
    Nossa missão é oferecer um ambiente acolhedor e elegante, onde amigos e famílias possam celebrar momentos especiais enquanto desfrutam de uma gastronomia rica, sofisticada e cheia de tradição.
  </p>
  <p>
    Além disso, prezamos pela sustentabilidade e responsabilidade ambiental, adotando práticas que minimizam o desperdício e valorizam o que há de melhor na natureza.
  </p>
</div>

        <div className="about__images">
          <img src={chefImage} alt="Chef Giovanni Vernizzi" className="about__image" />
          <img src={trattoriaImage} alt="Interior da Trattoria Vernizzi" className="about__image" />
        </div>
      </div>
    </section>
  );
}
