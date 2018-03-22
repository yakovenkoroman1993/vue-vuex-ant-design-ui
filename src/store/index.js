import Vue from 'vue';
import Vuex from 'vuex';
import requestsPlugin from './plugins/requests.plugin';
import app from './modules/app.module';
import signIn from './modules/signIn.module';
import files from './modules/files.module';
import userProfile from './modules/userProfile.module';
import calendar from './modules/calendar.module';
import configuration from './modules/configuration.module';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    plugins: [
        requestsPlugin,
    ],
    modules: {
        configuration,
        userProfile,
        calendar,
        signIn,
        files,
        app
    }
});
