<template>
    <el-dialog
        v-if="isOpen"
        :title="dialogTitle"
        :width="width"
        @close="handleDialogClose"
        :show-close="!conserved"
        :close-on-click-modal="!conserved"
        visible
    >
        <el-input
            :value="query"
            :size="inputSize"
            :placeholder="placeholder"
            prefix-icon="el-icon-search"
            @input="$emit('search', $event)"
            autofocus
        />
        <virtual-list
            :size="40"
            :variable="true"
            :remain="10"
            class="list"
        >
            <el-row
                v-for="item of items"
                :name="item.id"
                :key="item.id"
                :class="listItemClasses(item)"
                @click.native="handleListItemClick(item)"
            >
                {{item.name}}
            </el-row>
        </virtual-list>

        <span slot="footer">
            <el-button v-if="!conserved" size="small" @click="handleDialogClose">
                {{closeText}}
            </el-button>
            <el-button
                size="small"
                type="primary"
                @click="handleSelectionApply"
                :disabled="isDisabledApplyButton"
            >
                {{($t('dialogs.actions.select').toUpperCase())}}
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
    import VirtualList from 'vue-virtual-scroll-list';
    import {mapState, mapMutations} from 'vuex';
    import {MUTATION_UPDATE} from '../store/types';

    export default {
        components: {
            VirtualList,
        },
        props: {
            items: {
                type: Array,
                default() {
                    return [];
                },
            },
            resolveEmptySelection: {
                type: Boolean,
                default: false,
            },
            query: {
                type: String,
                default: '',
            },
            name: {
                type: String,
                required: true,
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            width: {
                type: String,
                default: '30%',
            },
            selected: {
                type: [Array, String],
                default: () => [],
            },
            placeholder: String,
            dialogTitle: {
                type: String,
                default() {
                    return this.$t(`dialogs.${this.name}.title`)
                }
            },
            inputSize: {
                type: String,
                default: 'small'
            },
            closeText: {
                type: String,
                default() {
                    return this.closeText || (
                        this.$t(`dialogs.actions.close`).toUpperCase()
                    );
                }
            },
            conserved: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                preselectedIds: [].concat(this.selected)
            };
        },
        computed: {
            ...mapState('dialogs', {
                isOpen(state) {
                    return state[this.name];
                }
            }),
            isDisabledApplyButton() {
                if (this.resolveEmptySelection) {
                    return false;
                }

                return !this.preselectedIds.length;
            }
        },
        methods: {
            ...mapMutations('dialogs', {
                onDialogsStateUpdate: MUTATION_UPDATE,
            }),
            listItemClasses(item) {
                return {
                    'list-item': true,
                    selected: this.preselectedIds.includes(item.id),
                };
            },
            handleDialogClose() {
                this.$emit('close');
                this.onDialogsStateUpdate({[this.name]: false});
                this.$emit('search', '');
            },
            handleListItemClick(item) {
                let {preselectedIds, multiple} = this;
                let isActive = preselectedIds.includes(item.id);
                if (isActive) {
                    this.preselectedIds = preselectedIds.filter(id => id !== item.id);
                }
                else {
                    if (multiple) {
                        this.preselectedIds.push(item.id);
                    }
                    else {
                        this.preselectedIds = [item.id];
                    }
                }

                this.$emit('select', item, isActive);
            },
            handleSelectionApply() {
                let {multiple, preselectedIds} = this;
                let nextSelected = multiple ? preselectedIds : preselectedIds[0];
                this.$emit('change', nextSelected);
                this.handleDialogClose();
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "../design/vars";

    .list {
        margin-top: 10px;
        .list-item {
            padding: 10px;
            cursor: pointer;
            &.selected, &:hover {
                color: $colorPrimary;
            }

            &:hover {
                background-color: $colorHoverPrimary;
            }
            &.selected {
                background-color: $colorFocusPrimary;
                font-weight: bold;
            }
        }
    }
</style>