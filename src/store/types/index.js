let asRequestAction = (prefix) => ({
    REQUEST: `${prefix}_REQUEST`,
    SUCCESS: `${prefix}_SUCCESS`,
    ERROR: `${prefix}_ERROR`
});

export const MUTATION_UPDATE = 'UPDATE';

export const SIGN_IN = {
    SIGN_IN_ACTION: asRequestAction('SIGN_IN'),
};

export const CALENDAR = {
    UPDATE: 'UPDATE',
};

export const COMPLEX_FORM = {
    UPDATE: 'UPDATE',
};

export const CONFIGURATION = {
    UPDATE_ACTION: asRequestAction('UPDATE'),
};
