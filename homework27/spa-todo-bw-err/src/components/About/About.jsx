import { useContext } from 'react';
import { ThemeContext } from '../../themeContext'; 

const About = () => {
  const { theme } = useContext(ThemeContext);

  return (
     <div style={{ color: theme.color }}>
      <h1>About content</h1>
      <div className="w-75 mx-auto">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate rem sapiente placeat eaque dolor ex, eveniet cupiditate amet itaque et, at vel nisi, dolores saepe perferendis! Eaque quis vitae excepturi.</div>
    </div>
  );
}

export default About;