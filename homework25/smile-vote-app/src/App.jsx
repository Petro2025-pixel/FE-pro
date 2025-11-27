import { useState } from 'react' 
import smile1 from './assets/smile1.svg'
import smile2 from './assets/smile2.svg'
import smile3 from './assets/smile3.svg'
import smile4 from './assets/smile4.svg'
import smile5 from './assets/smile5.svg'
import './App.css'

const smileMap = {
  smile1: smile1,
  smile2: smile2,
  smile3: smile3,
  smile4: smile4,
  smile5: smile5,
};

function App() {

  const initialVotes = { smile1: 0, smile2: 0, smile3: 0, smile4: 0, smile5: 0 };
  const initialResults = { maxCount: 0, winners: [] };

  const [votes, setVotes] = useState(initialVotes);
  const [results, setResults] = useState(initialResults);


  const handleVote = (smileId) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [smileId]: prevVotes[smileId] + 1
    }));
    setResults(initialResults); 
  };

    const handleResult = () => {
    const voteValues = Object.values(votes);
    const maxVoteCount = voteValues.length > 0 ? Math.max(...voteValues) : 0;
    
    let winners = [];
    if (maxVoteCount > 0) {
      winners = Object.keys(votes).filter(key => votes[key] === maxVoteCount);
    }
  
    setResults({
      maxCount: maxVoteCount,
      winners: winners
    });
  }

   const handleReset = () => {
    setVotes(initialVotes);
    setResults(initialResults);
   };
    
  const { maxCount, winners } = results;

  return (
    <>
        <h1>Голосування за найкращий смайлик</h1>
        <div className="smile-container">
        <div className="card">
          <button onClick={() => handleVote('smile1')}><img src={smile1} className="logo" alt="smile1" />
            count is {votes.smile1}
          </button>
        </div>
        <div className="card">
          <button onClick={() => handleVote('smile2')}><img src={smile2} className="logo" alt="smile2" />
            count is {votes.smile2}
          </button>
        </div>
        <div className="card">
          <button onClick={() => handleVote('smile3')}> <img src={smile3} className="logo" alt="smile3" />
            count is {votes.smile3}
          </button>
        </div>
        <div className="card">
          <button onClick={() => handleVote('smile4')}><img src={smile4} className="logo" alt="smile4" />
            count is {votes.smile4}
          </button>
        </div>
        <div className="card">
          <button onClick={() => handleVote('smile5')}><img src={smile5} className="logo" alt="smile5" />
            count is {votes.smile5} </button>
        </div>

      </div>

      <div className="card">
        <button onClick={handleResult}>
          Showresults 🏆
        </button>
        <button onClick={handleReset}>
          Reset 🔄
        </button>
      </div>
   
      <div className="card results-display">
        <h1>Результати голосування:</h1>
        
        {winners.length > 0 ? (
          <div>
          <p>
  {winners.length > 1 ? 'Переможці' : 'Переможець'} (Кількість голосів: {maxCount}):
            </p>
            <div className="smile-container">
              
              {winners.map(winnerId => (
                <div key={winnerId} className="winner-item">
                   <img src={smileMap[winnerId]} className="logo" alt={winnerId} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Натисніть "Показати результати" або проголосуйте, щоб побачити переможця.</p>
        )}
      </div>
    </>
  )
}

export default App