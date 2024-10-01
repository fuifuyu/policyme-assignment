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

function satisfyClassReq(character, classType) {
  for (let attr of ATTRIBUTE_LIST) {
    if (character.attributes[attr].val + character.attributes[attr].modifier < CLASS_LIST[classType][attr]) return false;
  }
  return true;
}

function App() {
  const [character, setCharacter] = useState(newCharacter());
  const [showClass, setShowClass] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className='character'>
          <div className='card'>
            <h2>Attributes</h2>
            {
              ATTRIBUTE_LIST.map((attr) => {
                return <AttributeControl
                  name={attr}
                  key={attr}
                  attribute={character.attributes[attr]}
                  onIncrement={()=> setCharacter(incrementAttribute(character, attr))}
                  onDecrement={()=> setCharacter(decrementAttribute(character, attr))}
                />
              })
            }
          </div>
          <div className='card'>
            <h2>Classes</h2>
          {
            Object.keys(CLASS_LIST).map((classType) => {
              return <div key={classType} onClick={()=>setShowClass(classType)} className={satisfyClassReq(character, classType) ? "" : "red"}>{classType}</div>
            })
          }
          </div>
          {showClass &&
          <div className='card'>
            <h2>{showClass} Minimum Requirement</h2>
            {
              Object.keys(CLASS_LIST[showClass]).map((attr) => {
                return <div>{attr}: {CLASS_LIST[showClass][attr]}</div>;
              })
            }
            <button onClick={()=>setShowClass(null)}>Close requirement window</button>
          </div>
          }
        </div>
      </section>
    </div>
  );
}

export default App;
