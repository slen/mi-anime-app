import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MonitorPlay, AlertCircle } from 'lucide-react';
import { api } from '../api/client';

const VideoPlayer = () => {
  const [linksData, setLinksData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Opciones de seleccion
  const [activeLang, setActiveLang] = useState('sub'); // 'sub' o 'dub'
  const [activeServer, setActiveServer] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const url = searchParams.get('url');

  useEffect(() => {
    if (!url) {
      setError('URL de episodio no proporcionada.');
      setLoading(false);
      return;
    }

    const fetchLinks = async () => {
      try {
        const response = await api.getEpisodeLinks(url);
        if (response && response.data) {
          setLinksData(response.data);
          
          // Seleccionar el primer servidor SUB por defecto si existe
          if (response.data.servers?.sub?.length > 0) {
            setActiveLang('sub');
            setActiveServer(response.data.servers.sub[0]);
          } else if (response.data.servers?.dub?.length > 0) {
            setActiveLang('dub');
            setActiveServer(response.data.servers.dub[0]);
          } else {
            setError('No hay servidores disponibles para este episodio.');
          }
        } else {
          setError('No se pudieron obtener los enlaces del episodio.');
        }
      } catch (err) {
        console.error(err);
        setError('Error al conectar con la API.');
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [url]);

  const goBack = () => {
    navigate(-1);
  };

  const handleServerChange = (server) => {
    setActiveServer(server);
  };

  const handleLangChange = (lang) => {
    setActiveLang(lang);
    const serversList = linksData?.servers?.[lang] || [];
    if (serversList.length > 0) {
      setActiveServer(serversList[0]);
    } else {
      setActiveServer(null);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '16px' }}>
        <div className="loader"></div>
        <p style={{ color: 'var(--text-secondary)' }}>Buscando servidores de video...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar Superior del Reproductor */}
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <button onClick={goBack} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
          {linksData?.title || 'Reproduciendo Episodio'}
        </h2>
      </div>

      {/* Contenedor del Reproductor */}
      <div style={{ width: '100%', aspectRatio: '16/9', background: '#111', position: 'relative' }}>
        {error ? (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)', flexDirection: 'column', padding: '20px', textAlign: 'center' }}>
            <AlertCircle size={40} style={{ marginBottom: '16px' }} />
            <p>{error}</p>
          </div>
        ) : activeServer ? (
          <iframe 
            src={activeServer.url} 
            title="Video Player"
            allowFullScreen
            /* El sandboxing estricto previene que el iframe abra popups molestos */
            sandbox="allow-scripts allow-same-origin allow-presentation"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Selecciona un servidor para comenzar a reproducir.
          </div>
        )}
      </div>

      {/* Controles de Selección de Servidor */}
      <div style={{ padding: '20px', flex: 1, background: 'var(--bg-primary)' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MonitorPlay size={20} className="text-accent" style={{ color: 'var(--accent-primary)' }}/>
          Opciones de Reproducción
        </h3>

        {/* Selector Idioma */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            className={`btn ${activeLang === 'sub' ? 'btn-primary' : 'btn-glass'}`}
            style={{ flex: 1 }}
            onClick={() => handleLangChange('sub')}
            disabled={!linksData?.servers?.sub?.length}
          >
            Subtitulado (SUB)
          </button>
          <button 
            className={`btn ${activeLang === 'dub' ? 'btn-primary' : 'btn-glass'}`}
            style={{ flex: 1 }}
            onClick={() => handleLangChange('dub')}
            disabled={!linksData?.servers?.dub?.length}
          >
            Latino (DUB)
          </button>
        </div>

        {/* Lista de Servidores */}
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>Servidores Disponibles:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
          {(linksData?.servers?.[activeLang] || []).map((server, idx) => (
            <button
              key={`${server.server}-${idx}`}
              onClick={() => handleServerChange(server)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                background: activeServer?.url === server.url ? 'rgba(139, 92, 246, 0.2)' : 'var(--bg-tertiary)',
                border: `1px solid ${activeServer?.url === server.url ? 'var(--accent-primary)' : 'transparent'}`,
                color: activeServer?.url === server.url ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'var(--transition)',
                fontWeight: activeServer?.url === server.url ? 'bold' : 'normal',
                fontSize: '0.9rem'
              }}
            >
              {server.server}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
