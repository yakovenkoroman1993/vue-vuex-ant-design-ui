import {FILES} from '../types';
import {assignToState} from '../../helpers/state.helper';
import {
    FILE_STATUSES_TITLES,
    FILE_TYPES_TITLES,
    FILTER_OPTIONS_TITLES, TRANSPORT_TYPES_TITLES
} from '../types/files.types';
import {
    FILE_TYPES,
    FILE_STATUSES,
    FILTER_OPTIONS,
    TRANSPORT_TYPES,
} from './../types/files.types';

let defaultState = {
    items: [{
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 10,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'remittance.csv',
        uploader: 'John Doe',
        transport: TRANSPORT_TYPES.SFTP
    }, {
        status: FILE_STATUSES.INVALID,
        badRecordsNumber: 10,
        createdAt: Date.now(),
        type: FILE_TYPES.SALES,
        name: 'sales.txt',
        uploader: 'Norman Menz',
        transport: TRANSPORT_TYPES.AS2
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_1.txt',
        uploader: 'Ivan 1',
        transport: TRANSPORT_TYPES.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: TRANSPORT_TYPES.SFTP
    }, {
        status: FILE_STATUSES.INVALID,
        badRecordsNumber: 0,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_3.txt',
        uploader: 'Roman',
        transport: TRANSPORT_TYPES.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 2,
        createdAt: Date.now(),
        type: FILE_TYPES.SALES,
        name: 'sales_5.txt',
        uploader: 'Alex',
        transport: TRANSPORT_TYPES.AS2
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: TRANSPORT_TYPES.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: TRANSPORT_TYPES.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: TRANSPORT_TYPES.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: TRANSPORT_TYPES.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: TRANSPORT_TYPES.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: TRANSPORT_TYPES.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: TRANSPORT_TYPES.SFTP
    }],
    headers: [{
        text: 'Status',
        align: 'left',
        value: 'status'
    }, {
        text: 'Bad records',
        value: 'badRecordsNumber'
    }, {
        text: 'Time',
        value: 'createdAt'
    }, {
        text: 'File type',
        value: 'type'
    }, {
        text: 'File name',
        value: 'name'
    }, {
        text: 'Upload by',
        value: 'uploader'
    }, {
        text: 'Transport',
        value: 'transport'
    }, {
        text: 'Actions',
        sortable: false,
    }],
    filterOptions: Object.values(FILTER_OPTIONS).map(name => ({
        title: FILTER_OPTIONS_TITLES[name],
        name: name
    })),
    activeFilter: FILTER_OPTIONS.BY_FILES,
    fileTypes: Object.values(FILE_TYPES).map(name => ({
        text: FILE_TYPES_TITLES[name],
        value: name
    })),
    activeFileType: FILE_TYPES.ALL,
    isShowFilesWithIssuesOnly: false,
};

let getters = {
    total(state) {
        return state.items.length;
    },
    files(state) {
        let {
            items,
            activeFileType,
            isShowFilesWithIssuesOnly,
        } = state;

        let filters = [];
        if (isShowFilesWithIssuesOnly) {
            filters.push(file => file.status === FILE_STATUSES.INVALID);
        }

        if (activeFileType !== FILE_TYPES.ALL) {
            filters.push(file => file.type === activeFileType);
        }

        return filters
            .reduce((result, filter) => result.filter(filter), items)
            .map((file) => ({
                ...file,
                createdAt: new Date(file.createdAt).toLocaleString(),
                statusTitle: FILE_STATUSES_TITLES[file.status],
                transportTitle: TRANSPORT_TYPES_TITLES[file.transport],
                typeTitle: FILE_TYPES_TITLES[file.type],
            }));
    }
};

let mutations = {
    [FILES.UPDATE]: assignToState
};

let actions = {};

export default {
    namespaced: true,
    state: defaultState,
    mutations,
    actions,
    getters,
}