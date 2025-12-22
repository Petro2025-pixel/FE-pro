import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/actions';

const TodoForm = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState(''); 
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    
    if (trimmedText.length === 0) {
      setError('Task cannot be empty');
    } else if (trimmedText.length < 5) {
      setError('Minimum 5 characters required');
    } else {
      dispatch(addTodo(trimmedText));
      setText('');
      setError('');
    }
  };

  return (
    <div className="position-relative mb-5"> 
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
        />
        <button className="btn btn-primary px-4" type="submit">Add</button>
      </form>
      
      {error && (
        <div 
          className="text-danger small position-absolute" 
          style={{ bottom: '-25px', left: '5px' }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default TodoForm;