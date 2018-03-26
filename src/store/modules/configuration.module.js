import {assignToState} from '../../helpers/state.helper';
import {arrayToBooleanMap, booleanMapToArray} from '../../helpers';
import {CONFIGURATION, MUTATION_UPDATE} from '../types';
import {FILE_TYPES, FILE_TRANSPORTS} from '../types/files.types';
import {SCHEDULE_TYPES, SCHEDULE_ENDS_OPTIONS} from '../types/configuration.types';
import {CALENDAR_DAYS} from '../types/calendar.types';
import {makeRequestAction} from '../../helpers/actions.helper';

let defaultState = {
    activeTab: FILE_TYPES.SALES,
    scheduleTypes: Object.values(SCHEDULE_TYPES),
    activeScheduleType: null,
    switches: arrayToBooleanMap([
        'schedule',
        'fileSizeRange',
        'filesRange',
        'invalidDataLevel',
    ]),
    repeatNumber: 1,
    activeRepeatDays: arrayToBooleanMap(Object.values(CALENDAR_DAYS), [
        CALENDAR_DAYS.MONDAY
    ]),
    scheduleEndsOnDate: null,
    occurrencesNumber: 1,
    scheduleEndsOptions: Object.values(SCHEDULE_ENDS_OPTIONS),
    activeScheduleEndsOption: SCHEDULE_ENDS_OPTIONS.NEVER,
    transports: Object.values(FILE_TRANSPORTS),
    activeTransport: FILE_TRANSPORTS.SFTP,
    fileSizeRange: [0, 5],
    filesRange: [2, 5],
    activeFileExtension: null,
    invalidDataLevel: 0,
    isStopUploading: true,
};

let getters = {
    activeRepeatDays(state) {
        return booleanMapToArray(state.activeRepeatDays);
    }
};

let mutations = {
    [MUTATION_UPDATE]: assignToState,
};

let actions = {
    ...makeRequestAction(CONFIGURATION.UPDATE_ACTION)
};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    mutations,
    actions,
}