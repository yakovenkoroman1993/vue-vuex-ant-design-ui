import {SIGN_IN_FORM} from '../types';
import {assignToState} from '../../helpers/state.helper';
import {makeRequestAction} from '../../helpers/actions.helper';

let defaultState = {
    login: '',
    password: '',
    isLoading: false,
    errorMessage: ''
};

let getters = {};

let mutations = {
    [SIGN_IN_FORM.UPDATE]: assignToState,
};

let actions = {
    ...makeRequestAction(SIGN_IN_FORM.SIGN_IN_ACTION, {
        request({commit}) {
            commit(SIGN_IN_FORM.UPDATE, {
                errorMessage: ''
            });
        },
        success({commit, rootState}, {response}) {
            console.log(`*** response`, response);
            let {login} = rootState.signInForm;
            if (login === 'test') {
                return;
            }

            commit(SIGN_IN_FORM.UPDATE, {
                errorMessage: 'Incorrect login or password'
            });
        },
        failure({commit}, error) {
            commit(SIGN_IN_FORM.UPDATE, {
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