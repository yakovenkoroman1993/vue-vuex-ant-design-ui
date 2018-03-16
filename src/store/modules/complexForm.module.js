import {assignToState} from '../../helpers/state.helper';
import {COMPLEX_FORM} from '../types';

let defaultState = {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
};

let getters = {};

let mutations = {
    [COMPLEX_FORM.UPDATE]: assignToState
};

let actions = {};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    mutations,
    actions,
}