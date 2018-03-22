import {SIGN_IN} from '../types';
import {assignToState} from '../../helpers/state.helper';
import {makeRequestAction} from '../../helpers/actions.helper';

let defaultState = {
    errorMessage: '',
    login: '',
    password: '',
};

let getters = {};

let mutations = {
    [SIGN_IN.UPDATE]: assignToState
};

let actions = {
    ...makeRequestAction(SIGN_IN.SIGN_IN_ACTION, {
        before({commit}) {
            commit(SIGN_IN.UPDATE, {
                errorMessage: ''
            });
        },
        success({commit, rootState}) {
            let {login} = rootState.signIn;
            if (login === 'test') {
                return;
            }

            commit(SIGN_IN.UPDATE, {
                errorMessage: 'Incorrect login or password'
            });
        },
        failure({commit}, error) {
            commit(SIGN_IN.UPDATE, {
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