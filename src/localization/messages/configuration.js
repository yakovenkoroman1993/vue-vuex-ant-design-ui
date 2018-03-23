import {SCHEDULE_TYPES, SCHEDULE_ENDS_OPTIONS} from '../../store/types/configuration.types';
import {NOTIFICATIONS} from '../../helpers/notification.helper';

export default {
    en: {
        title: 'Configuration',
        client: 'Client',
        labels: {
            schedule: 'Schedule',
            transport: 'Server (transport) type',
            fileSize: 'File size',
            filesPerPeriod: 'Number of files per period',
            fileType: 'File type',
            fileExtension: 'File type',
            stopUpload: 'Stop Future Files Upload',
            invalidDataLevel: 'Max % of invalid data',

            repeatEvery: 'Repeat every',
            repeatOn: 'Repeat on',
            scheduleEnds: 'Ends',
            fileSizeSwitch: 'File size adjust',
            save: 'Apply',
        },
        tooltips: {
            stopUpload: 'Stop Future Files Upload'
        },
        notifications: {
            save: {
                [NOTIFICATIONS.SUCCESS]: {
                    title: 'Success!',
                    message: 'Configuration saved successfully',
                }
            }
        },
        scheduleEndsGroup: {
            labels: {
                [SCHEDULE_ENDS_OPTIONS.NEVER]: 'Never',
                [SCHEDULE_ENDS_OPTIONS.ON]: 'On',
                [SCHEDULE_ENDS_OPTIONS.AFTER]: 'After',
                occurrences: 'Occurrences'
            },
        },
        placeholders: {
            scheduleTypeSelect: 'Select'
        },
        scheduleTypes: {
            [SCHEDULE_TYPES.CUSTOM]: 'Custom',
            [SCHEDULE_TYPES.DAILY]: 'Daily',
            [SCHEDULE_TYPES.MONTHLY]: 'Monthly',
            [SCHEDULE_TYPES.WEEKLY]: 'Weekly',
            [SCHEDULE_TYPES.NOT_REPEAT]: 'Don\'t repeat',
        }
    }
}