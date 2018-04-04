import {MUTATION_UPDATE} from '../types';
import {assignToState} from '../../helpers/state.helper';
// import addMonths from 'date-fns/add_months';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import {
    FILE_TYPES,
    FILE_STATUSES,
    FILE_TRANSPORTS,
    FILE_EXTENSIONS,
} from './../types/files.types';

let defaultState = {
    items: [{
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 10,
        createdAt: addDays(new Date(), -2),
        type: FILE_TYPES.SALES,
        name: 'remittance.csv',
        uploader: 'John Doe',
        transport: FILE_TRANSPORTS.SFTP
    }, {
        status: FILE_STATUSES.INVALID,
        badRecordsNumber: 10,
        createdAt: addDays(new Date(), -3),
        type: FILE_TYPES.INVENTORY,
        name: 'sales.txt',
        uploader: 'Norman Menz',
        transport: FILE_TRANSPORTS.AS2
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: Date.now(),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_1.txt',
        uploader: 'Ivan 1',
        transport: FILE_TRANSPORTS.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: addDays(new Date(), -3),
        type: FILE_TYPES.SALES,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: FILE_TRANSPORTS.SFTP
    }, {
        status: FILE_STATUSES.INVALID,
        badRecordsNumber: 0,
        createdAt: addDays(new Date(), 4),
        type: FILE_TYPES.SALES,
        name: 'sales_3.txt',
        uploader: 'Roman',
        transport: FILE_TRANSPORTS.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 2,
        createdAt: addDays(new Date(), -6),
        type: FILE_TYPES.SALES,
        name: 'sales_5.txt',
        uploader: 'Alex',
        transport: FILE_TRANSPORTS.AS2
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: addDays(new Date(), -3),
        type: FILE_TYPES.SALES,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: FILE_TRANSPORTS.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: addDays(new Date(), -3),
        type: FILE_TYPES.SALES,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: FILE_TRANSPORTS.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: addDays(new Date(), -4),
        type: FILE_TYPES.SALES,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: FILE_TRANSPORTS.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: Date.now(),
        type: FILE_TYPES.SALES,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: FILE_TRANSPORTS.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: addDays(new Date(), -1),
        type: FILE_TYPES.SALES,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: FILE_TRANSPORTS.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: addDays(new Date(), -6),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: FILE_TRANSPORTS.SFTP
    }, {
        status: FILE_STATUSES.VALID,
        badRecordsNumber: 12,
        createdAt: addDays(new Date(), -4),
        type: FILE_TYPES.REMITTANCE,
        name: 'sales_2.txt',
        uploader: 'Ivan 2',
        transport: FILE_TRANSPORTS.SFTP
    }],
    showWithIssuesOnly: false,
    activeUploader: null,
    types: Object.values(FILE_TYPES),
    activeType: FILE_TYPES.SALES,
    statuses: Object.values(FILE_STATUSES),
    activeStatus: null,
    transports: Object.values(FILE_TRANSPORTS),
    activeTransport: null,
    fileExtensions: Object.values(FILE_EXTENSIONS),
    // activeCreatedAtPeriod: [
    //     new Date().getTime(),
    //     addMonths(new Date(), 1).getTime()
    // ],
    activeCreatedAtPeriod: null,
};

let getters = {
    total(state) {
        return state.items.length;
    },
    uploaders(state) {
        return state.items
            .map(it => it.uploader)
            .filter((it, i, items) => items.indexOf(it) === i);
    },
    files(state) {
        let {
            items,
            activeType,
            activeStatus,
            activeUploader,
            activeTransport,
            activeCreatedAtPeriod,
            showWithIssuesOnly,
        } = state;

        let filters = [];
        if (showWithIssuesOnly) {
            filters.push(file => file.status === FILE_STATUSES.INVALID);
        }

        if (activeType) {
            filters.push(file => file.type === activeType);
        }
        if (activeUploader) {
            filters.push(file => file.uploader === activeUploader);
        }
        if (activeStatus) {
            filters.push(file => file.status === activeStatus);
        }
        if (activeTransport) {
            filters.push(file => file.transport === activeTransport);
        }
        if (activeCreatedAtPeriod && Array.isArray(activeCreatedAtPeriod)) {
            filters.push(file => (
                activeCreatedAtPeriod[0] < file.createdAt
                &&
                file.createdAt < activeCreatedAtPeriod[1]
            ));
        }

        return filters
            .reduce((result, filter) => result.filter(filter), items)
            .map((file) => ({
                ...file,
                createdAt: format(file.createdAt, 'MM/DD/YYYY HH:mm:ss A'),
            }));
    }
};

let mutations = {
    [MUTATION_UPDATE]: assignToState
};

let actions = {};

export default {
    namespaced: true,
    state: defaultState,
    mutations,
    actions,
    getters,
}