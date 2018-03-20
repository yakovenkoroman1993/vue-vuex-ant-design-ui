import {assignToState} from '../../helpers/state.helper';
import {APP} from '../types';

let defaultState = {
    isLoading: false,
    authenticated: true,
};

let getters = {};

let mutations = {
    [APP.TOGGLE_LOADING]: assignToState
};

let actions = {};

export default {
    state: defaultState,
    getters,
    mutations,
    actions,
}