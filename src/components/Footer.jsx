import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import '../styles/_footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__about">
          <h3 className="footer__title">Trattoria Vernizzi</h3>
          <p className="footer__description">
            Um pedacinho da Itália no seu prato. Sabores autênticos e um ambiente acolhedor desde 1998.
          </p>
          <div className="footer__socials" aria-label="Redes sociais">
            <FaFacebookF className="footer__icon" aria-hidden="true" />
            <FaInstagram className="footer__icon" aria-hidden="true" />
            <FaTwitter className="footer__icon" aria-hidden="true" />
            <FaLinkedinIn className="footer__icon" aria-hidden="true" />
          </div>
        </div>

        <nav className="footer__nav" aria-label="Links úteis">
          <h4 className="footer__subtitle">Links úteis</h4>
          <ul>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </nav>
      </div>

      <div className="footer__bottom">
      <p>© {new Date().getFullYear()} Carlos Eduardo Vernizzi Silva. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}