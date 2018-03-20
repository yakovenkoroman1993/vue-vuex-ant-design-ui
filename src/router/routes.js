import SignIn from '../containers/SignIn';
import NotFound from '../containers/NotFound';
import Files from '../containers/Files';

export default [
    {
        path: '/authentication',
        component: SignIn
    },
    {
        path: '/',
        component: Files
    },
    {
        path: '*',
        component: NotFound
    }
];