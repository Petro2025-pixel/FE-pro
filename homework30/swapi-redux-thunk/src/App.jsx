import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "./App.css";
import { useSelector } from 'react-redux';

function App() {
  const swapis = useSelector((state) => state.swapis);
  const error = useSelector((state) => state.error); 

  return (
    <div className="content d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1">
        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}
        <div className="row">
          {swapis.map((data, index) => {
            const urlParts = data.url ? data.url.split('/').filter(Boolean) : [];
            const badges = urlParts.slice(-2); 
          return (
              <div key={index} className="col-12 mb-2">
                <div className="card card-body bg-light text-dark text-start">
                  <div className="mb-2">
                    {badges.map((badge, bIdx) => (
                      <span 
                        key={bIdx} 
                        className="btn btn-sm btn-secondary me-1 py-0 px-2"
                        style={{ pointerEvents: 'none', opacity: 0.8 }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <pre className="m-0" style={{ fontSize: '14px' }}>
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;