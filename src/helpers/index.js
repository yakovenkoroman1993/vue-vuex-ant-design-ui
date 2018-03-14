export function generateId() {
    return (Date.now() % Math.random()).toString().replace('.', '');
}

export function pipe(...fns) {
    return (input) => (
        fns.reduce((result, fn) => fn(result), input)
    );
}
