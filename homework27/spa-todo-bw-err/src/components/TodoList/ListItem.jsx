import { Component } from "react";

class ListItem extends Component {
  render() {
    const { description, onDelete, id, theme } = this.props;
    return (
      <li className="d-flex justify-content-between mb-2 mt-2 listItem">
        <span style={{ color: theme.color }}>{description}</span>
        <div>
          <button className="btn btn-success mr-2">Done</button>
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