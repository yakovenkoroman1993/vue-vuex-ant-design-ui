export function assignToState(state, {...patch}) {
    Object.keys(patch).forEach((key) => (
        state[key] = patch[key]
    ));
}