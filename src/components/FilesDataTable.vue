<template>
    <div class="container">
        <el-row type="flex" align="middle">
            <el-col :span="1">
                <h3>{{$t('files.filters')}}</h3>
            </el-col>
            <el-col :span="2">
                <a href="" @click.prevent="handleClearFiltersClick">
                    {{$t('files.filtersClear')}}
                </a>
            </el-col>
        </el-row>

        <el-row type="flex">
            <el-col :span="3">
                <el-select
                    size="small"
                    :value="activeStatus"
                    @change="onFilesStateUpdate({activeStatus: $event})"
                    placeholder="Status"
                    clearable
                >
                    <el-option
                        v-for="status in statuses"
                        :key="status"
                        :label="$t('files.statuses')[status]"
                        :value="status"
                    />
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-date-picker
                    size="small"
                    type="date"
                    placeholder="Date"
                />
            </el-col>
            <el-col :span="3">
                <el-select
                    size="small"
                    :value="activeUploader"
                    @change="onFilesStateUpdate({activeUploader: $event})"
                    placeholder="Uploaded by"
                    clearable
                >
                    <el-option
                        v-for="uploader in uploaders"
                        :key="uploader"
                        :label="uploader"
                        :value="uploader"
                    />
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select
                    size="small"
                    :value="activeTransport"
                    @change="onFilesStateUpdate({activeTransport: $event})"
                    placeholder="Transport"
                    clearable
                >
                    <el-option
                        v-for="transport in transports"
                        :key="transport"
                        :label="$t('files.transports')[transport]"
                        :value="transport"
                    />
                </el-select>
            </el-col>
        </el-row>

        <br />

        <el-row>
            <el-checkbox
                :value="isShowFilesWithIssuesOnly"
                @change="onFilesStateUpdate({isShowFilesWithIssuesOnly: $event})"
            >
                {{$t('files.checkboxes.isShowFilesWithIssuesOnly')}}
            </el-checkbox>
        </el-row>

        <br />

        <data-tables
            :table-props="tableOptions"
            :data="files"
            :pagination-def="paginationOptions"
            :show-action-bar="false"
            ref="table"
        >
            <el-table-column
                prop="status"
                width="100"
                :label="$t('files.tableHeaders.status')"
                sortable
            >
                <template slot-scope="scope">
                    <i v-if="scope.row.status === 'valid'" class="el-icon-success" />
                    <i v-else class="el-icon-warning" />
                </template>
            </el-table-column>
            <el-table-column
                width="120"
                prop="badRecordsNumber"
                :label="$t('files.tableHeaders.badRecords')"
                sortable
            />
            <el-table-column
                width="200"
                prop="createdAt"
                :label="$t('files.tableHeaders.time')"
                sortable
            />
            <el-table-column prop="type" :label="$t('files.tableHeaders.fileType')" sortable>
                <template slot-scope="scope">
                    <span>{{$t('files.types')[scope.row.type]}}</span>
                </template>
            </el-table-column>
            <el-table-column sortable prop="name" :label="$t('files.tableHeaders.fileName')" />
            <el-table-column sortable prop="uploader" :label="$t('files.tableHeaders.uploader')" />
            <el-table-column prop="transport" :label="$t('files.tableHeaders.transport')" sortable>
                <template slot-scope="scope">
                    <span>{{$t('files.transports')[scope.row.transport]}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('files.tableHeaders.actions')">
                <template slot-scope="scope">
                    <el-row type="flex" justify="space-between" align="middle">
                        <el-dropdown
                            trigger="click"
                            class="table-row-actions-dropdown"
                            @visible-change="handleDropdownVisibleChange($event, scope.row)"
                        >
                            <el-button
                                v-if="dropdownActiveRow === scope.row"
                                icon="el-icon-more-outline"
                                class="active-dropdown-button"
                                round
                            />
                            <el-button v-else type="text" icon="el-icon-more" />
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>Edit</el-dropdown-item>
                                <el-dropdown-item>Refresh</el-dropdown-item>
                                <el-dropdown-item>History</el-dropdown-item>
                                <el-dropdown-item>Download Original</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <a href="" class="table-row-file-link" @click.prevent>
                            <i class="el-icon-arrow-right" />
                        </a>
                    </el-row>
                </template>
            </el-table-column>
        </data-tables>
    </div>
</template>

<script>
    export default {
        name: 'files-data-table',
        data() {
            return {
                tableOptions: {
                    maxHeight: null,
                    border: false,
                },
                paginationOptions: {
                    pageSize: 5,
                    pageSizes: [5, 10, 15],
                    currentPage: 1
                },
                dropdownActiveRow: null
            };
        },
        props: [
            'isShowFilesWithIssuesOnly',
            'onFilesStateUpdate',
            'activeTransport',
            'activeUploader',
            'activeStatus',
            'transports',
            'uploaders',
            'statuses',
            'types',
            'files',
        ],
        mounted() {
            window.addEventListener('resize', this.handleWindowResize);
            this.tableOptions.maxHeight = this.calcTableHeight();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleWindowResize);
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
            handleDropdownVisibleChange(visible, row) {
                this.dropdownActiveRow = visible ? row : null;
            },
            handleClearFiltersClick() {
                this.onFilesStateUpdate({
                    isShowFilesWithIssuesOnly: false,
                    activeTransport: null,
                    activeUploader: null,
                    activeStatus: null,
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../design/theme/vars";

    .container {
        height: 100%;

        table {
            i.el-icon-success {
                font-size: $fontSizeLarge;
                color: $colorPrimary
            }
            i.el-icon-warning {
                font-size: $fontSizeLarge;
                color: $colorWarning
            }
        }

        .table-row-actions-dropdown {
            button {
                color: $colorTextRegular;
                font-size: $fontSizeBase;
                padding: 5px;
                &.active-dropdown-button:focus {
                    background-color: $colorPrimary;
                    color: white;
                }
            }
        }

        .table-row-file-link i {
            color: $colorTextRegular;
            font-size: $fontSizeLarger;
        }
    }
</style>