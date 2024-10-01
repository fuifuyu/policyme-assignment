import { useState } from "react";
import { SKILL_LIST } from "./consts";

export default function SkillsCheck({onRoll}) {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDC] = useState(0);
  return (
    <div className="card">
      <h2>Skills Check</h2>
      <div>
        <label htmlFor="skill-dropdown">Skill:</label>
        <select
            id="skill-dropdown"
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          {SKILL_LIST.map((skill) => {
            return <option value={skill.name}>{skill.name}</option>;
          })}
        </select>
        <label htmlFor="DC">DC:</label>
        <input id="DC" type="number" value={dc} onChange={(e) => setDC(e.target.value)}/>
        <button onClick={()=>onRoll(selectedSkill, dc)}>Roll!</button>
      </div>
    </div>
  );
}
