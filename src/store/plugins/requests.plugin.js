import {APP} from '../types';
import {fetch} from '../../helpers/ajax.helper';

let inGlobalNamespace = {root: true};

export default (store) => {
    store.subscribeAction(async ({payload: action, type}) => {
        if (type.search(/_REQUEST$/g) === -1) {
            return;
        }

        store.commit(APP.TOGGLE_LOADING, {isLoading: true}, inGlobalNamespace);

        let {payload} = action;

        let baseActionName = type.replace(/_REQUEST$/, '');

        try {
            let response = await fetch(payload.url, payload.params);
            store.dispatch(`${baseActionName}_SUCCESS`, {
                request: payload,
                response,
            });
        }
        catch (error) {
            store.dispatch(`${baseActionName}_FAILURE`, error);
        }
        finally {
            store.commit(APP.TOGGLE_LOADING, {isLoading: false}, inGlobalNamespace);
        }
    });
}