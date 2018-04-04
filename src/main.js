import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import i18n from './localization';
import './plugins';
import './components';

new Vue({
    el: '#app',
    i18n,
    store,
    router,
    components: {App},
    template: '<app />'
});