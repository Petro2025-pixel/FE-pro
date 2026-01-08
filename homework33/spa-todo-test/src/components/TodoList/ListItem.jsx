import { Component } from "react";

class ListItem extends Component {
  render() {
    const { description, onDelete, onToggle, id, theme, completed } = this.props;
    const textStyle = { 
        color: theme.color, 
        textDecoration: completed ? 'line-through' : 'none' 
    };
    
    return (
      <li className="d-flex justify-content-between align-items-center mb-2 mt-2 listItem">
        <div className="d-flex align-items-center">
            <input 
                type="checkbox" 
                checked={completed} 
                onChange={() => onToggle(id)} 
                style={{ 
                    marginRight: '10px', 
                    accentColor: 'blue' 
                }}
            />
            <span style={textStyle}>{description}</span>
        </div>
        <div>
          <button 
             className="btn btn-success mr-2"
             onClick={() => onToggle(id)} 
          >
             Done
          </button>
          <button 
             className="btn btn-danger"
             onClick={() => onDelete(id)} 
             >
             Delete
          </button>
        </div>
      </li>
    );
  }
}

export default ListItem;