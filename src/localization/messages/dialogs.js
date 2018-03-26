import {DIALOGS_NAMES} from '../../store/types/dialogs.types';

export default {
    en: {
        actions: {
            close: 'Close',
            cancel: 'Cancel',
            showLogs: 'Show Logs',
            select: 'Select',
        },
        alerts: {
            dropFile: 'Drop file here or ',
            uploadFile: 'click to upload',
        },
        templates: {
            uploadError: '<small>Oops! There is an error with <b>{fileName}</b> file. <br> Please see logs for more information.</small>',
        },
        [DIALOGS_NAMES.FILES_UPLOAD]: {
            title: 'File Upload',
        },
        [DIALOGS_NAMES.RETAILER_CHANGE]: {
            title: 'Select Client from the List',
        },
    }
}