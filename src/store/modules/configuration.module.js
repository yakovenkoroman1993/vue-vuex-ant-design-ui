import {assignToState} from '../../helpers/state.helper';
import {arrayToBooleanMap, booleanMapToArray} from '../../helpers';
import {CONFIGURATION} from '../types';
import {FILE_TYPES, FILE_TRANSPORTS} from '../types/files.types';
import {SCHEDULE_TYPES, SCHEDULE_ENDS_OPTIONS} from '../types/configuration.types';
import {CALENDAR_DAYS} from '../types/calendar.types';
import {makeRequestAction} from '../../helpers/actions.helper';

let defaultState = {
    activeTab: FILE_TYPES.SALES,
    scheduleTypes: Object.values(SCHEDULE_TYPES),
    activeScheduleType: null,
    scheduleSwitches: arrayToBooleanMap(['first', 'second', 'third']),
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
    isFileSizeAdjusting: true,
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
    // todo: there is a need the simplification it anywhere
    [CONFIGURATION.UPDATE]: assignToState,
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