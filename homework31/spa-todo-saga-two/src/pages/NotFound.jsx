import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '75vh' }}>
     
      <div className="custom-card p-5 text-center shadow-lg rounded-4 border-0" style={{ maxWidth: '500px' }}>
        <h1 className="display-1 fw-bold text-primary mb-0">404</h1>
        
        
        <div className="fs-4 fw-medium mb-3" style={{ color: 'var(--text-color)' }}>
          Oops! Page is not found 🔍
        </div>
        
        <p className="mb-4" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        
        <Link to="/" className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;