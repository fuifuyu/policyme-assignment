import { convertModifier } from "./AttributeControl"

export default function SkillControl({skill, modifier, onIncrement, onDecrement, ...props}) {
    const modifierVal = convertModifier(modifier.val);
    return <div>
        {skill.name}: {skill.val}
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        (Modifier: {modifier.name}): {modifierVal} total: {skill.val + modifierVal}
        </div>

}