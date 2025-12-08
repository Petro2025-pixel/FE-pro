import { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <form className="d-flex" onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          className="w-100"
          onChange={this.handleChange}
          value={this.state.description}
        />
        <button onClick={this.handleClick} className="btn btn-primary">
          Send
        </button>
      </form>
    );
  }

  handleClick() {
    console.log(this.state);
    this.props.addTodo(this.state.description);
    this.setState({
      description: "",
    });
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState({
      description: value,
    });
  }
}

export default Form;