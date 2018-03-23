import {multipleCall} from '../helpers';
import {notify, NOTIFICATIONS} from './notification.helper';

export function makeRequestAction({REQUEST, SUCCESS, ERROR}, {
    before = Function(),
    success = Function(),
    error = Function(),
} = {}) {
    return {
        [REQUEST]: before,
        [SUCCESS]: multipleCall(
            notify(NOTIFICATIONS.SUCCESS),
            success
        ),
        [ERROR]: multipleCall(
            notify(NOTIFICATIONS.ERROR),
            error
        ),
    };
}
