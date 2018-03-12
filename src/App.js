import Vue from 'vue';
import Template from './App.html';
import Component from 'vue-class-component';
import {mapState} from 'vuex';
import './App.scss';

@Template
@Component({
    name: 'App',
    // components: {} // ???
    computed: {
        ...mapState({
            isLoading: state => state.app.isLoading
        })
    }
})
export default class extends Vue {}
