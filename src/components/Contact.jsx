import React from 'react';
import '../styles/_contact.scss';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <div className="contact__content">
          <div className="contact__info">
            <h2 className="contact__title">Entre em Contato</h2>
            <p className="contact__subtitle">Será um prazer atender você</p>

            <ul className="contact__list">
              <li><strong>Endereço:</strong> Rua Itália, 123 – São Paulo, SP</li>
              <li><strong>Telefone:</strong> (11) 91234-5678</li>
              <li><strong>Email:</strong> contato@trattoriavernizzi.com.br</li>
              <li>
                <strong>Horários:</strong>
                <ul className="contact__hours">
                  <li>Seg a Sex: 11h30 – 15h / 18h – 22h30</li>
                  <li>Sábado: 12h – 23h</li>
                  <li>Domingos e feriados: 12h – 17h</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="contact__map">
            <iframe
              title="Mapa Trattoria Vernizzi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.8059054647256!2d-46.65216658502105!3d-23.57751258467324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c5f2444b15%3A0xdea3ed918ec2995a!2sRua%20It%C3%A1lia%2C%20123%20-%20S%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1591228512345"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;