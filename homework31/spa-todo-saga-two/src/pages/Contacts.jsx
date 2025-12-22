import React from 'react';

const Contacts = () => {
  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold mb-4">Contacts</h2>
      <div className="custom-card p-5 shadow-sm rounded">
        <p className="fs-5 mb-4">Feel free to reach out to me on professional networks:</p>
        <a 
          href="https://www.linkedin.com/in/petro-lungu-308477384" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg rounded-pill"
        >
          <span className="me-2">🔗</span> View LinkedIn Profile
        </a>
      </div>
    </div>
  );
};

export default Contacts;