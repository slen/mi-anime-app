import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Loader } from 'lucide-react';
import { api } from '../api/client';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      // Por defecto busca en animeav1.com, pero esto se puede hacer dinamico
      const response = await api.searchAnime(query);
      if (response && response.data && response.data.results) {
        setResults(response.data.results);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al buscar. Revisa la URL en los Ajustes.');
    } finally {
      setLoading(false);
    }
  };

  const goToDetails = (anime) => {
    // Pasamos la URL del anime a la vista de detalles
    navigate(`/anime?url=${encodeURIComponent(anime.url)}`);
  };

  return (
    <div className="content-area">
      <h1 className="gradient-text mb-4" style={{ marginBottom: '20px' }}>Explorar</h1>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <SearchIcon size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar anime..."
            style={{
              width: '100%',
              padding: '12px 12px 12px 40px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
              color: 'white',
              outline: 'none',
              backdropFilter: 'blur(10px)'
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0 20px' }}>
          Buscar
        </button>
      </form>

      {error && (
        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
          <div className="loader"></div>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
          {results.map((anime) => (
            <div 
              key={anime.url} 
              className="glass-panel"
              onClick={() => goToDetails(anime)}
              style={{ cursor: 'pointer', overflow: 'hidden', transition: 'var(--transition)' }}
            >
              <div style={{ height: '200px', backgroundColor: '#1a1a2e', position: 'relative' }}>
                {anime.image ? (
                  <img src={anime.image} alt={anime.title} className="img-responsive" style={{ height: '100%' }} loading="lazy" />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>Sin Imagen</div>
                )}
                {anime.type && (
                  <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--accent-primary)', color: 'white', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                    {anime.type}
                  </span>
                )}
              </div>
              <div style={{ padding: '12px' }}>
                <h3 style={{ fontSize: '0.9rem', marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {anime.title}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{anime.year || anime.status || 'Desconocido'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && results.length === 0 && query && !error && (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
          No se encontraron resultados para "{query}".
        </div>
      )}
    </div>
  );
};

export default Search;
