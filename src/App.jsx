import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import Settings from './components/Settings';
import AnimeDetail from './components/AnimeDetail';
import VideoPlayer from './components/VideoPlayer';
import './index.css';

// Placeholder for Categories
const Categories = () => <div className="content-area"><h1 className="gradient-text">Categorías</h1><p className="text-secondary mt-2">Próximamente: Navegación avanzada por categorías.</p></div>;

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Renderiza el contenido principal */}
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/anime" element={<AnimeDetail />} />
            <Route path="/player" element={<VideoPlayer />} />
          </Routes>
        </main>
        
        {/* Navegación móvil inferior */}
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
