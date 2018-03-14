import {assignToState} from '../../helpers/state.helper';
import {TODO_FORM} from '../types';

let defaultState = {
    name: '',
    completed: false,
    reserved: true,
};

let getters = {};

let actions = {};

let mutations = {
    [TODO_FORM.UPDATE]: assignToState
};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    actions,
    mutations,
}