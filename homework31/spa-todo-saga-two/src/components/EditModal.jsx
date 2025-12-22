import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo } from '../store/actions';

const EditModal = ({ todo, onClose }) => {
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText.length >= 5) {
      dispatch(editTodo(todo.id, trimmedText));
      onClose();
    } else if (trimmedText.length === 0) {
      setError('Description cannot be empty');
    } else {
      setError('Minimum 5 characters required');
    }
  };

    const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSave();
    }
    if (e.key === 'Escape') {
      onClose(); 
    }
  };

  const statusConfig = todo.completed 
    ? { label: 'Completed', emoji: '✅', color: 'text-success', bg: 'bg-success-subtle' }
    : { label: 'In Progress', emoji: '⏳', color: 'text-primary', bg: 'bg-primary-subtle' };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0 custom-card">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Edit Task</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body py-3">
              <div className={`d-inline-flex align-items-center px-2 py-1 rounded-pill mb-3 ${statusConfig.bg} ${statusConfig.color} small fw-medium`}>
                <span className="me-1">{statusConfig.emoji}</span>
                {statusConfig.label}
              </div>

              <div className="form-group position-relative mb-4">
                <label className="form-label text-muted small mb-1">Task Description</label>
                <input 
                  type="text" 
                  className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`} 
                  value={editText} 
                  onChange={(e) => {
                    setEditText(e.target.value);
                    if (error) setError('');
                  }}
                  onKeyDown={handleKeyDown} 
                  autoFocus 
                />
                {error && (
                  <div 
                    className="text-danger small position-absolute" 
                    style={{ bottom: '-22px', left: '2px' }}
                  >
                    {error}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer border-0">
  <button 
    className="btn btn-secondary opacity-75 px-4" 
    style={{ backgroundColor: '#6c757d', borderColor: '#6c757d', color: '#fff' }} 
    onClick={onClose}
  >
    Cancel
  </button>
  <button className="btn btn-primary px-4" onClick={handleSave}>
    Save changes
  </button>
</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default EditModal;