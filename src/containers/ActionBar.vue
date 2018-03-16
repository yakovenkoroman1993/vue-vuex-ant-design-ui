<template>
    <el-card>
        <div slot="header">
            <span>Todo Panel</span>

            <el-tooltip effect="dark" content="Go to list" placement="bottom">
                <el-button
                    type="info"
                    @click="handleNavigationToTodoList"
                    round
                >
                    <span>Total {{total}}</span>
                </el-button>
            </el-tooltip>

        </div>

        <el-form>
            <el-form-item label="Name">
                <el-input
                    :value="name"
                    name="name"
                    @input.native="handleTextFieldUpdate"
                />
            </el-form-item>

            <el-form-item>
                <el-switch
                    v-model="reserved"
                    active-text="Reserved"
                    inactive-text=""
                />

                <el-checkbox v-model="completed">Completed</el-checkbox>

                <el-button type="primary" @click="handleTodoCreate">Add</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapMutations, mapActions, mapGetters } from 'vuex';
    import {mapStateWithMutation} from '../helpers/state.helper';
    import {TODO_FORM} from '../store/types';
    import {addTodo} from '../store/actions/todos.action';

    export default {
        name: 'action-bar',
        computed: {
            ...mapState('todoForm', [
                'name',
                'id'
            ]),
            ...mapGetters('todos', [
                'total'
            ]),
            ...mapStateWithMutation(`todoForm`, TODO_FORM.UPDATE, [
                'completed',
                'reserved',
            ]),
        },
        methods: {
            ...mapMutations('todoForm', {
                handleTextFieldUpdate(commit, {target}) {
                    commit(TODO_FORM.UPDATE, {
                        [target.name]: target.value
                    })
                }
            }),
            ...mapActions('todos', {
                handleTodoCreate(dispatch) {
                    dispatch(addTodo());
                }
            }),
            handleNavigationToTodoList() {
                this.$router.push({
                    name: 'todoListRoute'
                })
            }
        }
    }
</script>