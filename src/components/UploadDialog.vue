<template>
    <el-dialog
        v-if="open"
        :title="dialogTitle"
        :width="width"
        @close="handleDialogClose"
        visible
    >
        <el-upload
            class="uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :on-error="onError"
            :before-upload="resetErrorMessage"
            :before-remove="resetErrorMessage"
            drag
        >
            <i class="color-text-primary el-icon-upload" />
            <div>
                {{$t(`dialogs.alerts.dropFile`)}}
                <em>{{$t(`dialogs.alerts.uploadFile`)}}</em>
            </div>
            <slot />
            <div class="tip" slot="tip" v-if="errorMessage">
                <el-alert
                    title=""
                    type="error"
                    @close="resetErrorMessage"
                    v-html="errorMessage"
                />
            </div>
        </el-upload>
        <span slot="footer">
            <el-button size="small" @click="handleDialogClose">
                {{closeText}}
            </el-button>
            <el-button v-if="errorMessage" size="small" type="primary">
                {{($t('dialogs.actions.showLogs').toUpperCase())}}
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import {MUTATION_UPDATE} from '../store/types';

    export default {
        data() {
            return {
                errorMessage: null,
            };
        },
        props: {
            name: {
                type: String,
                required: true,
            },
            dialogTitle: {
                type: String,
                default() {
                    let {dialogTitle, name} = this;
                    return dialogTitle || (
                        this.$t(`dialogs.${name}.title`)
                    );
                }
            },
            closeText: {
                type: String,
                default() {
                    return this.closeText || (
                        this.$t(`dialogs.actions.close`).toUpperCase()
                    );
                }
            },
            hidden: {
                type: Boolean,
                default: false,
            },
            width: {
                type: String,
                default: '30%'
            }
        },
        computed: {
            ...mapState('dialogs', {
                open(state) {
                    return state[this.name];
                }
            })
        },
        methods: {
            onError(event, file) {
                this.errorMessage = this.$t(`dialogs.templates.uploadError`, {
                    fileName: file.name
                });
            },
            resetErrorMessage() {
                this.errorMessage = null;
            },
            ...mapMutations('dialogs', {
                handleDialogClose(commit) {
                    this.resetErrorMessage();
                    commit(MUTATION_UPDATE, {
                        [this.name]: false
                    });
                }
            }),
        }
    }
</script>

<style scoped lang="scss">
    .uploader {
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        .tip {
            margin-top: 10px;
        }
    }
</style>