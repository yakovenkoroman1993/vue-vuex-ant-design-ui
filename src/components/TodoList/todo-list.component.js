import Vue from 'vue';
import {mapState} from 'vuex';
import Component from 'vue-class-component';
import Template from './todo-list.template.html';

@Template
@Component({
    name: 'todo-list',
    computed: {
        ...mapState('todosInfo', {
            todos: 'items'
        })
    }
})
export default class extends Vue {
    goToBack() {
        this.$router.go(-1);
    }
}