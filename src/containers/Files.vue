<template>
    <app-layout>
        <h1 class="page-title">{{$t('files.title')}}</h1>
        <el-tabs
            id="file-types-tabs"
            :value="activeType"
            @tab-click="onFilesStateUpdate({activeType: $event.name})"
        >
            <el-tab-pane name="sales" :label="$t('files.types.sales')">
                <files-data-table
                    v-if="activeType === 'sales'"
                    v-bind="pickStateForFilesDataTable()"
                />
            </el-tab-pane>
            <el-tab-pane name="remittance" :label="$t('files.types.remittance')">
                <files-data-table
                    v-if="activeType === 'remittance'"
                    v-bind="pickStateForFilesDataTable()"
                />
            </el-tab-pane>
            <el-tab-pane name="outbound" :label="$t('files.types.outbound')">
                <files-data-table
                    v-if="activeType === 'outbound'"
                    v-bind="pickStateForFilesDataTable()"
                />
            </el-tab-pane>
        </el-tabs>
    </app-layout>
</template>

<script>
    import _pick from 'lodash/pick';
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import {FILES} from '../store/types';
    import FilesDataTable from '../components/FilesDataTable';

    export default {
        components: {FilesDataTable},
        name: 'files',
        computed: {
            ...mapState('files', [
                'isShowFilesWithIssuesOnly',
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
        },
        methods: {
            ...mapMutations('files', {
                onFilesStateUpdate: FILES.UPDATE
            }),
            pickStateForFilesDataTable() {
                return _pick(this, [
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
                ]);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../design/theme/vars.scss";

    #file-types-tabs {
        margin-top: 15px;
    }

    div[id^=pane-] {
        height: calc(100vh - 252px);
    }
</style>

<!--
<style lang="scss">
    #file-types-tabs div[id^=tab-] {
        /*min-width: 70px;*/
        /*padding-left: 20px;*/
        /*text-align: center;*/
        /*padding: 0;*/
        /*padding: 0 20px;*/
    }

    #file-types-tabs .is-top {
        min-width: 70px;
    }
</style>
-->
