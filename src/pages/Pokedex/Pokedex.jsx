import { useState } from "react"
import { Link } from "react-router-dom"
import "./Pokedex.css"
import { pokeData } from "../../data/pokeData"
console.log(pokeData)


const Pokedex = () => {
  const displayCount = 10
  const [currIdx, setCurrIdx] = useState(0)
  const [displayedPokemon, setDisplayedPokemon] = useState(filterPokemonData(0))
  const [searchItems, setSearchItems] = useState([''])

  function filterPokemonData(newIndex) {
    //filter pokeData to a new array of 10 pokemon (newIndex+displayCount)
    const filteredData = pokeData.filter((pokemon, idx) => {
      //falsey: 10th = > 10 >= 0 10 !< 0+10
      return idx >=newIndex && idx < newIndex + displayCount
    })
    return filteredData
  }
  
  function handleIncreaseCurrIdx() {
    const newIdx =currIdx + displayCount
    if (newIdx >= pokeData.length) {
      return
    }
    const filteredPokemonData = filterPokemonData(newIdx)
    setCurrIdx(newIdx)
    setDisplayedPokemon(filteredPokemonData)
  }

  function handleDecreaseCurrIdx() {
  const newIdx =currIdx - displayCount
  if (newIdx < 0 ) {
    return
  }
  const filteredPokemonData = filterPokemonData(newIdx)
  setCurrIdx(newIdx)
  setDisplayedPokemon(filteredPokemonData)
  }

  //search bar
  function onChange(e) {
    const value = e.target.value
    const searchData = pokeData.filter((pokemon) => pokemon.name.toLowerCase().includes(value.toLowerCase()) ) 
    console.log(searchData)
    setSearchItems(searchData)
  }

  return ( 
    <>
      <h1>Pokemon List</h1>
      <div className="search-container">
        <p>Search:</p>
        <input onChange={onChange} type="search" />
        <h3>Results:</h3>
        {searchItems.map(item => (<div>{item}</div>))}
      </div>
      <div className="pagination-container">
        <button 
        id="backward"
        onClick={handleDecreaseCurrIdx}
        >
        &lt;
        </button>
        <button 
        id="forward"
        onClick={handleIncreaseCurrIdx}
        >
        &gt;
        </button>
      </div>
      <div className="num-results-container">
        Results {currIdx +1} - {currIdx + displayCount} of {pokeData.length}
      </div>
      <div className="pokemon-container">
        {displayedPokemon.map(pokemon => 
          <Link to={`/pokemon/${pokemon.number - 1}`} key={pokemon._id}>
            <div className="pokemon-link">
              <img src={pokemon.image} alt="a fierce pokemon" />
              <p>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>  
            </div>
          </Link>
        )}
      </div>
    </>
  )
}

export default Pokedex