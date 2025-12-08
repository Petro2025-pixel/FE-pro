import { Component } from "react";
import "../../App.css";
import Form from "./Form";
import List from "./List";
import { ThemeContext } from '../../themeContext';

class TodoList extends Component {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { id: 1, description: "Todo 1" },
        { id: 2, description: "Todo 2" },
      ],
    };

    this.addTodo = this.addTodo.bind(this);
      }

      deleteTodo = (id) => { 
 this.setState((prevState) => ({
todos: prevState.todos.filter(todo => todo.id !== id),
}));
}

  render() {
    const { theme } = this.context;
    return (
      <>
      <h1 style={{ color: theme.color }}>TodoList content</h1>
        <main className="container">
          <Form addTodo={this.addTodo} />
          <List todos={this.state.todos} onDelete={this.deleteTodo} theme={theme} />
        </main>
      </>
    );
  }

  addTodo(description) {
   this.setState((prevState) => {
        const maxId = prevState.todos.length > 0
            ? Math.max(...prevState.todos.map(todo => todo.id))
            : 0;

        const newId = maxId + 1; 
        
    return {
    todos: [...prevState.todos, { id: newId, description }],
     };
    });
    }
}

export default TodoList;