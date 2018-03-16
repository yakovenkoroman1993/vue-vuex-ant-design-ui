<template>
    <el-card>
        <div slot="header">
            <el-tooltip effect="dark" content="Go to back" placement="bottom">
                <el-button type="info" @click="handleHistoryBack" round>
                    <i class="el-icon-arrow-left" />
                </el-button>
            </el-tooltip>
        </div>
        <el-table :data="todos">
            <el-table-column prop="name" label="Name"/>
            <el-table-column prop="completed" label="Completed">
                <template slot-scope="scope">
                    <el-switch
                        :value="scope.row.completed"
                        @change="handleTodoListItemClick('completed', scope.row)"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="reserved" label="Reserved">
                <template slot-scope="scope">
                    <el-switch
                        :value="scope.row.reserved"
                        @change="handleTodoListItemClick('reserved', scope.row)"
                    />
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import {updateTodo} from '../store/actions/todos.action';

    export default {
        name: 'todo-list',
        computed: {
            ...mapState('todos', {
                todos: 'items'
            })
        },
        methods: {
            ...mapActions('todos', {
                handleTodoListItemClick(dispatch, stateName, todo) {
                    dispatch(updateTodo({
                        ...todo,
                        [stateName]: !todo[stateName]
                    }));
                }
            }),
            handleHistoryBack() {
                this.$router.go(-1);
            }
        }
    }
</script>