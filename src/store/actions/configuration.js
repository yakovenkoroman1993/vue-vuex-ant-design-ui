import {CONFIGURATION} from '../types';

let backendApi = 'http://localhost:8080/api';

export function save(params = {}) {
    return {
        type: CONFIGURATION.UPDATE_ACTION.REQUEST,
        payload: {
            url: `${backendApi}/configuration`,
            method: 'POST',
            params
        }
    };
}