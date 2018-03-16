import {makeRequestAction} from '../../helpers/actions.helper';
import {generateId} from '../../helpers';
import {TODOS_INFO} from '../types';

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
};

let getters = {
    total(state) {
        return state.items.length;
    }
};

let mutations = {
    [TODOS_INFO.ADD_TODO](state, todo) {
        state.items.push(todo);
    },
    [TODOS_INFO.UPDATE_TODO](state, nextTodo) {
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


let actions = {
    ...makeRequestAction(TODOS_INFO.ADD_TODO_ACTION, {
        success({commit, rootState}) {
            commit(TODOS_INFO.ADD_TODO, {
                id: generateId(),
                ...rootState.todoForm,
            });
        }
    }),
    ...makeRequestAction(TODOS_INFO.UPDATE_TODO_ACTION, {
        success({commit}, {response, params: nextTodo}) {
            commit(TODOS_INFO.UPDATE_TODO, nextTodo);
        }
    }),
};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    actions,
    mutations
}