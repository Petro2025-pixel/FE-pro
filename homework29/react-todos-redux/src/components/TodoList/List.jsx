import { Component } from "react";
import ListItem from "./ListItem";

class List extends Component {
  
  render() {
    const { todos, onDelete, onToggle, theme } = this.props; 
    
    if (!todos || !Array.isArray(todos)) {
         return <p>Немає завдань для відображення.</p>;
    }
    

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
              theme={theme} />
          );
        })}
      </ul>
    );
  }
}

export default List;