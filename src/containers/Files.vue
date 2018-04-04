<template>
    <app-layout :title="$t('files.title')">
        <el-tabs
            id="files-tabs"
            :value="activeType"
            @tab-click="onFilesStateUpdate({activeType: $event.name})"
        >
            <el-tab-pane
                v-for="type in types"
                :key="type"
                :name="type"
                :label="$t(`files.types.${type}`)"
            >
                <data-table
                    v-if="activeType === type"
                    :data="files"
                    :dropdown-actions="actions"
                    dropdown-labels-locale="files.tableActions"
                    @onFilterClear="handleClearFiltersClick"
                >
                    <template slot="actions">
                        <app-dialog-shower
                            :dialog-name="DIALOGS_NAMES.FILES_UPLOAD"
                            :title="'+ ' + $t(`dialogs.${DIALOGS_NAMES.FILES_UPLOAD}.title`).toUpperCase()"
                        />
                    </template>
                    <template slot="filters">
                        <el-form :inline="true">
                            <el-form-item>
                                <app-select
                                    :value="activeStatus"
                                    :options="statuses"
                                    placeholder="Status"
                                    labels-locale="files.statuses"
                                    @change="onFilesStateUpdate({activeStatus: $event})"
                                    clearable
                                />
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker
                                    size="small"
                                    type="date"
                                    placeholder="Date"
                                />
                            </el-form-item>
                            <el-form-item>
                                <app-select
                                    :value="activeUploader"
                                    :options="uploaders"
                                    placeholder="Uploaded by"
                                    @change="onFilesStateUpdate({activeUploader: $event})"
                                    clearable
                                />
                            </el-form-item>
                            <el-form-item>
                                <app-select
                                    :value="activeTransport"
                                    :options="transports"
                                    placeholder="Transport"
                                    labels-locale="files.transports"
                                    @change="onFilesStateUpdate({activeTransport: $event})"
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
                                    @input="onFilesStateUpdate({activeCreatedAtPeriod: $event})"
                                />
                            </el-form-item>
                            <el-form-item>

                            </el-form-item>
                            <el-form-item></el-form-item>
                            <el-form-item></el-form-item>
                        </el-form>
                        <el-row>
                            <el-checkbox
                                :value="showWithIssuesOnly"
                                @change="onFilesStateUpdate({showWithIssuesOnly: $event})"
                            >
                                {{$t('files.labels.showWithIssuesOnly')}}
                            </el-checkbox>
                        </el-row>
                    </template>
                    <el-table-column prop="status" width="100" :label="$t('files.tableHeaders.status')" sortable>
                        <template slot-scope="scope">
                            <i v-if="scope.row.status === 'valid'" class="el-icon-success" />
                            <i v-else class="el-icon-warning" />
                        </template>
                    </el-table-column>
                    <el-table-column width="120" prop="badRecordsNumber" :label="$t('files.tableHeaders.badRecords')" sortable />
                    <el-table-column width="200" prop="createdAt" :label="$t('files.tableHeaders.time')" sortable />
                    <el-table-column prop="type" :label="$t('files.tableHeaders.fileType')" sortable>
                        <template slot-scope="scope">
                            <span>{{$t(`files.types.${scope.row.type}`)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="name" :label="$t('files.tableHeaders.fileName')" />
                    <el-table-column sortable prop="uploader" :label="$t('files.tableHeaders.uploader')" />
                    <el-table-column prop="transport" :label="$t('files.tableHeaders.transport')" sortable>
                        <template slot-scope="scope">
                            <span>{{$t(`files.transports.${scope.row.transport}`)}}</span>
                        </template>
                    </el-table-column>
                    <template slot="after">
                        <el-table-column>
                            <template slot-scope="scope">
                                <el-row type="flex" justify="end">
                                    <router-link :to="{name: ROUTES.FILE_TRANSACTIONS, params: {id: 2}}">
                                        <i class="el-icon-arrow-right" />
                                    </router-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </template>
                </data-table>
            </el-tab-pane>
        </el-tabs>
        <app-upload-dialog :name="DIALOGS_NAMES.FILES_UPLOAD" />
    </app-layout>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import {ROUTES} from '../router/routes';
    import {MUTATION_UPDATE} from '../store/types';
    import {DIALOGS_NAMES} from '../store/types/dialogs.types';
    import ThreeDotsActions from '../components/ThreeDotsActions';
    import DataTable from '../components/DataTable';

    export default {
        components: {
            ThreeDotsActions,
            DataTable,
        },
        data() {
            return {
                actions: [
                    'edit',
                    'refresh',
                    'history',
                    'downloadOriginal'
                ],
                DIALOGS_NAMES,
                ROUTES,
            };
        },
        computed: {
            ...mapState('files', [
                'activeCreatedAtPeriod',
                'showWithIssuesOnly',
                'activeTransport',
                'activeUploader',
                'activeStatus',
                'transports',
                'activeType',
                'statuses',
                'types'
            ]),
            ...mapGetters('files', [
                'uploaders',
                'total',
                'files',
            ]),
            ...mapState('dialogs', {
                openFilesUploadDialog: DIALOGS_NAMES.FILES_UPLOAD
            }),
        },
        methods: {
            ...mapMutations('files', {
                onFilesStateUpdate: MUTATION_UPDATE
            }),
            handleClearFiltersClick() {
                this.onFilesStateUpdate({
                    showWithIssuesOnly: false,
                    activeTransport: null,
                    activeUploader: null,
                    activeStatus: null,
                    activeCreatedAtPeriod: null
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../design/vars";
    @import "../design/mixins/grid";

    div[id^=pane-] {
        height: calc(100vh - 216px);
    }
</style>

<style lang="scss">
    @import "../design/mixins/overrides";
    #files-tabs {
        @include overrideTabsStyles();
        @include overrideDataTablesStyles();
    }
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
</style>