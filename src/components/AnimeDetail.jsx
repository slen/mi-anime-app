import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { ArrowLeft, Play, Info } from 'lucide-react';

const AnimeDetail = () => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const url = searchParams.get('url');

  useEffect(() => {
    if (!url) {
      setError('URL de anime no proporcionada.');
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const response = await api.getAnimeInfo(url);
        if (response && response.data) {
          setAnime(response.data);
        } else {
          setError('No se encontraron detalles para este anime.');
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar la información del anime.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [url]);

  const goBack = () => {
    navigate(-1);
  };

  const playEpisode = (episodeUrl) => {
    navigate(`/player?url=${encodeURIComponent(episodeUrl)}`);
  };

  if (loading) {
    return (
      <div className="content-area" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="content-area">
        <button onClick={goBack} className="btn btn-glass" style={{ marginBottom: '20px' }}><ArrowLeft size={20} /> Volver</button>
        <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px' }}>
          {error || 'Anime no encontrado'}
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Banner / Poster */}
      <div style={{ 
        position: 'relative', 
        height: '250px', 
        backgroundImage: `linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%), url(${anime.backdrop || anime.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <button 
          onClick={goBack} 
          style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(5px)' }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="content-area" style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', marginBottom: '20px' }}>
          <img src={anime.image} alt={anime.title} style={{ width: '120px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--glass-shadow)', border: '2px solid var(--bg-primary)' }} />
          <div>
            <h1 style={{ fontSize: '1.4rem', marginBottom: '4px', lineHeight: '1.2' }}>{anime.title}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{anime.year} • {anime.type || 'TV'}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          {anime.episodes && anime.episodes.length > 0 && (
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => playEpisode(anime.episodes[0].url)}>
              <Play size={18} fill="currentColor" /> Reproducir Ep. 1
            </button>
          )}
        </div>

        {/* Genres */}
        {anime.genres && anime.genres.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {anime.genres.map((g) => (
              <span key={g.name} style={{ background: 'var(--bg-tertiary)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {g.name}
              </span>
            ))}
          </div>
        )}

        {/* Synopsis */}
        <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Info size={18} className="text-accent" style={{ color: 'var(--accent-primary)' }}/> Sinopsis
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {anime.description || 'No hay sinopsis disponible para este anime.'}
          </p>
        </div>

        {/* Episodes List */}
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Episodios ({anime.totalEpisodes || anime.episodes?.length || 0})</h3>
        
        {anime.episodes && anime.episodes.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {anime.episodes.map((ep) => (
              <div 
                key={ep.url} 
                className="glass-panel" 
                onClick={() => playEpisode(ep.url)}
                style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', cursor: 'pointer', transition: 'var(--transition)' }}
              >
                <div style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-primary)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '16px' }}>
                  {ep.number}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem' }}>{ep.title}</h4>
                </div>
                <Play size={20} style={{ color: 'var(--text-muted)' }} />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No hay episodios disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default AnimeDetail;
