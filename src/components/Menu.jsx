import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const menuData = {
  entradas: [
    { id: 1, name: "Bruschetta Tradizionale", price: "R$ 28,00", description: "Fatias de pão italiano crocante, levemente tostadas e cobertas com tomate fresco em cubos, manjericão, azeite extravirgem e toque de alho." },
    { id: 2, name: "Arancini Siciliani", price: "R$ 34,00", description: "Clássicos bolinhos de risoto recheados com muçarela derretida e ragù de carne, empanados e fritos até ficarem dourados. Servidos com molho de tomate caseiro." },
    { id: 3, name: "Carpaccio di Manzo", price: "R$ 42,00", description: "Finas lâminas de filé-mignon cru, temperadas com limão siciliano, rúcula fresca, lascas de parmesão e um fio de azeite trufado." },
    { id: 4, name: "Frittura di Calamari", price: "R$ 38,00", description: "Anéis de lula empanados e fritos, crocantes por fora e macios por dentro. Servidos com limão siciliano e molho aioli artesanal." },
  ],
  principais: [
    { id: 5, name: "Tagliatelle alla Bolognese", price: "R$ 58,00", description: "Massa fresca tipo tagliatelle envolvida em um clássico ragù de carne bovina e suína, cozido lentamente com tomate italiano e ervas. Finalizado com queijo parmesão ralado na hora." },
    { id: 6, name: "Risotto al Funghi Porcin", price: "R$ 64,00", description: "Arroz arbório cremoso preparado com funghi porcini importado, caldo artesanal, vinho branco e finalizado com manteiga trufada e lascas de parmesão." },
    { id: 7, name: "Polpetone alla Parmigiana", price: "R$ 62,00", description: "Clássico polpetone de carne recheado com muçarela, empanado e coberto com molho de tomate rústico e queijo gratinado. Servido com espaguete na manteiga e sálvia." },
    { id: 8, name: "Spaghetti alla Carbonara", price: "R$ 59,00", description: "Autêntica receita romana feita com spaghetti al dente, guanciale crocante, ovos frescos, queijo pecorino romano e pimenta-do-reino moída na hora. Sem creme de leite, como manda a tradição." },
  ],
  sobremesas: [
    { id: 9, name: "Tiramisù Classico", price: "R$ 28,00", description: "Camadas de biscoitos embebidos em café espresso, creme mascarpone leve e aerado, polvilhado com cacau 100%. Um clássico italiano irresistível." },
    { id: 10, name: "Panna Cotta ai Frutti Rossi ", price: "R$ 23,00", description: "Delicado creme cozido de baunilha com textura suave, servido com coulis de frutas vermelhas frescas. Refrescante e elegante." },
    { id: 11, name: "Cannoli Siciliani", price: "R$ 30,00", description: "Massa crocante frita recheada com ricota doce cremosa, gotas de chocolate amargo e toque de laranja cristalizada. Polvilhado com açúcar de confeiteiro." },
    { id: 12, name: "Gelato Artigianale", price: "R$ 22,00", description: "Autêntico gelato italiano artesanal, feito com ingredientes naturais. Sabores disponíveis: pistache, nocciola, baunilha de Madagascar e chocolate meio amargo." },
  ],
  bebidas: [
    { id: 13, name: "Chianti", price: "R$ 118,00", description: "Garrafa de vinho tinto seco Chianti DOCG - Toscana." },
    { id: 14, name: "Suco Del Valle", price: "R$ 8,00", description: "Disponível em vários sabores: uva, manga, maracujá, goiaba, além da linha Del Valle 100% Fruta." },
    { id: 15, name: "Refrigerantes", price: "R$ 8,00", description: "Servidos em lata (350ml)." },
    { id: 16, name: "Água Mineral", price: "R$ 5,00", description: "Água mineral com ou sem gás." },
  ],
};

export default function Menu({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("entradas");
  const [quantities, setQuantities] = useState({});

  const incrementQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrementQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const handleAdd = (item) => {
    const quantity = quantities[item.id] || 1;
    if (onAddToCart) {
      onAddToCart({ ...item, quantity });
    }
    // Resetar quantidade do item para 1 após adicionar
    setQuantities((prev) => ({
      ...prev,
      [item.id]: 1,
    }));
  };

  return (
    <section id="menu" className="menu">
      <h2 className="menu__title">Nosso Menu</h2>

      <nav className="menu__nav">
        {Object.keys(menuData).map((category) => (
          <button
            key={category}
            className={`menu__nav-btn ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="menu__items"
        >
          {menuData[activeCategory].map(({ id, name, description, price }) => (
            <div key={id} className="menu__item">
              <div>
                <h3 className="menu__item-name">{name}</h3>
                <p className="menu__item-desc">{description}</p>
              </div>
              <div className="menu__item-action">
                <span className="menu__item-price">{price}</span>

                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decrementQty(id)}
                    aria-label={`Diminuir quantidade de ${name}`}
                  >
                    -
                  </button>
                  <span className="qty-display">{quantities[id] || 1}</span>
                  <button
                    className="qty-btn"
                    onClick={() => incrementQty(id)}
                    aria-label={`Aumentar quantidade de ${name}`}
                  >
                    +
                  </button>
                </div>

                <button
                  className="menu__add-btn"
                  onClick={() => handleAdd({ id, name, price })}
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
