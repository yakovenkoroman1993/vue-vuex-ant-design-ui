<template>
    <v-flex xs12 sm8 md4 justify-center>
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
                <v-toolbar-title>Todo Panel</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                    <v-btn
                        @mouseover="handleArrowButtonMouseOver"
                        @mouseleave="handleArrowButtonMouseLeave"
                        slot="activator"
                        color="darken-2"
                        @click="handleNavigationToTodoList"
                        dark
                        icon
                    >
                        <span v-if="!arrowButtonHover">Total {{total}}</span>
                        <v-icon
                            v-if="arrowButtonHover"
                            dark
                        >
                            {{'arrow_forward'}}
                        </v-icon>
                    </v-btn>
                    <span>Go to list</span>
                </v-tooltip>
            </v-toolbar>
            <v-card-text>
                <v-form>
                    <v-text-field
                        :value="name"
                        label="Name"
                        name="name"
                        @input.native="handleTextFieldUpdate"
                    />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-flex layout class="pl-2">
                    <v-switch
                        label="Reserved"
                        v-model="reserved"
                    />
                    <v-switch
                        label="Completed"
                        v-model="completed"
                    />
                    <v-btn color="primary" @click="handleTodoCreate">Add</v-btn>
                </v-flex>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapMutations, mapActions, mapGetters } from 'vuex';
    import {mapStateWithMutation} from '../helpers/state.helper';
    import {TODO_FORM} from '../store/types';
    import {addTodo} from '../store/actions/todos-info.action';

    export default {
        name: 'action-bar',
        data() {
            return {
                arrowButtonHover: false
            };
        },
        computed: {
            ...mapState('todoForm', [
                'name',
                'id'
            ]),
            ...mapGetters('todosInfo', [
                'total'
            ]),
            ...mapStateWithMutation(`todoForm/${TODO_FORM.UPDATE}`, [
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
            ...mapActions('todosInfo', {
                handleTodoCreate(dispatch) {
                    dispatch(addTodo());
                }
            }),

            handleArrowButtonMouseOver() {
                this.arrowButtonHover = true;
            },
            handleArrowButtonMouseLeave() {
                this.arrowButtonHover = false;
            },
            handleNavigationToTodoList() {
                this.$router.push({
                    name: 'todoListRoute'
                })
            }
        }
    }
</script>