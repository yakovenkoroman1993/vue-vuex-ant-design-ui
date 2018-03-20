let asRequestAction = (prefix) => ({
    REQUEST: `${prefix}_REQUEST`,
    SUCCESS: `${prefix}_SUCCESS`,
    FAILURE: `${prefix}_FAILURE`
});

export const APP = {
    TOGGLE_LOADING: 'TOGGLE_LOADING',
};

export const TODO_FORM = {
    UPDATE: 'UPDATE',
};

export const TODOS_INFO = {
    ADD_TODO: 'ADD_TODO',
    ADD_TODO_ACTION: asRequestAction('ADD_TODO'),
    UPDATE_TODO: 'UPDATE_TODO',
    UPDATE_TODO_ACTION: asRequestAction('UPDATE_TODO'),
};

export const SIGN_IN = {
    UPDATE: 'UPDATE',
    SIGN_IN_ACTION: asRequestAction('SIGN_IN'),
    RESOLVE_STATE_KEY_FOR_VALIDATION: 'RESOLVE_STATE_KEY_FOR_VALIDATION',
    UPDATE_ERRORS: 'UPDATE_ERRORS',
};

export const FILES = {
    UPDATE: 'UPDATE',
};

export const COMPLEX_FORM = {
    UPDATE: 'UPDATE',
};
