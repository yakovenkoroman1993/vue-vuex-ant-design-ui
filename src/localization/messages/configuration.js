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
            fileType: 'File type',
            fileExtension: 'File type',
            stopUpload: 'Stop Future Files Upload',
            maxInvalidData: 'Max % of invalid data',
            invalidDataLevel: 'Invalid data control',
            repeatEvery: 'Repeat every',
            repeatOn: 'Repeat on',
            scheduleEnds: 'Ends',
            fileSizeRange: 'File size adjust',
            filesRange: 'Files per period control',
            numberFilesPerPeriod: 'Number of files per period',
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