import Vue from 'vue';
import Template from './App.html';
import Component from 'vue-class-component';
import './App.scss';

@Template
@Component({
    name: 'App',
    // components: {
    //     ActionBar,
    // }
})
export default class extends Vue {}
