import {MUTATION_UPDATE} from '../types';
import {fetch} from '../../helpers/ajax.helper';

export default (store) => {
    store.subscribeAction(async ({payload: action, type}) => {
        if (type.search(/_REQUEST$/g) === -1) {
            return;
        }

        store.commit(`app/${MUTATION_UPDATE}`, {isLoading: true});

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
            store.dispatch(`${baseActionName}_ERROR`, error);
        }
        finally {
            store.commit(`app/${MUTATION_UPDATE}`, {isLoading: false});
        }
    });
}