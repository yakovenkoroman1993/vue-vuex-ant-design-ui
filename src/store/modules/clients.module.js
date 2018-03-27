import {assignToState} from '../../helpers/state.helper';
import {MUTATION_UPDATE} from '../types';
import {generateId} from '../../helpers';
let selectedId = generateId();

let defaultState = {
    query: '',
    activeRetailerId: selectedId,
    // activeRetailerId: null,
    retailers: [{
        id: selectedId,
        // id: generateId(),
        name: '7-Eleven'
    }, {
        id: generateId(),
        name: 'Krispy Kreme'
    }, {
        id: generateId(),
        name: 'Pinnacle Gas Products'
    }, {
        id: '1234dsa1234dsa',
        name: 'Walmart'
    }, {
        id: generateId(),
        name: '7-Eleven'
    }, {
        id: generateId(),
        name: 'Krispy Kreme'
    }, {
        id: generateId(),
        name: 'Pinnacle Gas Products'
    }, {
        id: generateId(),
        name: 'Walmart'
    }, {
        id: generateId(),
        name: '7-Eleven'
    }, {
        id: generateId(),
        name: 'Krispy Kreme'
    }, {
        id: generateId(),
        name: 'Pinnacle Gas Products'
    }, {
        id: generateId(),
        name: 'Walmart'
    }, {
        id: generateId(),
        name: '7-Eleven'
    }, {
        id: generateId(),
        name: 'Krispy Kreme'
    }, {
        id: generateId(),
        name: 'Pinnacle Gas Products'
    }, {
        id: generateId(),
        name: 'Walmart'
    }, ]
};

let getters = {
    retailers(state) {
        let {query, retailers} = state;
        return retailers.filter(it => (
            it.name.toLowerCase().includes(query.toLowerCase())
        ));
    },
    activeRetailer(state) {
        return state.retailers.find(it => it.id === state.activeRetailerId);
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