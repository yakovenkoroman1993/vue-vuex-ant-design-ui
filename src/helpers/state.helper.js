import {pipe} from './';
import _get from 'lodash/get';

export function assignToState(state, {...patch}) {
    Object.keys(patch).forEach((key) => (
        state[key] = patch[key]
    ));
}

export function prepare(stateKey, preparers) {
    return pipe(
        ...preparers,
        (state) => state[stateKey]
    );
}

/**
 * see "vuex way" by url https://vuex.vuejs.org/en/forms.html
 */
export function mapStateWithMutation(mutation, stateKeys) {
    let originalStateKeys = stateKeys;
    let aliasStateKeys = stateKeys;
    if (!Array.isArray(stateKeys)) {
        originalStateKeys = Object.values(stateKeys);
        aliasStateKeys = Object.keys(stateKeys);
    }

    return aliasStateKeys.reduce((map, _, i) => {
        let stateKeyLocation = [];
        if (mutation.search('/') !== -1) {
            stateKeyLocation.push(...mutation.split('/').slice(0, -1))
        }

        let stateKeyPath = [...stateKeyLocation, originalStateKeys[i]];
        map[aliasStateKeys[i]] = {
            get() {
                return _get(this.$store.state, stateKeyPath);
            },
            set(value) {
                this.$store.commit(mutation, {
                    [originalStateKeys[i]]: value
                })
            }
        };

        return map;
    }, {});
}
