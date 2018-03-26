<template>
    <el-button :type="type" @click="handleDialogOpen">
        {{title}}
    </el-button>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {MUTATION_UPDATE} from '../store/types';

    export default {
        props: {
            dialogName: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                default() {
                    return this.$t(`dialogs.${this.dialogName}.title`).toUpperCase();
                }
            },
            type: {
                type: String,
                default: 'primary',
            },
        },
        methods: {
            ...mapMutations('dialogs', {
                handleDialogOpen(commit) {
                    commit(MUTATION_UPDATE, {
                        [this.dialogName]: true
                    });
                }
            }),
        }
    }
</script>
