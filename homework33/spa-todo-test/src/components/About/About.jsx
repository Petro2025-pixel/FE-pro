import { useContext } from 'react';
import { ThemeContext } from '../../themeContext'; 

const About = () => {
  const { theme } = useContext(ThemeContext);
  const contentClass = "w-75 mx-auto p-4"; 
  const headingStyle = { color: theme.color };
  
  const sectionStyle = { 
    background: 'rgba(0,0,0,0.03)',
    borderLeft: `5px solid ${theme.color}` 
  };

  return (
     <div style={headingStyle}>
      <h1 className="my-5 text-center fw-bold">Project Overview</h1>
      
      <div className={contentClass}>
        <section className="mb-5 shadow-sm p-4 rounded" style={sectionStyle}>
          <h2 className="mb-3 text-primary">
            🚀 Smart TODO Manager
          </h2>
          <p className="lead">A robust task management application focused on clean code architecture and user experience.</p>
          
          <ul className="list-unstyled ms-3">
            <li className="mb-2">💻 <strong>Core Stack:</strong> Developed with React.js, Vite, and Bootstrap 5.</li>
            <li className="mb-2">🌓 <strong>Advanced Theming:</strong> Dynamic Light/Dark mode switching via Context API.</li>
            <li className="mb-2">📂 <strong>Smart Storage:</strong> Persistent data handling using LocalStorage.</li>
            <li className="mb-2">🛠️ <strong>Reliability:</strong> Protected by Error Boundaries and strict input validation.</li>
            <li className="mb-2">🧪 <strong>Testing:</strong> High quality assurance with Vitest and React Testing Library.</li>
          </ul>
        </section>

        <hr className="my-5" style={{ borderColor: theme.color, opacity: 0.5, borderWidth: '2px' }}/>
        
        <section className="shadow-sm p-4 rounded" style={sectionStyle}>
          <h2 className="mb-3 text-warning">
            🇺🇦 Потужний TODO Менеджер
          </h2>
          <p className="lead">Сучасний додаток для керування завданнями з акцентом на архітектуру та зручність.</p>
          
          <ul className="list-unstyled ms-3">
            <li className="mb-2">💻 <strong>Технології:</strong> Побудовано на React.js, Vite та Bootstrap 5.</li>
            <li className="mb-2">🌓 <strong>Теми:</strong> Динамічне перемикання колірних схем через Context API.</li>
            <li className="mb-2">📂 <strong>Дані:</strong> Автоматичне збереження стану у LocalStorage.</li>
            <li className="mb-2">🛠️ <strong>Надійність:</strong> Використання Error Boundaries та валідації даних.</li>
            <li className="mb-2">🧪 <strong>Якість:</strong> Повне покриття тестами за допомогою Vitest та RTL.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About;