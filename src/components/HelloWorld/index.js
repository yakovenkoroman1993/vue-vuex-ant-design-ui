import Vue from 'vue';
import Component from 'vue-class-component';
import Template from './template.html';

@Template
@Component
export default class HelloWorld extends Vue {
    msg = 'Welcome to Your Vue.js App';
}