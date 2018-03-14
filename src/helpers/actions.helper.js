export function makeRequestAction(requestActionTypes, {
    request = Function(),
    success = Function(),
    failure = Function(),
} = {}) {
    return {
        [requestActionTypes.REQUEST]: request,
        [requestActionTypes.SUCCESS]: success,
        [requestActionTypes.FAILURE]: failure,
    };
}