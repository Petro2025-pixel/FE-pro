import { Component } from "react";
import ListItem from "./ListItem";
import { ThemeContext } from '../../themeContext';

class List extends Component {
  static contextType = ThemeContext;
  render() {
    const { theme } = this.context;
    const { todos, onDelete, onToggle } = this.props;
    

    return (
      <ul className="listwrapper">
        {todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              id={todo.id}
              description={todo.description}
              completed={todo.completed}
              onDelete={onDelete}
              onToggle={onToggle} 
              theme={theme}
            />
          );
        })}
      </ul>
    );
  }
}

export default List;