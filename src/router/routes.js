import {
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
    path: '*',
    component: NotFound
}];