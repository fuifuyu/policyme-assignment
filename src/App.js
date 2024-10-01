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


function saveCharacter(character) {
  fetch("https://recruiting.verylongdomaintotestwith.ca/api/fuifuyu/character", {
    method: "POST",
    body: JSON.stringify(character),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}

function App() {
  const [character, setCharacter] = useState(null);

  useEffect(()=>{
    fetch("https://recruiting.verylongdomaintotestwith.ca/api/fuifuyu/character", {
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      if (res.body !== undefined) setCharacter(res.body);
      else setCharacter(newCharacter());
    })
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      {character === null ?
        <section className='App-section'>
          Loading...
        </section> :
        <section className="App-section">
          <button onClick={()=>saveCharacter(character)}>Save</button>
          <CharacterCard character={character} setCharacter={setCharacter}/>
        </section>
      }
    </div>
  );
}

export default App;
