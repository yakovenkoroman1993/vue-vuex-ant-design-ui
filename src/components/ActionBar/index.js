import Vue from 'vue';
import {mapState} from 'vuex';
import Component from 'vue-class-component';
import Template from './template.html';
import './styles.scss';

@Template
@Component({
    name: 'action-bar',
    computed: {
        ...mapState({
            todoName: state => state.todoForm.todoName
        })
    },
    methods: {
        updateTodoName(nextValue) {
            debugger;
            this.$store.commit('updateForm', {
                todoName: nextValue
            })
        }
    }
})
export default class extends Vue {
    addTodo() {
        debugger;
    }
}