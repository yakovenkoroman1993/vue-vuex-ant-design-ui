import _get from 'lodash/get';
import {getValidationErrorsFromState} from './validation.helper';

export function assignToState(state, {...patch}) {
    Object.keys(patch).forEach((key) => (
        state[key] = patch[key]
    ));
}

export function assignToStateWithValidation(schema) {
    return (state, {...patch}) => {
        Object.keys(patch).forEach((key) => (
            state[key] = patch[key]
        ));

        state.errors = getValidationErrorsFromState(schema, state);
    };
}


/**
 * @deprecated
 * see "vuex way" by url https://vuex.vuejs.org/en/forms.html
 */
export function mapStateWithMutation(source, mutation, stateKeys) {
    let originalStateKeys = stateKeys;
    let aliasStateKeys = stateKeys;
    if (!Array.isArray(stateKeys)) {
        originalStateKeys = Object.values(stateKeys);
        aliasStateKeys = Object.keys(stateKeys);
    }

    return aliasStateKeys.reduce((map, _, i) => {
        let stateKeyPath = [
            ...source.split('/'),
            originalStateKeys[i]
        ];
        map[aliasStateKeys[i]] = {
            get() {
                return _get(this.$store.state, stateKeyPath);
            },
            set(value) {
                this.$store.commit(`${source}/${mutation}`, {
                    [originalStateKeys[i]]: value
                })
            }
        };

        return map;
    }, {});
}
