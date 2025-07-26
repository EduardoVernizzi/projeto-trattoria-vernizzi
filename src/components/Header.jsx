import React, { useState } from 'react';
import { FaBars, FaTimes, FaShoppingCart, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useCart } from './CartContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


import '../styles/_header.scss';
import logo from '/logo.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, totalQuantity, addToCart, removeFromCart, decreaseQuantity, clearCart } = useCart();

  const cartTotal = cartItems.reduce((total, item) => {
    const priceNumber = Number(item.price.replace(/[^\d,]/g, '').replace(',', '.'));
    return total + priceNumber * item.quantity;
  }, 0);


  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => {
      if (!prev && cartOpen) setCartOpen(false);
      return !prev;
    });
  };

  const toggleCart = () => {
    setCartOpen((prev) => {
      if (!prev && isMobileMenuOpen) setIsMobileMenuOpen(false);
      return !prev;
    });
  };

  const scrollToSection = (e, targetId) => {
    e.preventDefault();

    if (targetId === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setTimeout(() => setIsMobileMenuOpen(false), 300);
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) return;

    const offset = window.innerWidth <= 768 ? 10 : 60;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: targetPosition - offset,
      behavior: 'smooth',
    });

    setTimeout(() => setIsMobileMenuOpen(false), 300);
  };

  const handleFinishPurchase = () => {
    setCartOpen(false);

    const cartTotal = cartItems.reduce((total, item) => {
      const cleanPrice = parseFloat(item.price.toString().replace(/[^\d,]/g, "").replace(",", "."));
      return total + cleanPrice * item.quantity;
    }, 0);

    const form = document.createElement("form");
    form.className = "container mt-3";

    const nome = document.createElement("input");
    nome.className = "form-control mb-2";
    nome.type = "text";
    nome.placeholder = "Nome completo";
    nome.required = true;

    const endereco = document.createElement("input");
    endereco.className = "form-control mb-2";
    endereco.type = "text";
    endereco.placeholder = "Endereço (ex: Rua das Flores, 123)";
    endereco.required = true;

    const telefone = document.createElement("input");
    telefone.className = "form-control mb-2";
    telefone.type = "tel";
    telefone.placeholder = "Telefone";
    telefone.required = true;
    telefone.addEventListener("input", (e) => {
      let phoneValue = e.target.value.replace(/\D/g, "");
      if (phoneValue.length > 11) phoneValue = phoneValue.slice(0, 11);
      if (phoneValue.length > 2) phoneValue = `(${phoneValue.slice(0, 2)}) ${phoneValue.slice(2)}`;
      if (phoneValue.length > 10) phoneValue = `${phoneValue.slice(0, 10)}-${phoneValue.slice(10)}`;
      e.target.value = phoneValue;
    });

    const pagamentoSelect = document.createElement("select");
    pagamentoSelect.className = "form-select mb-3";
    pagamentoSelect.required = true;
    pagamentoSelect.style.maxWidth = "90%";
    pagamentoSelect.style.boxSizing = "border-box";
    pagamentoSelect.innerHTML = `
      <option value="" disabled selected>Forma de pagamento</option>
      <option value="cartao">Cartão</option>
      <option value="pix">PIX</option>
      <option value="dinheiro">Dinheiro</option>
    `;

    const cartaoFields = document.createElement("div");
    cartaoFields.className = "row g-2 mb-3";
    cartaoFields.style.display = "none";

    const numeroCartao = document.createElement("input");
    numeroCartao.type = "text";
    numeroCartao.placeholder = "Número do cartão";
    numeroCartao.className = "form-control";
    numeroCartao.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").slice(0, 16);
      val = val.match(/.{1,4}/g)?.join(" ") || val;
      e.target.value = val;
    });

    const validadeCartao = document.createElement("input");
    validadeCartao.type = "text";
    validadeCartao.placeholder = "Validade (MM/aa)";
    validadeCartao.className = "form-control";
    validadeCartao.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").slice(0, 4);
      if (val.length >= 3) {
        val = val.slice(0, 2) + "/" + val.slice(2);
      }
      e.target.value = val;
    });

    const cvvCartao = document.createElement("input");
    cvvCartao.type = "text";
    cvvCartao.placeholder = "CVV";
    cvvCartao.className = "form-control";
    cvvCartao.maxLength = 3;
    cvvCartao.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
    });

    const pixInfo = document.createElement("p");
    pixInfo.className = "text-success fw-semibold";
    pixInfo.textContent = "Chave PIX: trattoria@vernizzi.com";
    pixInfo.style.display = "none";

    const dinheiroInfo = document.createElement("input");
    dinheiroInfo.className = "form-control mb-2";
    dinheiroInfo.placeholder = "Troco para quanto?";
    dinheiroInfo.type = "text";
    dinheiroInfo.style.display = "none";
    dinheiroInfo.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").slice(0, 5);
      let int = val.padStart(3, "0");
      let formatted = (parseInt(int, 10) / 100).toFixed(2);
      e.target.value = `R$ ${formatted.replace(".", ",")}`;
    });

    pagamentoSelect.addEventListener("change", () => {
      const forma = pagamentoSelect.value;

      cartaoFields.style.display = "none";
      pixInfo.style.display = "none";
      dinheiroInfo.style.display = "none";

      numeroCartao.required = false;
      validadeCartao.required = false;
      cvvCartao.required = false;
      dinheiroInfo.required = false;

      if (forma === "cartao") {
        cartaoFields.style.display = "flex";
        numeroCartao.required = true;
        validadeCartao.required = true;
        cvvCartao.required = true;
      } else if (forma === "pix") {
        pixInfo.style.display = "block";
      } else if (forma === "dinheiro") {
        dinheiroInfo.style.display = "block";
        dinheiroInfo.required = true;
      }
    });

    cartaoFields.append(numeroCartao, validadeCartao, cvvCartao);

    const itensResumo = cartItems.map((item) => {
      const cleanPrice = parseFloat(item.price.toString().replace(/[^\d,]/g, "").replace(",", "."));
      return `<li class="list-group-item">${item.name} x${item.quantity} - R$ ${(cleanPrice * item.quantity).toFixed(2).replace(".", ",")}</li>`;
    }).join("");

    const resumo = document.createElement("div");
    resumo.className = "mt-4";
    resumo.innerHTML = `
      <div class="card">
        <div class="card-header fw-bold">Resumo do Pedido</div>
        <ul class="list-group list-group-flush">${itensResumo}</ul>
        <div class="card-footer fw-bold">Total: R$ ${cartTotal.toFixed(2).replace(".", ",")}</div>
      </div>
    `;

    const actions = document.createElement("div");
    actions.className = "d-flex justify-content-end gap-2 mt-3";

    const finalizarBtn = document.createElement("button");
    finalizarBtn.type = "submit";
    finalizarBtn.className = "btn btn-success";
    finalizarBtn.innerText = "Finalizar Pedido";

    const cancelarBtn = document.createElement("button");
    cancelarBtn.type = "button";
    cancelarBtn.className = "btn btn-outline-secondary";
    cancelarBtn.innerText = "X";
    cancelarBtn.addEventListener("click", () => Swal.close());

    actions.append(cancelarBtn, finalizarBtn);

    form.append(
      nome,
      endereco,
      telefone,
      pagamentoSelect,
      cartaoFields,
      pixInfo,
      dinheiroInfo,
      resumo,
      actions
    );

    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 576px) {
        .swal2-popup {
          width: 95% !important;
          padding: 1rem !important;
        }
        .swal2-html-container .container,
        .swal2-html-container input,
        .swal2-html-container select {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          font-size: 14px !important;
        }
        .swal2-html-container .row {
          flex-direction: column !important;
          gap: 0.5rem;
        }
      }
    `;
    document.head.appendChild(style);

    Swal.fire({
      title: "Finalizar Pedido",
      html: form,
      showConfirmButton: false,
      showCloseButton: true,
      customClass: {
        popup: 'p-2 p-md-4 text-start',
      },
      didOpen: () => {
        nome.focus();
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      Swal.fire({
        icon: "success",
        title: "Pedido finalizado com sucesso!",
        text: "Aguarde nosso contato para confirmação.",
        timer: 3000,
        showConfirmButton: false
      }).then(() => {
        clearCart();
        setCartOpen(false);
      });
    });
  };

  return (
    <header className="header">
      <div className="left-section">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
        />

        <nav className="nav-desktop">
          <button className="btn-link" onClick={(e) => scrollToSection(e, 'top')}>Início</button>
          <button className="btn-link" onClick={(e) => scrollToSection(e, 'menu')}>Menu</button>
          <button className="btn-link" onClick={(e) => scrollToSection(e, 'about')}>Sobre</button>
          <button className="btn-link" onClick={(e) => scrollToSection(e, 'contact')}>Contato</button>
        </nav>
      </div>

      <div className="right-section">
        <div className="cart-wrapper">
          <div className="cart-icon-container" onClick={toggleCart}>
            <FaShoppingCart className="cart-icon" />
            {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
          </div>

          {cartOpen && (
            <div className="cart-dropdown">
              {cartItems.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
              ) : (
                <>
                  <ul className="cart-list">
                    {cartItems.map((item) => {
                      // Preço sem "R$ " para cálculo simples
                      const priceNumber = Number(item.price.replace(/[^\d,]/g, '').replace(',', '.'));
                      const totalItem = (priceNumber * item.quantity).toFixed(2).replace('.', ',');
                      return (
                        <li key={item.id} className="cart-item">
                          <div className="cart-item-info">
                            <span className="cart-item-name">{item.name}</span>
                            <span className="cart-item-price"> {item.price}</span>
                          </div>
                          <div className="cart-item-qty">
                            <button onClick={() => decreaseQuantity(item.id)} aria-label="Diminuir quantidade"><FaMinus /></button>
                            <span>{item.quantity}</span>
                            <button onClick={() => addToCart({ ...item, quantity: 1 }, false)} aria-label="Adicionar quantidade"><FaPlus /></button>
                            <button onClick={() => removeFromCart(item.id)} aria-label="Remover item" className="remove-btn"><FaTrash /></button>
                          </div>
                          <div className="cart-item-total">Total: R$ {totalItem}</div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="cart-total">
                    <strong>Total geral:</strong> R$ {cartTotal.toFixed(2).replace('.', ',')}
                  </div>
                  <button className="btn-finish" onClick={handleFinishPurchase}>Ir para Pagamento</button>
                </>
              )}
            </div>
          )}
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="mobile-menu">
          <button className="btn-link" onClick={(e) => scrollToSection(e, 'top')}>Início</button>
          <button className="btn-link" onClick={(e) => scrollToSection(e, 'menu')}>Menu</button>
          <button className="btn-link" onClick={(e) => scrollToSection(e, 'about')}>Sobre</button>
          <button className="btn-link" onClick={(e) => scrollToSection(e, 'contact')}>Contato</button>
        </nav>
      )}
    </header>
  );
};

export default Header;
