import SignIn from '../containers/SignIn';
import NotFound from '../containers/NotFound';
import Files from '../containers/Files';
import Calendar from '../containers/Calendar';
import Configuration from '../containers/Configuration';
import ClientSelection from '../containers/ClientSelection';
import FileTransactions from '../containers/FileTransactions';

export const ROUTES = {
    HOME: 'listView',
    CALENDAR: 'calendar',
    SIGN_IN: 'authentication',
    PAGE_404: 'notFound',
    CONFIGURATION: 'configuration',
    CLIENT_SELECTION: 'clientSelection',
    FILE_TRANSACTIONS: 'fileTransactions',
};

export default [
    {
        name: ROUTES.SIGN_IN,
        path: '/authentication',
        component: SignIn
    },
    {
        name: ROUTES.CLIENT_SELECTION,
        path: '/clients/selection',
        component: ClientSelection
    },
    {
        path: '/',
        name: ROUTES.HOME,
        component: Files,
    },
    {
        path: '/files/:id',
        name: ROUTES.FILE_TRANSACTIONS,
        component: FileTransactions,
        meta: {
            parent: ROUTES.HOME
        }
    },
    {
        path: '/calendar',
        name: ROUTES.CALENDAR,
        component: Calendar
    },
    {
        path: '/configuration',
        name: ROUTES.CONFIGURATION,
        component: Configuration
    },
    {
        name: ROUTES.PAGE_404,
        path: '*',
        component: NotFound
    }
];