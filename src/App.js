import Vue from 'vue';
import Template from './App.html';
import Component from 'vue-class-component';
import ActionBar from './components/ActionBar/action-bar.component';
import './App.scss';

@Template
@Component({
    name: 'App',
    components: {
        ActionBar
    }
})
export default class extends Vue {}
