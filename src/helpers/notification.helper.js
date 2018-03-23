import _get from 'lodash/get';
import {Notification} from 'element-ui';

export const NOTIFICATIONS = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning',
};

export function notify(type) {
    if (!Object.values(NOTIFICATIONS).includes(type)) {
        throw new Error('Unexpected notification type.');
    }

    return (...args) => {
        let notification = _get(args, `1.request.notifications.${type}`);
        if (!notification) {
            if (type === NOTIFICATIONS.ERROR) {
                Notification.error({
                    title: 'Error',
                    message: 'Unexpected error'
                });
            }

            return;
        }

        Notification[type](notification);
    };
}