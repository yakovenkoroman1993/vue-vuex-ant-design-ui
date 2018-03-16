<template>
    <div>
        <el-form>
            <el-form-item>
                <el-radio-group v-model="activeFilter">
                    <el-radio-button
                            v-for="(filterOption) in filterOptions"
                            :key="filterOption.name"
                            :label="filterOption.name"
                    >
                        {{filterOption.title}}
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <h2>Files</h2>
            </el-form-item>
            <el-form-item label="File types">
                <el-select v-model="activeFileType" placeholder="Select">
                    <el-option
                            v-for="fileType in fileTypes"
                            :key="fileType.value"
                            :label="fileType.text"
                            :value="fileType.value"
                    />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-switch
                    v-model="onlyWithIssues"
                    active-text="Show files with issues only"
                />
            </el-form-item>
        </el-form>

        <data-tables
            :table-props="tableOptions"
            :data="files"
            :pagination-def="paginationOptions"
            ref="table"
        >
            <el-table-column sortable prop="statusTitle" label="Status"/>
            <el-table-column sortable prop="badRecordsNumber" label="Bad records"/>
            <el-table-column sortable prop="createdAt" label="Time" width="150"/>
            <el-table-column sortable prop="typeTitle" label="File type"/>
            <el-table-column sortable prop="name" label="Name" />
            <el-table-column sortable prop="uploader" label="Upload by"/>
            <el-table-column sortable prop="transportTitle" label="Transport"/>
            <el-table-column label="Actions">
                <template slot-scope="scope">
                    <el-row type="flex" justify="space-between">
                        <el-button-group>
                            <el-button size="mini" icon="el-icon-time"/>
                            <el-button size="mini" icon="el-icon-download"/>
                            <el-button size="mini" icon="el-icon-tickets"/>
                        </el-button-group>

                        <el-button size="mini" icon="el-icon-arrow-right"/>
                    </el-row>
                </template>
            </el-table-column>
        </data-tables>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import {mapStateWithMutation} from '../helpers/state.helper';
    import {prepare} from '../helpers/state.helper';
    import {FILES} from '../store/types';
    import preparers from '../preparers/files-table';

    export default {
        name: 'files-table',
        data() {
            return {
                tableOptions: {
                    maxHeight: null
                    // border: false,
                },
                paginationOptions: {
                    pageSize: 5,
                    pageSizes: [5, 10, 15],
                    currentPage: 1
                }
            };
        },
        mounted() {
            window.addEventListener('resize', this.handleWindowResize);
            this.tableOptions.maxHeight = this.calcTableHeight();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleWindowResize);
        },
        computed: {
            ...mapState('files', [
                'filterOptions',
                'fileTypes',
                'headers',
            ]),
            ...mapState('files', {
                files: prepare('items', preparers.files),
            }),
            ...mapGetters('files', ['total']),
            ...mapStateWithMutation(`files`, FILES.UPDATE, [
                'activeFileType',
                'activeFilter',
            ]),
            ...mapStateWithMutation(`files`, FILES.UPDATE, {
                onlyWithIssues: 'isShowFilesWithIssuesOnly'
            }),
        },
        methods: {
            handleWindowResize() {
                this.tableOptions.maxHeight = this.calcTableHeight();
            },
            calcTableHeight() {
                let {table: {$el: tableElement}} = this.$refs;
                let offset = tableElement.getBoundingClientRect().y - tableElement.parentElement.getBoundingClientRect().y;
                return tableElement.parentElement.clientHeight - offset;
            }
        }
    }
</script>