import Vue from 'vue';
import App from './App';
import './design';
import store from './store';
import router from './router';

new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App/>'
});