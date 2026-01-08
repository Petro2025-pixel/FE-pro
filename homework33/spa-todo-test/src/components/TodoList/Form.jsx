import { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      error: null, 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  }

  handleChange(event) {
    this.setState({
      description: event.target.value,
      error: null, 
    });
  }

  handleClick() {
    const trimmedDescription = this.state.description.trim();

    if (trimmedDescription.length < 5) {
      this.setState({
        error: "The task description must contain at least 5 characters.",
      });
      return; 
    }
   
    this.setState({ error: null });
    this.props.addTodo(trimmedDescription);
    this.setState({ description: "" });
  }

  render() {
    const errorStyle = { 
        color: 'red', 
        fontSize: '0.8rem', 
        position: 'absolute', 
        top: '100%', 
        left: '0', 
        width: '100%',
        zIndex: 10, 
    };
    
    const inputWrapperStyle = {
        position: 'relative',
        flexGrow: 1, 
        marginRight: '10px' 
    };

    return (
      <form className="d-flex align-items-start" onSubmit={(event) => event.preventDefault()}>
        <div style={inputWrapperStyle}>
            <input
              type="text"
              className="w-100"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown} 
              value={this.state.description}
            />
            {this.state.error && <p style={errorStyle}>{this.state.error}</p>}
        </div>
        <button type="button" onClick={this.handleClick} className="btn btn-primary">
          Send
        </button>
      </form>
    );
  }
}

export default Form;