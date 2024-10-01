
export function convertModifier(modifier) {
    if (modifier < 0) {
        return Math.trunc((modifier-1) / 2);
    }
    if (modifier > 0) {
        return Math.trunc(modifier / 2);
    }
    return modifier;
}

export default function AttributeControl({name, attribute, onIncrement, onDecrement, ...props}) {
    return <div>
        {name}: {attribute.val + attribute.modifier} (Modifier: {convertModifier(attribute.modifier)})
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        </div>

}