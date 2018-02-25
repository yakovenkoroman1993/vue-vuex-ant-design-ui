import Vue from 'vue';
import Template from './App.html';
import Component from 'vue-class-component';
import HelloWorld from './components/HelloWorld';
import './App.css';

@Template
@Component({
    name: 'App',
    components: {
        HelloWorld
    }
})
export default class extends Vue {}
