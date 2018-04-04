import _merge from 'lodash/merge';
import _set from 'lodash/set';
import _map from 'lodash/map';
import app from './app';
import validation from './validation';
import signIn from './signIn';
import files from './files';
import calendar from './calendar';
import configuration from './configuration';
import dialogs from './dialogs';
import dataTable from './dataTable';
import transactions from './transactions';

function requireMessages(scope) {
    return _merge(
        ..._map(scope, (scopeValue, scopeKey) => (
            Object.keys(scopeValue).reduce((result, locale) => (
                _set(result, [locale, scopeKey], scopeValue[locale])
            ), {})
        ))
    );
}

export default requireMessages({
    configuration,
    transactions,
    validation,
    dataTable,
    calendar,
    dialogs,
    signIn,
    files,
    app,
});