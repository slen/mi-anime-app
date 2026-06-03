import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Compass, PlayCircle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  const trendingCategories = [
    { name: 'Acción', color: 'rgba(239, 68, 68, 0.2)', text: '#ef4444' },
    { name: 'Isekai', color: 'rgba(139, 92, 246, 0.2)', text: '#8b5cf6' },
    { name: 'Romance', color: 'rgba(236, 72, 153, 0.2)', text: '#ec4899' },
    { name: 'Comedia', color: 'rgba(245, 158, 11, 0.2)', text: '#f59e0b' }
  ];

  return (
    <div className="content-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Anime App</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>¿Qué vamos a ver hoy?</p>
        </div>
      </div>

      {/* Tarjeta Destacada */}
      <div className="glass-panel" onClick={handleSearchClick} style={{ padding: '24px', position: 'relative', overflow: 'hidden', cursor: 'pointer', marginBottom: '32px' }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Encuentra tu anime favorito</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '16px', maxWidth: '70%' }}>
            Busca en nuestra extensa base de datos y mira episodios en alta calidad.
          </p>
          <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
            <Compass size={16} /> Explorar
          </button>
        </div>
        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1, transform: 'rotate(-15deg)' }}>
          <PlayCircle size={150} />
        </div>
      </div>

      {/* Categorias Populares */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Flame size={20} style={{ color: 'var(--danger)' }} />
          Géneros Populares
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {trendingCategories.map((cat) => (
            <div 
              key={cat.name} 
              className="glass-panel"
              onClick={handleSearchClick}
              style={{ 
                padding: '16px', 
                textAlign: 'center', 
                cursor: 'pointer',
                background: cat.color,
                border: `1px solid ${cat.text}`,
                fontWeight: 'bold',
                color: cat.text,
                transition: 'var(--transition)'
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>
      
      {/* Guia Rapida */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Configuración Inicial</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          Antes de comenzar, asegúrate de ir a <strong>Ajustes</strong> y colocar la URL de tu API en Render o tu dirección Localhost para que el buscador funcione correctamente.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
