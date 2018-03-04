let state = {
    todoName: '1232'
};

let getters = {
    todoName: (state) => state.todoName
};

let actions = {
};

let mutations = {
    updateForm(state, form) {
        debugger;
        state = {
            ...state,
            ...form
        };
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}