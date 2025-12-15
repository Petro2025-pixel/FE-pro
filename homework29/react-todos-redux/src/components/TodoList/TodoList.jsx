import "../../App.css";
import Form from "./Form";
import List from "./List";
import { useSelector, useDispatch   } from 'react-redux';
import { 
    addTodo, 
    deleteTodo, 
    toggleTodoCompletion 
} from '../../store/rootReducer';

const TodoList = () => {
   
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  
  const defaultTheme = { color: 'black' };
  const theme = defaultTheme; 
  const handleAddTodo = (description) => {
      dispatch(addTodo(description));
  };
  
  const handleDeleteTodo = (id) => {
      dispatch(deleteTodo(id));
  };
  
  const handleToggleCompletion = (id) => {
      dispatch(toggleTodoCompletion(id));
  };

  return (
    <>
      <h1 style={{ color: theme.color }}>TodoList content</h1>
      <main className="container">
        <Form addTodo={handleAddTodo} /> 
        <List 
           todos={todos} 
           onDelete={handleDeleteTodo} 
           onToggle={handleToggleCompletion} 
           theme={theme} 
        />
      </main>
    </>
  );
}

export default TodoList;