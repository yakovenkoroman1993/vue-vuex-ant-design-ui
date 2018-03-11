import Vue from 'vue';
import {mapState} from 'vuex';
import Component from 'vue-class-component';
import Template from './action-bar.template.html';
import {mapMutations, mapActions, mapGetters } from 'vuex';
import {vuexify} from '../../helpers';

@Template
@Component({
    name: 'action-bar',
    computed: {
        ...mapState('todoForm', [
            'name',
            'id'
        ]),
        ...mapState('todosInfo', [
            'isLoading'
        ]),
        ...mapGetters('todosInfo', [
            'total'
        ]),
        ...vuexify('todoForm/completed', 'onUpdate'),
        ...vuexify('todoForm/reserved', 'onUpdate'),
    },
    methods: {
        ...mapMutations('todoForm', {
            onTextFieldUpdate(commit, {target}) {
                commit('onUpdate', {
                    [target.name]: target.value
                })
            }
        }),
        ...mapActions('todosInfo', ['onAdd']),
    }
})
export default class extends Vue {
    arrowButtonHover = false;
    onArrowButtonMouseOver() {
        this.arrowButtonHover = true;
    }
    onArrowButtonMouseLeave() {
        this.arrowButtonHover = false;
    }
    goToTodoList() {
        this.$router.push({
            name: 'todoListRoute'
        })
    }
}