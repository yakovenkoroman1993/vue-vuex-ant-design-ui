import {SIGN_IN_FORM} from '../types';

let backendApi = 'http://localhost:8080/api';

export function signIn(params = {}) {
    return {
        type: SIGN_IN_FORM.SIGN_IN_ACTION.REQUEST,
        payload: {
            url: `${backendApi}/sign-in`,
            method: 'POST',
            params
        }
    };
}