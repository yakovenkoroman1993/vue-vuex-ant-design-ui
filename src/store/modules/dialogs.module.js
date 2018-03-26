import {arrayToBooleanMap} from '../../helpers';
import {DIALOGS_NAMES} from '../types/dialogs.types';
import {MUTATION_UPDATE} from '../types';
import {assignToState} from '../../helpers/state.helper';

let defaultState = arrayToBooleanMap(Object.values(DIALOGS_NAMES));

let getters = {};

let mutations = {
    [MUTATION_UPDATE]: assignToState
};

let actions = {};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    mutations,
    actions,
}