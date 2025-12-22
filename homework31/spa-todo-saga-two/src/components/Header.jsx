import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ darkMode, toggleTheme }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} shadow-sm mb-4 px-3 py-2`}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center" to="/">
          <span className="me-2" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))' }}>📝</span>
          <span className="brand-text">TodoSaga</span>
        </Link>
        
        <div className="d-flex align-items-center order-lg-3">
          <div className="d-flex align-items-center me-2">
            <div className="form-check form-switch mb-0">
              <input 
                className="form-check-input shadow-none" 
                type="checkbox" 
                role="switch" 
                id="themeSwitch"
                style={{ width: '3.2rem', height: '1.6rem', cursor: 'pointer' }}
                checked={darkMode}
                onChange={toggleTheme}
              />
            </div>
            <label className="form-check-label d-none d-sm-block ms-2 small fw-bold" htmlFor="themeSwitch" style={{ cursor: 'pointer' }}>
              {darkMode ? 'DARK' : 'LIGHT'}
            </label>
          </div>

          <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse justify-content-center order-lg-2" id="navbarNav">
          <ul className="navbar-nav gap-lg-3">
            <li className="nav-item">
              <Link className={`nav-link nav-custom-link ${isActive('/')}`} to="/">Main</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-custom-link ${isActive('/about')}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-custom-link ${isActive('/contacts')}`} to="/contacts">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;