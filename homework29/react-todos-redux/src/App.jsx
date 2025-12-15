// import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";
function App() {

  return (
  <>
        <div className="content">
          {/* <Header /> */}
            <main>
              <TodoList /> 
            </main>
          <Footer />
        </div>
  </>
  );
}

export default App;