import Vue from 'vue';
import {mapState} from 'vuex';
import Component from 'vue-class-component';
import Template from './action-bar.template.html';
import {mapMutations, mapActions, mapGetters } from 'vuex';
import {vuexify} from '../../helpers';
import {TODO_FORM, TODOS_INFO} from '../../store/types';
import {addTodo} from '../../store/actions/todos-info.action';

@Template
@Component({
    name: 'action-bar',
    computed: {
        ...mapState('todoForm', [
            'name',
            'id'
        ]),
        ...mapGetters('todosInfo', [
            'total'
        ]),
        ...vuexify('todoForm/completed', TODO_FORM.UPDATE),
        ...vuexify('todoForm/reserved', TODO_FORM.UPDATE),
    },
    methods: {
        ...mapMutations('todoForm', {
            handleTextFieldUpdate(commit, {target}) {
                commit(TODO_FORM.UPDATE, {
                    [target.name]: target.value
                })
            }
        }),
        ...mapActions('todosInfo', {
            handleTodoCreate(dispatch) {
                dispatch(addTodo());
            }
        }),
    }
})
export default class extends Vue {
    arrowButtonHover = false;
    handleArrowButtonMouseOver() {
        this.arrowButtonHover = true;
    }
    handleArrowButtonMouseLeave() {
        this.arrowButtonHover = false;
    }
    handleNavigationToTodoList() {
        this.$router.push({
            name: 'todoListRoute'
        })
    }
}