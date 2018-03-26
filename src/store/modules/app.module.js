import {assignToState} from '../../helpers/state.helper';
import {MUTATION_UPDATE} from '../types';

let defaultState = {
    isLoading: false,
    authenticated: true,
    referrerRouteName: null,
};

let getters = {};

let mutations = {
    [MUTATION_UPDATE]: assignToState,
};

let actions = {};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    mutations,
    actions,
}