<template>
    <client-layout :title="$t('files.title')">
        <el-tabs
            :value="activeType"
            @tab-click="onFilesStateUpdate({activeType: $event.name})"
        >
            <el-tab-pane
                v-for="type in types"
                :key="type"
                :name="type"
                :label="$t(`files.types.${type}`)"
            >
                <files-data-table
                    v-if="activeType === type"
                    v-bind="pickStateForFilesDataTable()"
                />
            </el-tab-pane>
        </el-tabs>
    </client-layout>
</template>

<script>
    import _pick from 'lodash/pick';
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import {MUTATION_UPDATE} from '../store/types';
    import {DIALOGS_NAMES} from '../store/types/dialogs.types';
    import FilesDataTable from '../components/FilesDataTable';

    export default {
        components: {
            FilesDataTable,
        },
        data() {
            return {
                DIALOGS_NAMES
            };
        },
        computed: {
            ...mapState('files', [
                'isShowFilesWithIssuesOnly',
                'activeCreatedAtPeriod',
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
            pickStateForFilesDataTable() {
                return _pick(this, [
                    'isShowFilesWithIssuesOnly',
                    'activeCreatedAtPeriod',
                    'onFilesStateUpdate',
                    'activeTransport',
                    'activeUploader',
                    'activeStatus',
                    'transports',
                    'uploaders',
                    'statuses',
                    'types',
                    'files',
                ]);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../design/theme/vars.scss";
    div[id^=pane-] {
        height: calc(100vh - 237px)
    }
</style>
