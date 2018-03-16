import Vue from 'vue';
import App from './App';
import './design';
import store from './store';
import router from './router';
import i18n from './localization';

new Vue({
    el: '#app',
    i18n,
    store,
    router,
    components: {App},
    template: '<App/>'
});