let defaultState = {
    items: [{
        id: Date.now(),
        name: 'Todo 1',
        completed: false
    }, {
        id: Date.now(),
        name: 'Todo 2',
        completed: false
    }],
    isLoading: false
};

let getters = {
    total(state) {
        return state.items.length;
    }
};

let actions = {
    onAdd({commit, rootState}) {
        commit('onLoadingToggle', {enabled: true});
        // as async request
        setTimeout(() => {
            commit('onLoadingToggle', {enabled: false});
            commit('onAdd', rootState.todoForm);
        }, 2000);
    }
};

let mutations = {
    onAdd(state, todo) {
        state.items.push(todo);
    },
    onLoadingToggle(state, {enabled}) {
        state.isLoading = enabled;
    }
};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    actions,
    mutations
}