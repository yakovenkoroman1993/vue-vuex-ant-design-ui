import jjv from 'jjv';

let env = jjv();

export function makeValidatableState(schema, state) {
    state.errorsDisplay = Object.keys(state).reduce((result, stateKey) => {
        result[stateKey] = false;
        return result;
    }, {});

    state.errors = getValidationErrorsFromState(schema, state);

    return state;
}

export function getValidationErrorsFromState(schema, state) {
    let errors = env.validate(schema, state);
    if (!errors) {
        return {};
    }

    errors = errors.validation;

    return Object.keys(errors).reduce((result, errorKey) => (
        Object.keys(errors[errorKey]).reduce((result, violationKey) => {
            result[errorKey] = {
                [violationKey]: schema.properties[errorKey][violationKey]
            };
            return result;
        }, result)
    ), {});
}

export function resolveStateKey(state, resolvedStateKey) {
    state.errorsDisplay[resolvedStateKey] = true;
}