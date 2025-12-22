import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo } from '../store/actions';

const TodoItem = ({ todo, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 px-3 py-2 rounded-3 custom-card border-0">
      <div className="d-flex align-items-center flex-grow-1 me-2">
        <input
          type="checkbox"
          className="form-check-input me-3 flex-shrink-0"
          style={{ 
            width: '1.4rem', 
            height: '1.4rem', 
            cursor: 'pointer'
          }}
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
        />
        <span 
          className="fs-6" 
          style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.6 : 1,
            wordBreak: 'break-word'
          }}
        >
          {todo.text}
        </span>
      </div>

      <div className="btn-group flex-shrink-0 todo-actions">
        
        <button 
          className="btn btn-edit me-2 rounded-2" 
          onClick={() => onEdit(todo)}
          title="Edit"
          style={{ 
            width: '38px', 
            height: '38px', 
            padding: '0', 
            border: '1px solid #0d6efd',
            color: '#0d6efd' 
          }}
        >
          <span style={{ fontSize: '1rem' }}>✏️</span>
        </button>
        
      
        <button 
          className="btn btn-delete rounded-2" 
          onClick={() => dispatch(deleteTodo(todo.id))}
          title="Delete"
          style={{ 
            width: '38px', 
            height: '38px', 
            padding: '0', 
            border: '1px solid #dc3545',
            color: '#dc3545'
          }}
        >
          <span style={{ fontSize: '1rem' }}>🗑️</span>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;