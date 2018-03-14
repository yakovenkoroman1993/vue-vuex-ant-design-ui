<template>
    <v-flex xs8 justify-center>
        <v-flex class="pb-2">
            <v-btn-toggle mandatory v-model="activeFilter">
                <v-btn
                    v-for="(filterOption) in filterOptions"
                    :value="filterOption.name"
                    :key="filterOption.name"
                >
                    {{filterOption.title}}
                </v-btn>
            </v-btn-toggle>

            <h2 class="mt-3">Files</h2>

            <v-flex layout align-center xs2>
                <v-subheader>File type</v-subheader>
                <v-select
                    :items="fileTypes"
                    v-model="activeFileType"
                    label="Select"
                    single-line
                />
            </v-flex>

            <v-switch
                label="Show files with issues only"
                v-model="onlyWithIssues"
            />

            <h3 class="mt-3">Total: {{total}} file{{total > 1 ? 's' : ''}}</h3>

        </v-flex>
        <v-flex justify-center>
            <v-data-table
                :headers="headers"
                :items="files"
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.statusTitle }}</td>
                    <td>{{ props.item.badRecordsNumber }}</td>
                    <td>
                        <div class="files-table-column-created-at">{{ props.item.createdAt }}</div>
                    </td>
                    <td>{{ props.item.typeTitle }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.uploader }}</td>
                    <td>{{ props.item.transportTitle }}</td>
                    <td>
                        <v-flex d-flex>
                            <v-btn icon>
                                <v-icon>replay</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>file_download</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>note</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-btn>
                        </v-flex>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
    </v-flex>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import {mapStateWithMutation} from '../helpers/state.helper';
    import {prepare} from '../helpers/state.helper';
    import {FILES} from '../store/types';
    import preparers from '../preparers/files-table.preparer';

    export default {
        name: 'files-table',
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
            ...mapStateWithMutation(`files/${FILES.UPDATE}`, [
                'activeFileType',
                'activeFilter',
            ]),
            ...mapStateWithMutation(`files/${FILES.UPDATE}`, {
                onlyWithIssues: 'isShowFilesWithIssuesOnly'
            })
        }
    }
</script>

<style>
    .files-table-column-created-at {
        min-width: 150px;
    }
</style>