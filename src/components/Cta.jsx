import React, { useEffect, useRef } from 'react';
import videoCTA from '../assets/videos/cozinha.mp4'



export default function Cta() {
  return (
    <section className="cta" id='cta'>
      <video
        className="cta__video"
        src={videoCTA}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="cta__content">
        <h2>Experimente o verdadeiro sabor da Itália</h2>
        <p>Peça agora e receba em casa 💚</p>
      </div>
    </section>
  );
}