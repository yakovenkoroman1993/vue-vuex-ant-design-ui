import {SIGN_IN} from '../types';

let backendApi = 'http://localhost:8080/api';

export function signIn(params = {}) {
    return {
        type: SIGN_IN.SIGN_IN_ACTION.REQUEST,
        payload: {
            url: `${backendApi}/sign-in`,
            method: 'POST',
            params
        }
    };
}