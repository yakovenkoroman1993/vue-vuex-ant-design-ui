import {TODOS_INFO} from '../types';

let backendApi = 'http://localhost:8080/api';

export function addTodo(params = {}) {
    return {
        type: TODOS_INFO.ADD_TODO_ACTION.REQUEST,
        payload: {
            url: `${backendApi}/todos/add`,
            method: 'POST',
            params
        }
    };
}

export function updateTodo(params = {}) {
    return {
        type: TODOS_INFO.UPDATE_TODO_ACTION.REQUEST,
        payload: {
            url: `${backendApi}/todos/update`,
            method: 'POST',
            params
        }
    };
}