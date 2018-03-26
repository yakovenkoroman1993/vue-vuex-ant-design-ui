import {SIGN_IN, MUTATION_UPDATE} from '../types';
import {ROUTES} from '../../router/routes';
import {assignToState} from '../../helpers/state.helper';
import {makeRequestAction} from '../../helpers/actions.helper';

let defaultState = {
    errorMessage: '',
    login: '',
    password: '',
    redirectRoute: null,
};

let getters = {};

let mutations = {
    [MUTATION_UPDATE]: assignToState,
};

let actions = {
    ...makeRequestAction(SIGN_IN.SIGN_IN_ACTION, {
        before({commit}) {
            commit(MUTATION_UPDATE, {
                errorMessage: ''
            });
        },
        success({commit}) {
            commit(MUTATION_UPDATE, {
                redirectRoute: {
                    name: ROUTES.CLIENT_SELECTION
                },
            });
        },
        error({commit}, error) {
            commit(MUTATION_UPDATE, {
                errorMessage: `Unknown error: ${error.message}`
            });
        }
    })
};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    mutations,
    actions,
}