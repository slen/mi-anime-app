import React, { useState, useEffect } from 'react';
import { Save, Server, Shield } from 'lucide-react';

const Settings = () => {
  const [apiUrl, setApiUrl] = useState('http://localhost:3001');
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Cargar configuracion guardada al iniciar
    const savedUrl = localStorage.getItem('anime_api_url');
    const savedKey = localStorage.getItem('anime_api_key');
    if (savedUrl) setApiUrl(savedUrl);
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    // Guardar en el almacenamiento del movil (localStorage en Capacitor)
    localStorage.setItem('anime_api_url', apiUrl.replace(/\/$/, ''));
    localStorage.setItem('anime_api_key', apiKey);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Recargar la pagina para aplicar los cambios en toda la app
    window.location.reload();
  };

  return (
    <div className="content-area">
      <h1 className="gradient-text mb-4" style={{ marginBottom: '24px' }}>Ajustes</h1>
      
      <div className="glass-panel p-4" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Server size={20} className="text-accent" style={{ color: 'var(--accent-primary)' }}/>
          Conexión al Servidor
        </h2>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
          Configura la URL donde está alojada tu API de Anime1v (ej. Koyeb, Render o Localhost).
        </p>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
              URL de la API
            </label>
            <input 
              type="url" 
              required
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://tu-api.onrender.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.2)',
                color: 'white',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
              <Shield size={16} />
              API Key (Opcional)
            </label>
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Deja en blanco si usas DISABLE_AUTH=true"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.2)',
                color: 'white',
                outline: 'none'
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <Save size={18} />
            {saved ? '¡Guardado correctamente!' : 'Guardar Configuración'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
