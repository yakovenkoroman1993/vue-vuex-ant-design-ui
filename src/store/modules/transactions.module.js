import {assignToState} from '../../helpers/state.helper';
import {MUTATION_UPDATE} from '../types';
import {generateId} from '../../helpers';
import {TRANSACTION_VALIDATION_TYPES} from '../types/transactions.types';
import format from "date-fns/format";

let defaultState = {
    items: [{
        fileId: '1',
        validationError: null,
        saleDate: Date.now(),
        store: '0002929',
        description: 'LUFKIN DAYLY NEWSPAPER',
        unitsSold: '1.00 EA',
        unitCost: 122,
        retailerPrice: 8,
        extendedCost: 8,
        extendedRetail: 9,
    }, {
        id: generateId(),
        validationError: 'Missing Assignment',
        saleDate: Date.now(),
        store: '0002929',
        description: 'LUFKIN DAYLY NEWSPAPER',
        unitsSold: '1.00 EA',
        unitCost: 23,
        retailerPrice: 18,
        extendedCost: 18,
        extendedRetail: 9,
    }, {
        id: generateId(),
        validationError: null,
        saleDate: Date.now(),
        store: '0002929',
        description: 'LUFKIN DAYLY NEWSPAPER',
        unitsSold: '1.00 EA',
        unitCost: 1,
        retailerPrice: 5,
        extendedCost: 5,
        extendedRetail: 9,
    }, {
        id: generateId(),
        validationError: null,
        saleDate: Date.now(),
        store: '0002929',
        description: 'LUFKIN DAYLY NEWSPAPER',
        unitsSold: '1.00 EA',
        unitCost: 1,
        retailerPrice: 3,
        extendedCost: 3,
        extendedRetail: 9,
    }, {
        fileId: '1',
        validationError: 'Missing Assignment',
        saleDate: Date.now(),
        store: '0002929',
        description: 'LUFKIN DAYLY NEWSPAPER',
        unitsSold: '1.00 EA',
        unitCost: 1,
        retailerPrice: 9,
        extendedCost: 9,
        extendedRetail: 9,
    }, {
        fileId: '1',
        validationError: 'Unknown UPC',
        saleDate: Date.now(),
        store: '0002929',
        description: 'LUFKIN DAYLY NEWSPAPER',
        unitsSold: '1.00 EA',
        unitCost: 1,
        retailerPrice: 8,
        extendedCost: 8,
        extendedRetail: 9,
    }, {
        fileId: '1',
        validationError: 'Incorrect price',
        saleDate: Date.now(),
        store: '0002929',
        description: 'LUFKIN DAYLY NEWSPAPER',
        unitsSold: '1.00 EA',
        unitCost: 1,
        retailerPrice: 9,
        extendedCost: 9,
        extendedRetail: 9,
    }, {
        fileId: '1',
        validationError: null,
        saleDate: Date.now(),
        store: '0002929',
        description: 'LUFKIN DAYLY NEWSPAPER',
        unitsSold: '1.00 EA',
        unitCost: 1,
        retailerPrice: 9,
        extendedCost: 9,
        extendedRetail: 9,
    }],
    activeValidationType: null,
    validationTypes: Object.values(TRANSACTION_VALIDATION_TYPES),
    activeDateSalePeriod: null,
    showWithIssuesOnly: false,
    activeCreatedAtPeriod: null,
};

let getters = {
    transactions(state) {
        return state.items.map((transaction) => ({
            ...transaction,
            saleDate: format(transaction.saleDate, 'MM/DD/YYYY HH:mm:ss A'),
        }));
    }
};

let mutations = {
    [MUTATION_UPDATE]: assignToState,
};

let actions = {};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    mutations,
    actions,
}