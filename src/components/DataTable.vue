<template>
    <div class="container">
        <div class="panel">
            <el-row type="flex" align="middle" justify="space-between">
                <el-col :xs="12" :sm="3" :md="2" :lg="2" :xl="1">
                    <h3>{{$t('dataTable.filters')}}</h3>
                </el-col>
                <el-col :xs="24" :sm="5" :md="3" :lg="2">
                    <a href="" @click.prevent="$emit('onFilterClear')">
                        {{$t('dataTable.clearFilters')}}
                    </a>
                </el-col>
                <spacer size="100%" />
                <slot name="actions"/>
            </el-row>
            <slot name="filters" />
        </div>
        <data-tables
            :table-props="tableOptions"
            :data="data"
            :pagination-def="paginationOptions"
            :show-action-bar="false"
            ref="table"
        >
            <slot name="before" />
            <slot />
            <el-table-column v-if="dropdownActions" :label="$t('dataTable.labels.actions')">
                <template slot-scope="scope">
                    <el-row type="flex" justify="space-between" align="middle">
                        <three-dots-actions
                            :options="dropdownActions"
                            :labelsLocale="dropdownLabelsLocale"
                        />
                    </el-row>
                </template>
            </el-table-column>
            <slot name="after" />
        </data-tables>
    </div>
</template>

<script>
    import ThreeDotsActions from '../components/ThreeDotsActions';

    export default {
        props: {
            dropdownActions: Array,
            dropdownLabelsLocale: String,
            data: {
                type: Array,
                required: true,
            },
            rowClassName: Function,
            pageSize: {
                type: Number,
                default: 10
            },
        },
        components: {
            ThreeDotsActions,
        },
        data() {
            let {pageSize} = this;
            return {
                tableOptions: {
                    maxHeight: null,
                    border: false,
                    rowClassName: this.rowClassName
                },
                paginationOptions: {
                    pageSize,
                    pageSizes: [pageSize, 2 * pageSize, 3 * pageSize],
                    currentPage: 1,
                },
            };
        },
        methods: {
            handleWindowResize() {
                this.tableOptions.maxHeight = this.calcTableHeight();
            },
            calcTableHeight() {
                let {table: {$el: tableElement}} = this.$refs;
                let {y: tableYPos} = tableElement.getBoundingClientRect();
                let {y: parentYPos} = tableElement.parentElement.getBoundingClientRect();
                let {clientHeight: parentHeight} = tableElement.parentElement;
                return parentHeight - (tableYPos - parentYPos);
            },
        },
        mounted() {
            window.addEventListener('resize', this.handleWindowResize);
            this.tableOptions.maxHeight = this.calcTableHeight();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleWindowResize);
        },
    }
</script>

<style lang="scss" scoped>
    @import "../design/vars";

    .container {
        height: 100%;
        .panel {
            padding: 0 $paddingHorizontalTopPanel 15px;
        }
    }
</style>
