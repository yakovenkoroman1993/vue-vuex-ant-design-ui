import _get from 'lodash/get';
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
