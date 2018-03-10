import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import todosInfo from './modules/todosInfo';
import todoForm from './modules/todoForm';
Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        todosInfo,
        todoForm,
        app
    }
});