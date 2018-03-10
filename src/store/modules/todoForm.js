let defaultState = {
    name: '',
    id: Date.now(),
    completed: false,
    reserved: true,
};

let getters = {};

let actions = {};

let mutations = {
    onUpdate(state, patch) {
        Object.keys(patch).reduce((result, key) => {
            result[key] = patch[key];
            return result;
        }, state);
    }
};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    actions,
    mutations,
}