import {useState} from 'react';
import './App.css';

function App(props) {

  const [showData, setShowData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isIdol, setIsIdol] = useState(true)
  const [noDataFound , setNoDataFound] = useState(false)

  function inputHandler(event){
    const {value} = event.target;
   
    setIsLoading(true)
    setIsError(false)
    setNoDataFound(false)
    if(value !== ''){
      setIsIdol(false)
    fetch(`https://hungry-woolly-leech.glitch.me/api/pokemon/search/${value}`)
    .then(res => res.json())
    .then(data =>{
      if(data && data.pokemon && data.pokemon.length === 0){
        setNoDataFound(true)
      }else{
        setShowData(data.pokemon)
      }
      })
    .catch(err => setIsError(true))
    .finally(() => setIsLoading(false))
  }else{
    setIsIdol(true);
    setShowData(null);
    setIsLoading(false)
  }

    }
    

  return (
    <div className='App'>
      <input placeholder='Type Pikachu name' onChange={inputHandler}/>
      {isIdol && !isLoading && <p>Please Type Something</p>}
      {noDataFound && !isIdol && <p>No Data Found..</p>}
      {isError && <p>Error</p>}
      {isLoading &&  <h2>Loading...</h2>}
      {!isError && !isLoading && !noDataFound && !isIdol && showData && showData.map((data) => {
       return <p>{data.name}</p>
      })}
    </div>
  );
}

export default App;