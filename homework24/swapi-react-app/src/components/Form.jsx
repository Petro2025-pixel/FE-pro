function Form() {
    return (<form className="row row-cols-lg-auto g-0 align-items-center justify-content-center">
  <div className="col-12 col-lg-8">
    <label className="visually-hidden" htmlFor="inlineFormInputGroupUsername">Username</label>
    <div className="input-group">
      <div className="input-group-text bg-secondary_ text-light ">https://swapi.dev/api/</div>
      <input type="text" className="form-control bg-light" id="inlineFormInputGroupUsername" placeholder="people/1/"/>
    </div>
  </div>

  <div className="col-12">
    <label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</label>
   
  </div>
  <div className="col-12">
    <button type="submit" className="btn btn-secondary">Request</button>
      </div>
      
</form> );
}

export default Form;