import Vue from 'vue';
import Vuex from 'vuex';
import requestsPlugin from './plugins/requests.plugin';
import app from './modules/app.module';
import todosInfo from './modules/todos-info.module';
import todoForm from './modules/todo-form.module';
import signInForm from './modules/signin-form.module';
Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    plugins: [
        requestsPlugin
    ],
    modules: {
        todosInfo,
        todoForm,
        signInForm,
        app
    }
});
