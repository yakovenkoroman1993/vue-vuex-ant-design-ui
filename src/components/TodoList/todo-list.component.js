import Vue from 'vue';
import {mapState, mapActions} from 'vuex';
import Component from 'vue-class-component';
import Template from './todo-list.template.html';

@Template
@Component({
    name: 'todo-list',
    computed: {
        ...mapState('todosInfo', {
            todos: 'items'
        })
    },
    methods: {
        ...mapActions('todosInfo', {
            onTodoListItemClick(dispatch, todo) {
                dispatch('onTodoUpdate', {
                    ...todo,
                    completed: !todo.completed
                });
            }
        })
    }
})
export default class extends Vue {
    goToBack() {
        this.$router.go(-1);
    }
}