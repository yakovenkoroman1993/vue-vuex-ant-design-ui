export let types = {
    UPDATE_FORM: 'onUpdate'
};

let defaultState = {
    name: '',
    completed: false,
    reserved: true,
};

let getters = {};

let actions = {};

let mutations = {
    [types.UPDATE_FORM](state, {...patch}) {
        Object.keys(patch).forEach((key) => {
            state[key] = patch[key];
        });
    }
};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    actions,
    mutations,
}