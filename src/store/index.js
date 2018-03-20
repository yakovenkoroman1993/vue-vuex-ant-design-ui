import Vue from 'vue';
import Vuex from 'vuex';
import requestsPlugin from './plugins/requests.plugin';
import app from './modules/app.module';
import todos from './modules/todos.module';
import todoForm from './modules/todoForm.module';
import signIn from './modules/signIn.module';
import files from './modules/files.module';
import complexForm from './modules/complexForm.module';
import userProfile from './modules/userProfile.module';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    plugins: [
        requestsPlugin,
    ],
    modules: {
        userProfile,
        signIn,
        files,
        app
    }
});
