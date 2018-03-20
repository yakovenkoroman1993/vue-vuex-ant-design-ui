import {SIGN_IN} from '../types';
import {assignToStateWithValidation} from '../../helpers/state.helper';
import {makeRequestAction} from '../../helpers/actions.helper';
import {makeValidatableState, resolveStateKey} from '../../helpers/validation.helper';
import schema from '../validation/signIn.schema';

let defaultState = makeValidatableState(schema, {
    errorMessage: '',
    login: '',
    password: '',
});


let getters = {
    valid(state) {
        return !Object.keys(state.errors).length;
    }
};

let mutations = {
    [SIGN_IN.RESOLVE_STATE_KEY_FOR_VALIDATION]: resolveStateKey,
    [SIGN_IN.UPDATE]: assignToStateWithValidation(schema),
};

let actions = {
    ...makeRequestAction(SIGN_IN.SIGN_IN_ACTION, {
        request({commit}) {
            commit(SIGN_IN.UPDATE, {
                errorMessage: ''
            });
        },
        success({commit, rootState}, {response}) {
            console.log(`*** response`, response);
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