import {
    SignIn,
    TodoList,
    NotFound,
    ActionBar,
} from '../components';

export default [{
    path: '/',
    name: 'homeRoute',
    component: ActionBar
}, {
    path: '/list',
    name: 'todoListRoute',
    component: TodoList
}, {
    path: '/auth',
    component: SignIn
},{
    path: '*',
    component: NotFound
}];