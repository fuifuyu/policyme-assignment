import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import AttributeControl from './AttributeControl.js';


function newCharacter() {
  let character = {
    attributes: {},
  };
  for (let attr of ATTRIBUTE_LIST) {
    character.attributes[attr] = {val: 10, modifier: 0};
  }
  return character;
}

function incrementAttribute(character, attr) {
  return {
    ...character,
    attributes: {
      ...character.attributes,
      [attr]: {
        ...character.attributes[attr],
        modifier: character.attributes[attr].modifier + 1,
      }
    }
  }
}

function decrementAttribute(character, attr) {
  return {
    ...character,
    attributes: {
      ...character.attributes,
      [attr]: {
        ...character.attributes[attr],
        modifier: character.attributes[attr].modifier - 1,
      }
    }
  }
}

function App() {
  const [character, setCharacter] = useState(newCharacter());
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className='character'>
          <div className='card'>
            {
            ATTRIBUTE_LIST.map((attr) => {
              return <AttributeControl
                name={attr}
                attribute={character.attributes[attr]}
                onIncrement={()=> setCharacter(incrementAttribute(character, attr))}
                onDecrement={()=> setCharacter(decrementAttribute(character, attr))}
              />
            })
          }
          </div>
          <div className='card'>hii</div>
        </div>
      </section>
    </div>
  );
}

export default App;
