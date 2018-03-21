export function makeRequestAction(requestActionTypes, {
    before = Function(),
    success = Function(),
    failure = Function(),
} = {}) {
    return {
        [requestActionTypes.REQUEST]: before,
        [requestActionTypes.SUCCESS]: success,
        [requestActionTypes.FAILURE]: failure,
    };
}