import './App.css';
import { useState } from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import AttributeControl, { convertModifier } from './AttributeControl.js';
import SkillControl from './SkillControl.js';

function incrementAttribute(character, attr) {
    const MAX_ATTRIBUTE = 70
    let currentAttrPoints = 0;
    for (let attr of ATTRIBUTE_LIST) {
      currentAttrPoints += character.attributes[attr].val + character.attributes[attr].modifier;
    }
    if (currentAttrPoints >= MAX_ATTRIBUTE) return character;
  
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
  
  function incrementSkill(character, skill) {
    const maxSkillPoint = 10 + 4 * convertModifier(character.attributes['Intelligence'].modifier);
    let totalSkillPoint = 0;
    for (let skillPoint of Object.values(character.skills)) {
      totalSkillPoint += skillPoint;
    }
    if (totalSkillPoint >= maxSkillPoint) return character;
  
    return {
      ...character,
      skills: {
        ...character.skills,
        [skill]: character.skills[skill] + 1
      }
    }
  }
  
  function decrementSkill(character, skill) {
    if (character.skills[skill] === 0) return character;
    return {
      ...character,
      skills: {
        ...character.skills,
        [skill]: character.skills[skill] - 1
      }
    }
  }
  
  function satisfyClassReq(character, classType) {
    for (let attr of ATTRIBUTE_LIST) {
      if (character.attributes[attr].val + character.attributes[attr].modifier < CLASS_LIST[classType][attr]) return false;
    }
    return true;
  }
  

export default function CharacterCard({character, setCharacter}) {
      const [showClass, setShowClass] = useState(null);
    return (
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
        <div className='card'>
        <h2>Skills</h2>
        {SKILL_LIST.map((skill) => {
            const name = skill.name;
            const attrName = skill.attributeModifier;
            return <SkillControl
            skill={{name: name, val: character.skills[name]}}
            modifier={{name: attrName, val: character.attributes[attrName].modifier}}
            onIncrement={() => setCharacter(incrementSkill(character, name))}
            onDecrement={() => setCharacter(decrementSkill(character, name))}
            />
        })}
        </div>
  </div>);
}