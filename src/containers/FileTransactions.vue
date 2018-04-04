<template>
    <app-layout :back="$t('app.labels.back')">
        <h1 class="title">Acme Corporation Sales 01/01/2018</h1>
        <data-table
            id="transactions"
            :page-size="7"
            :data="transactions"
            @onFilterClear="handleClearFiltersClick"
            :dropdown-actions="['Action 1', 'Action 2', 'Action 3']"
            :row-class-name="tableRowClassName"
        >
            <template slot="filters" >
                <el-form :inline="true">
                    <el-form-item>
                        <app-select
                            :value="activeValidationType"
                            :options="validationTypes"
                            :placeholder="$t('transactions.placeholders.validationType')"
                            @change="onTransactionsStateUpdate({activeValidationType: $event})"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                            size="small"
                            type="daterange"
                            value-format="timestamp"
                            :value="activeCreatedAtPeriod"
                            :range-separator="$t('dataTable.placeholders.periodDatePickerSeparator')"
                            :start-placeholder="$t('dataTable.placeholders.periodDatePickerStart')"
                            :end-placeholder="$t('dataTable.placeholders.periodDatePickerEnd')"
                            @input="onTransactionsStateUpdate({activeCreatedAtPeriod: $event})"
                        />
                    </el-form-item>
                    <el-form-item>
                        <app-select
                            :value="null"
                            :options="[1,2]"
                            :placeholder="$t('transactions.placeholders.store')"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item>
                        <app-select
                            :value="null"
                            :options="[1,2]"
                            :placeholder="$t('transactions.placeholders.description')"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item>
                        <app-select
                            :value="null"
                            :options="[1,2]"
                            :placeholder="$t('transactions.placeholders.upc')"
                            clearable
                        />
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-checkbox
                        :value="showWithIssuesOnly"
                        @change="onTransactionsStateUpdate({showWithIssuesOnly: $event})"
                    >
                        {{$t('transactions.labels.showWithIssuesOnly')}}
                    </el-checkbox>
                </el-row>
            </template>
            <el-table-column prop="validationError" :label="$t('transactions.tableHeaders.validation')" sortable>
                <template slot-scope="scope">
                    <b v-if="scope.row.validationError" class="color-text-warning">{{scope.row.validationError}}</b>
                    <span v-else>Valid</span>
                </template>
            </el-table-column>
            <el-table-column prop="saleDate" width="100" :label="$t('transactions.tableHeaders.saleDate')" sortable>
                <template slot-scope="scope">
                    {{scope.row.saleDate.split(' ')[0]}}
                    <br />
                    {{scope.row.saleDate.split(' ')[1]}}
                </template>
            </el-table-column>
            <el-table-column prop="store" :label="$t('transactions.tableHeaders.store')" sortable />
            <el-table-column prop="description" :label="$t('transactions.tableHeaders.description')" sortable />
            <el-table-column prop="upc" :label="$t('transactions.tableHeaders.upc')" sortable />
            <el-table-column prop="unitsSold" :label="$t('transactions.tableHeaders.unitsSold')" sortable />
            <el-table-column prop="unitCost" :label="$t('transactions.tableHeaders.unitCost')" sortable />
            <el-table-column prop="retailerPrice" :label="$t('transactions.tableHeaders.retailerPrice')" sortable />
            <el-table-column prop="extendedCost" :label="$t('transactions.tableHeaders.extendedCost')" sortable />
            <el-table-column prop="extendedRetail" :label="$t('transactions.tableHeaders.extendedRetail')" sortable />
        </data-table>
    </app-layout>
</template>

<script>
    import {mapState, mapMutations, mapGetters} from 'vuex';
    import {MUTATION_UPDATE} from '../store/types';
    import DataTable from '../components/DataTable';

    export default {
        components: {
            DataTable,
        },
        computed: {
            ...mapState('transactions', [
                'activeCreatedAtPeriod',
                'activeValidationType',
                'showWithIssuesOnly',
                'validationTypes',
            ]),
            ...mapGetters('transactions', [
                'transactions'
            ])
        },
        methods: {
            ...mapMutations('transactions', {
                onTransactionsStateUpdate: MUTATION_UPDATE
            }),
            tableRowClassName({row}) {
                if (row.validationError) {
                    return 'warning-row';
                }

                return '';
            },
            handleClearFiltersClick() {
                this.onTransactionsStateUpdate({
                    activeValidationType: null,
                    activeCreatedAtPeriod: null,
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../design/vars";
    @import "../design/mixins/grid";

    #transactions {
        height: calc(100vh - 245px);
    }

    .title {
        padding: $paddingHorizontalTopPanel $paddingHorizontalTopPanel 0;
        font-size: $fontSizePageTitle;
        color: $colorPageTitle;
        font-weight: bold;
        margin: 0;
    }
</style>

<style lang="scss">
    @import "../design/vars";
    @import "../design/mixins/overrides";
    #transactions {
        @include overrideDataTablesStyles();
        tr.warning-row > td {
            background-color: oldlace;
        }
    }
</style>