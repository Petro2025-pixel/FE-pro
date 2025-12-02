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

const SMILE_DATA = [
  { id: 'smile1', alt: 'smile1' },
  { id: 'smile2', alt: 'smile2' },
  { id: 'smile3', alt: 'smile3' },
  { id: 'smile4', alt: 'smile4' },
  { id: 'smile5', alt: 'smile5' },
];

const initialVotes = { smile1: 0, smile2: 0, smile3: 0, smile4: 0, smile5: 0 };
const initialResults = { maxCount: 0, winners: [] };

function App() {

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
          {SMILE_DATA.map((smile) => (
            <div className="card" key={smile.id}>
              <button onClick={() => handleVote(smile.id)}>
                <img 
                  src={smileMap[smile.id]} 
                  className="logo" 
                  alt={smile.alt} 
                />
                count is {votes[smile.id]}
              </button>
            </div>
          ))}
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