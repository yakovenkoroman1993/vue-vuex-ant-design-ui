import Vue from 'vue';
import Template from './App.html';
import Component from 'vue-class-component';
import HelloWorld from './components/HelloWorld';
import ActionBar from './components/ActionBar';
import './App.scss';

@Template
@Component({
    name: 'App',
    components: {
        HelloWorld,
        ActionBar
    }
})
export default class extends Vue {}
