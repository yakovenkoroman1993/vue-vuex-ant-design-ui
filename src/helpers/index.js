export function generateId() {
    return (Date.now() % Math.random()).toString().replace('.', '');
}

export function pipe(...fns) {
    return (input) => (
        fns.reduce((result, fn) => fn(result), input)
    );
}

export function arrayToBooleanMap(keys, values = []) {
    return keys.reduce((map, value) => {
        map[value] = values.includes(value);
        return map;
    }, {});
}

export function booleanMapToArray(booleanMap) {
    return Object.keys(booleanMap).filter((day) => booleanMap[day]);
}