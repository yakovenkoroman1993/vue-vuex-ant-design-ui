import {assignToState} from '../../helpers/state.helper';
import {CALENDAR} from '../types';
import {PERIOD_NUMBER_MEASURES} from '../types/calendar.types';

let defaultState = {
    periodNumber: 1,
    periodNumberMeasure: PERIOD_NUMBER_MEASURES.DAY,
    periodNumberMeasures: Object.values(PERIOD_NUMBER_MEASURES),
};

let getters = {};

let mutations = {
    [CALENDAR.UPDATE]: assignToState
};

let actions = {};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    mutations,
    actions,
}