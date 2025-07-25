import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/_menu.scss";

const menuData = {
  entradas: [
    { id: 1, name: "Chupisco", price: "R$ 18,00", description: "Chupisco especial do chefe Eduardo" },
    { id: 2, name: "Caprese", price: "R$ 22,00", description: "Salada de tomate, muçarela e manjericão." },
    { id: 3, name: "Crostini", price: "R$ 19,00", description: "Pãezinhos crocantes cobertos com uma variedade de ingredientes, como patês, queijos e vegetais grelhados." },
  ],
  principais: [
    { id: 4, name: "Risoto de Funghi", price: "R$ 45,00", description: "Risoto cremoso com cogumelos." },
    { id: 5, name: "Lasanha Bolonhesa", price: "R$ 42,00", description: "Lasanha tradicional ao molho bolonhesa." },
    { id: 6, name: "Carbonara", price: "R$ 59,00", description: "Feito com espaguete, guanciale (ou pancetta), gema de ovo, queijo pecorino e pimenta do reino, sem creme de leite." },
  ],
  sobremesas: [
    { id: 7, name: "Tiramisu", price: "R$ 25,00", description: "Sobremesa clássica italiana com café." },
    { id: 8, name: "Panna Cotta", price: "R$ 23,00", description: "Sobremesa cremosa com calda de frutas vermelhas." },
    { id: 9, name: "Cannoli", price: "R$ 16,00", description: "Casquinha crocante em formato de tubo recheada com um creme doce e cremoso à base de ricota." },
  ],
  bebidas: [
    { id: 10, name: "Vinho Tinto", price: "R$ 38,00", description: "Taça de vinho tinto seco." },
    { id: 11, name: "Água com Gás ", price: "R$ 15,00", description: "Água mineral com gás." },
    { id: 12, name: "Limonada Suiça", price: "R$ 8,00", description: "Uma refrescante limonada cremosa com um toque adocicado, feita com limão, açúcar, gelo e leite condensado." },
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
