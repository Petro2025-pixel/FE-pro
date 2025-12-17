import { Component } from "react";
import { connect } from "react-redux";
import { fetchSwapiThunk } from "../../store/rootReducer";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleSwapi: "",
      error: null,
    };
  } 

  handleChange = (event) => {
    this.setState({ titleSwapi: event.target.value, error: null });
  };

 handleSubmit = (e) => {
  if (e) e.preventDefault(); 
  
  const { titleSwapi } = this.state;
  const cyrillicPattern = /[а-яА-ЯёЁ]/;

  if (cyrillicPattern.test(titleSwapi)) {
    this.setState({ error: "English only" });
    return;
  }

  if (titleSwapi.trim().length < 3) {
    this.setState({ error: "Try something like 'people/1'" });
    return;
  }

  this.props.fetchSwapi(titleSwapi);
  this.setState({ titleSwapi: "", error: null });
};

  render() {
    return (
      <header className="p-3 border-bottom mb-4 sticky-top bg-dark"> 
 <div className="d-flex flex-column flex-md-row align-items-center align-items-md-baseline mb-4">
 <h2 className="swapi-yellow mb-2 mb-md-0 me-md-3">SWAPI</h2>
 <p className="mb-2 mb-md-0 me-md-2 text-center text-md-start shadow-sm">
    Visit the API endpoint:
  </p>
   <ul className="list-inline mb-0 text-center text-md-start">
    <li className="list-inline-item">films/ <span className="ms-1">🪐</span></li>
    <li className="list-inline-item">people/ <span className="ms-1">🪐</span></li>
    <li className="list-inline-item">planets/ <span className="ms-1">🪐</span></li>
    <li className="list-inline-item">species/ <span className="ms-1">🪐</span></li>
    <li className="list-inline-item">vehicles/ <span className="ms-1">🪐</span></li>
    <li className="list-inline-item">starships/</li>
  </ul>
</div>
        <form className="d-flex mb-4 align-items-start" onSubmit={this.handleSubmit}>
          <div style={{ position: 'relative', flexGrow: 1, marginRight: '1px' }} >
            <div className="input-group">
            <div className="input-group-text bg-secondary_ text-light ">https://swapi.info/api/</div>
            <input
              type="text"
              className="form-control bg-light text-dark"
              placeholder="e.g. people/1"
              value={this.state.titleSwapi}
              onChange={this.handleChange} 
            />
            </div>
            {this.state.error && (
              <small style={{ color: 'red', position: 'absolute'}}>{this.state.error}</small>
            )}
          </div>
          <button type="submit" className="btn btn-secondary">
    Get Info
  </button>
</form>
       
      </header>
    );
  }
}

const mapDispatchToProps = { fetchSwapi: fetchSwapiThunk };
export default connect(null, mapDispatchToProps)(Header);