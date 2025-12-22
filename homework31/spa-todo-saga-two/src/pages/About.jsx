import React from 'react';

const About = ({ darkMode }) => {
  return (
    <div className="container py-5">
      <div className="custom-card p-4 p-md-5 shadow-sm rounded-4 border-0">
        
        
        <section className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <span className="display-4 me-3">🚀</span>
            <h1 className="fw-bold mb-0">About Project</h1>
          </div>
          
          <p className="lead mb-4">
            <strong>TodoSaga</strong> is a high-performance task management application built to showcase advanced React patterns and professional state management solutions.
          </p>

          <div className="row g-4">
            <div className="col-md-6">
              <h5 className="fw-bold text-primary mb-3">🛠 Tech Stack:</h5>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" alt="Redux" style={{ width: '24px', marginRight: '12px' }} />
                  <span><strong>Redux:</strong> Predictable state container for predictable apps.</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <img src="https://redux-saga.js.org/img/Redux-Saga-Logo-Landscape.png" alt="Saga" style={{ height: '20px', marginRight: '12px', filter: darkMode ? 'brightness(1.5)' : 'none' }} />
                  <span><strong>Redux-Saga:</strong> Powerful middleware for side effects.</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="fs-4 me-2">⚛️</span>
                  <span><strong>React 18:</strong> Modern UI components and hooks.</span>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-primary mb-3">✨ Key Features:</h5>
              <ul className="list-unstyled">
                <li className="mb-3">🌓 <strong>Smart Dark Mode:</strong> Adaptive theme switching with LocalStorage.</li>
                <li className="mb-3">💾 <strong>Data Persistence:</strong> Sagas ensure your tasks are never lost.</li>
                <li className="mb-3">📱 <strong>Adaptive Design:</strong> Optimized for both desktop and mobile use.</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="my-5 opacity-25" />

      
        <section>
          <div className="d-flex align-items-center mb-4">
            <span className="display-4 me-3">🇺🇦</span>
            <h1 className="fw-bold mb-0">Про проєкт</h1>
          </div>
          
          <p className="lead mb-4">
            <strong>TodoSaga</strong> — це потужний інструмент для керування завданнями, створений для демонстрації професійної архітектури та сучасних стандартів веб-розробки.
          </p>

          <div className="row g-4">
            <div className="col-md-6">
              <h5 className="fw-bold text-primary mb-3">🛠 Технологічний стек:</h5>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" alt="Redux" style={{ width: '24px', marginRight: '12px' }} />
                  <span><strong>Redux:</strong> Надійне керування глобальним станом.</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <img src="https://redux-saga.js.org/img/Redux-Saga-Logo-Landscape.png" alt="Saga" style={{ height: '20px', marginRight: '12px', filter: darkMode ? 'brightness(1.5)' : 'none' }} />
                  <span><strong>Redux-Saga:</strong> Обробка складних асинхронних подій.</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="fs-4 me-2">⚛️</span>
                  <span><strong>React 18:</strong> Динамічний та швидкий інтерфейс.</span>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-primary mb-3">✨ Особливості:</h5>
              <ul className="list-unstyled">
                <li className="mb-3">🌓 <strong>Темна тема:</strong> Розумне перемикання зі збереженням вибору.</li>
                <li className="mb-3">💾 <strong>Синхронізація:</strong> Автозбереження даних у реальному часі.</li>
                <li className="mb-3">📱 <strong>Адаптивність:</strong> Комфортна робота на будь-яких пристроях.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;