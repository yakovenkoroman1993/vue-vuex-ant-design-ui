<template>
    <v-flex xs12 sm8 md4 justify-center>
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
                <v-btn
                    color="darken-2"
                    @click="handleHistoryBack"
                    dark
                    icon
                >
                    <v-icon dark>arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title>Todo list</v-toolbar-title>
                <v-spacer/>
            </v-toolbar>
            <v-list two-line>
                <v-list-tile
                    :key="todo.name"
                    v-for="(todo, i) in todos"
                    @click="handleTodoListItemClick(todo)"
                >
                    <v-list-tile-action>
                        <v-icon v-if="todo.completed" color="pink">star</v-icon>
                        <v-icon v-else="todo.completed" color="pink">star_border</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="todo.name"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card>
    </v-flex>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import {updateTodo} from '../store/actions/todos-info.action';

    export default {
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
            }),
            handleHistoryBack() {
                this.$router.go(-1);
            }
        }
    }
</script>