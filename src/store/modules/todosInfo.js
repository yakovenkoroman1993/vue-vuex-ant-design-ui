import {generateId} from '../../helpers';

export let types = {
    ADD_TODO: 'onAdd',
    TOGGLE_LOADING: 'onLoadingToggle',
    UPDATE_TODO: 'onTodoUpdate'
};

let defaultState = {
    items: [{
        id: generateId(),
        name: 'Todo 1',
        completed: false
    }, {
        id: generateId(),
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
        commit('onLoadingToggle', true);
        // as async request
        setTimeout(() => {
            commit('onLoadingToggle', false);
            commit('onAdd', {
                id: generateId(),
                ...rootState.todoForm,
            });
        }, 500);
    },
    onTodoUpdate({commit}, nextTodo) {
        commit('onTodoUpdate', nextTodo);
    }
};

let mutations = {
    [types.ADD_TODO](state, todo) {
        state.items.push(todo);
    },
    [types.TOGGLE_LOADING](state, enabled) {
        state.isLoading = enabled;
    },
    onTodoUpdate(state, nextTodo) {
        let {id} = nextTodo;
        state.items = state.items.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    ...nextTodo
                };
            }
            return todo;
        });
    }
};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    actions,
    mutations
}