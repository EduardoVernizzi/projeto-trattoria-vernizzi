import React from 'react';
import '../styles/loader.scss';

export default function Loader() {
  return (
    <div className="loader-overlay">
      <img 
        src="/logo.png" 
        alt="Logo Carregando" 
        className="loader-logo"
      />
    </div>
  );
}
