import * as MutationsHelper from '../../helpers/mutations.helper';
import {APP} from '../types';

let defaultState = {
    isLoading: false
};

let getters = {};

let mutations = {
    [APP.TOGGLE_LOADING]: MutationsHelper.assignToState
};

let actions = {};

export default {
    state: defaultState,
    getters,
    mutations,
    actions,
}