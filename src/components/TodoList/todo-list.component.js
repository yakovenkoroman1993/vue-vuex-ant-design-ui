import Vue from 'vue';
import {mapState, mapActions} from 'vuex';
import Component from 'vue-class-component';
import Template from './todo-list.template.html';
import {updateTodo} from '../../store/actions/todos-info.action';

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
            handleTodoListItemClick(dispatch, todo) {
                dispatch(updateTodo({
                    ...todo,
                    completed: !todo.completed
                }));
            }
        })
    }
})
export default class extends Vue {
    handleHistoryBack() {
        this.$router.go(-1);
    }
}