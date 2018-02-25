import Vue from 'vue';
import Component from 'vue-class-component';
import Template from './template.html';
import './styles.css';

@Template
@Component
export default class HelloWorld extends Vue {
    msg = 'Welcome to Your Vue.js App';
}