// export let fetch = require('isomorphic-fetch');

export let fetch = (/*payload*/) => {
    return new Promise((resolve, /*reject*/) => {
        setTimeout(() => resolve({}), 2000);
    });
};