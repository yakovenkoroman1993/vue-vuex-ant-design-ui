import _isPlainObject from 'lodash/isPlainObject';

export function assignToState(state, {...patch}) {
    Object.keys(patch).forEach((key) => {
        if (_isPlainObject(state[key])) {
            state[key] = {
                ...state[key],
                ...patch[key]
            }
        }
        else {
            state[key] = patch[key]
        }
    });
}
