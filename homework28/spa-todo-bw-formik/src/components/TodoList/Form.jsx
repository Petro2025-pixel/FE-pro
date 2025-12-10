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
        backgroundColor: 'inherit', 
        padding: '0'
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
              value={this.state.description}
            />
            {this.state.error && <p style={errorStyle}>{this.state.error}</p>}
        </div>
        
        <button onClick={this.handleClick} className="btn btn-primary">
          Send
        </button>
      </form>
    );
  }

  handleClick() {
    const { description } = this.state;
    if (description.length < 5) {
      this.setState({
        error: "The task description must contain at least 5 characters.",
      });
      return; 
    }
   
    this.setState({
      error: null,
    });
    
    this.props.addTodo(description);
    
    this.setState({
      description: "",
    });
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState({
      description: value,
      error: value.length >= 5 ? null : this.state.error, 
    });
  }
}

export default Form;