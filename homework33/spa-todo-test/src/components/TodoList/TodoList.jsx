import { Component } from "react";
import "../../App.css";
import Form from "./Form";
import List from "./List";
import { ThemeContext } from '../../themeContext';

class TodoList extends Component {
  static contextType = ThemeContext;
  render() {
    const { theme } = this.context;
    const { todos, addTodo, deleteTodo, toggleTodoCompletion } = this.props; 
    
    return (
      <>
      <h1 style={{ color: theme.color }}>TodoList content</h1>
        <main className="container">
          <Form addTodo={addTodo} />
          <List 
             todos={todos} 
             onDelete={deleteTodo} 
             onToggle={toggleTodoCompletion} 
             theme={theme} 
          />
        </main>
      </>
    );
  }
}

export default TodoList;
