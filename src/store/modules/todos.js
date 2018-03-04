let initialState = [];

let getters = {
    todos: (state) => state
};

let actions = {
    addTodo({commit}, todo) {
        // as request
        setTimeout(() => {
            commit('add', todo);
        })
    }
};

let mutations = {
    add(state, todo) {
        state.push(todo);
    }
};

export default {
    state: initialState,
    getters,
    actions,
    mutations
}