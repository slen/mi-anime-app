import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, PlaySquare, Settings } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const navItems = [
    { id: 'home', path: '/', icon: <Home size={24} />, label: 'Inicio' },
    { id: 'search', path: '/search', icon: <Search size={24} />, label: 'Buscar' },
    { id: 'categories', path: '/categories', icon: <PlaySquare size={24} />, label: 'Categorías' },
    { id: 'settings', path: '/settings', icon: <Settings size={24} />, label: 'Ajustes' }
  ];

  return (
    <nav className="mobile-nav glass-panel">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <NavLink 
              to={item.path} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <div className="nav-icon-container">
                {item.icon}
              </div>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
