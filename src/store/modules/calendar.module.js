import {assignToState} from '../../helpers/state.helper';
import {MUTATION_UPDATE} from '../types';
import {PERIOD_NUMBER_MEASURES, CALENDAR_DAYS} from '../types/calendar.types';

let defaultState = {
    periodNumber: 1,
    periodNumberMeasure: PERIOD_NUMBER_MEASURES.MONTH,
    periodNumberMeasures: Object.values(PERIOD_NUMBER_MEASURES),
    calendarDays: Object.values(CALENDAR_DAYS),
};

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