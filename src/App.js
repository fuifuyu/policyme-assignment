import { useEffect, useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts.js';
import CharacterCard from './CharacterCard.js';


function newCharacter() {
  let character = {
    attributes: {},
    skills: {}
  };
  for (let attr of ATTRIBUTE_LIST) {
    character.attributes[attr] = {val: 10, modifier: 0};
  }
  for (let skill of SKILL_LIST) {
    character.skills[skill.name] = 0
  }
  return character;
}


function saveCharacters(character) {
  fetch("https://recruiting.verylongdomaintotestwith.ca/api/fuifuyu/character", {
    method: "POST",
    body: JSON.stringify(character),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}

function App() {
  const [characters, setCharacters] = useState(null);

  useEffect(()=>{
    fetch("https://recruiting.verylongdomaintotestwith.ca/api/fuifuyu/character", {
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      if (res.body !== undefined) setCharacters(res.body);
      else setCharacters([newCharacter()]);
    })
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      {characters === null ?
        <section className='App-section'>
          Loading...
        </section> :
        <section className="App-section">
          <button onClick={()=>saveCharacters(characters)}>Save</button>
          <button onClick={()=>setCharacters([...characters, newCharacter()])}>Add Character</button>
          {
            characters.map((character, idx) => {
              return ( <>
              <h2>Character {idx}</h2>
              <CharacterCard character={character} setCharacter={(newCharacter)=> {
                setCharacters(characters.map((c, i) => (idx === i) ? newCharacter : c))
              }}/>
              <button onClick={()=>{setCharacters(characters.filter((c, i) => i !== idx))}}>Delete Character</button>
              </>);
            })
          }
        </section>
      }
    </div>
  );
}

export default App;
