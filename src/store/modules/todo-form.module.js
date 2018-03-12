import * as MutationsHelper from '../../helpers/mutations.helper';
import {TODO_FORM} from '../types';

let defaultState = {
    name: '',
    completed: false,
    reserved: true,
};

let getters = {};

let actions = {};

let mutations = {
    [TODO_FORM.UPDATE]: MutationsHelper.assignToState
};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    actions,
    mutations,
}