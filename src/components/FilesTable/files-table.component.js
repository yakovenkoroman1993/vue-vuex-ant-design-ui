import Vue from 'vue';
import Component from 'vue-class-component';
import Template from './files-table.template.html';
import {mapState, mapGetters} from 'vuex';
import './files-table.styles.scss';
import {vuexify, pipe, select} from '../../helpers';
import {FILES} from '../../store/types';
import {
    filterFiles,
    normalizeFiles,
} from './files-table.selectors';

@Template
@Component({
    name: 'files-table',
    computed: {
        ...mapState('files', [
            'isShowFilesWithIssuesOnly',
            'filterOptions',
            'fileTypes',
            'headers',
        ]),
        ...mapState('files', {
            files: pipe(
                filterFiles,
                normalizeFiles,
                select('items')
            ),
        }),
        ...mapGetters('files', ['total']),
        ...vuexify('files/activeFilter', FILES.UPDATE),
        ...vuexify('files/activeFileType', FILES.UPDATE),
        ...vuexify('files/isShowFilesWithIssuesOnly', FILES.UPDATE),
    }
})
export default class extends Vue {}