export function vuexify(path, mutation) {
    let [source, state] = path.split('/');
    return {
        [state]: {
            get() {
                return this.$store.state[source][state];
            },
            set(value) {
                this.$store.commit(`${source}/${mutation}`, {
                    [state]: value
                })
            }
        },
    };
}

export function generateId() {
    return (Date.now() % Math.random()).toString().replace('.', '');
}

export function makeRequestAction(requestActionTypes, {
    request = Function(),
    success = Function(),
    failure = Function(),
} = {}) {
    return {
        [requestActionTypes.REQUEST]: request,
        [requestActionTypes.SUCCESS]: success,
        [requestActionTypes.FAILURE]: failure,
    };
}

export function pipe(...fns) {
    return (input) => (
        fns.reduce((result, fn) => fn(result), input)
    );
}

export function select(key) {
    return (state) => state[key];
}