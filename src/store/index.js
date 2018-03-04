import Vue from 'vue';
import Vuex from 'vuex';
import todos from './modules/todos';
import todoForm from './modules/todoForm';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        todos,
        todoForm
    }
});