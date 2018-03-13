import {
    SignIn,
    TodoList,
    NotFound,
    ActionBar,
    FilesTable,
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
}, {
    path: '/files',
    component: FilesTable
}, {
    path: '*',
    component: NotFound
}];