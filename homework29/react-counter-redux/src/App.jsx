import "./App.css";
import { useSelector, useDispatch } from 'react-redux'
import { incremented, decremented } from "./store/rootReducer";

function App() {
  
  const value = useSelector((state) => state.value);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(incremented());
  }
  const handleDecrement = () => {
    dispatch(decremented());
  }
  return (
    <>
      <span>Value: {value} </span>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </>
  );
}

export default App;