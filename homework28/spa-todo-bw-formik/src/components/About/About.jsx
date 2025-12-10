import { useContext } from 'react';
import { ThemeContext } from '../../themeContext'; 

const About = () => {
  const { theme } = useContext(ThemeContext);
  const contentClass = "w-75 mx-auto p-4"; 
  const headingStyle = { color: theme.color };

  return (
     <div style={headingStyle}>
      <h1 className="my-4">About content</h1>
      
      <div className={contentClass}>
          
        <h2 className="mb-3">🇺🇸 React To-Do List App: Features</h2>
        
        <ul className="list-unstyled">
          <li className="mb-2">
            ✅ Task Management: Add, delete, and toggle task completion.
          </li>
          <li className="mb-2">
            🌗 Dynamic Theming: Instant Dark/Light mode switching via React Context.
          </li>
          <li className="mb-2">
            💾 Data Persistence: Tasks saved locally using <code>localStorage</code>.
          </li>
          <li className="mb-2">
            ✍️ Input Validation: Ensures minimum character length for new tasks.
          </li>
          <li className="mb-2">
            🧭 Routing: Navigation via React Router (Main, Contacts, About).
          </li>
        </ul>
        
        <p className="mt-4 text-muted">
          Built With: React, React Router, Bootstrap.
        </p>

        <hr className="my-5" style={{ borderColor: theme.color }}/>
        
        <h2 className="mb-3">🇺🇦 React Додаток "Список Справ": Можливості</h2>
        
        <ul className="list-unstyled">
          <li className="mb-2">
            ✅ Керування Завданнями: Додавання, видалення та перемикання статусу виконання.
          </li>
          <li className="mb-2">
            🌗 Динамічні Теми: Миттєве перемикання між Світлою/Темною темою через React Context.
          </li>
          <li className="mb-2">
            💾 Збереження Даних: Завдання зберігаються локально за допомогою <code>localStorage</code>.
          </li>
          <li className="mb-2">
            ✍️ Валідація Вводу: Перевірка мінімальної довжини для нових записів.
          </li>
          <li className="mb-2">
            🧭 Маршрутизація: Навігація через React Router (Головна, Контакти, Про нас).
          </li>
        </ul>
        
        <p className="mt-4 text-muted">
          Створено з використанням: React, React Router, Bootstrap.
        </p>
        
      </div>
    </div>
  );
}

export default About;