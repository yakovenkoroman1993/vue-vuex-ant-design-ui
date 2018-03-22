import SignIn from '../containers/SignIn';
import NotFound from '../containers/NotFound';
import Files from '../containers/Files';
import Calendar from '../containers/Calendar';
import Configuration from '../containers/Configuration';

export const ROUTES = {
    HOME: 'listView',
    CALENDAR: 'calendar',
    SIGN_IN: 'authentication',
    PAGE_404: 'notFound',
    CONFIGURATION: 'configuration',
};

export default [
    {
        name: ROUTES.SIGN_IN,
        path: '/authentication',
        component: SignIn
    },
    {
        path: '/',
        name: ROUTES.HOME,
        component: Files
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