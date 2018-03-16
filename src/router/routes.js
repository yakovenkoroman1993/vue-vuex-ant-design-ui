import {
    SignIn,
    TodoList,
    NotFound,
    ActionBar,
    FilesTable,
    ComplexForm,
} from '../containers';

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
    path: '/validation',
    component: ComplexForm,
}, {
    path: '*',
    component: NotFound
}];