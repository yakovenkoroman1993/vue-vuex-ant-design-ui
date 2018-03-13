import {
    FILE_TYPES,
    FILE_STATUSES,
    FILE_TYPES_TITLES,
    FILE_STATUSES_TITLES,
    TRANSPORT_TYPES_TITLES,
} from '../../store/types/files.types';

export function filterFiles(state) {
    let {
        items,
        activeFileType,
        isShowFilesWithIssuesOnly,
    } = state;

    let filters = [];
    if (isShowFilesWithIssuesOnly) {
        filters.push(file => file.status === FILE_STATUSES.INVALID);
    }

    if (activeFileType !== FILE_TYPES.ALL) {
        filters.push(file => file.type === activeFileType);
    }

    items = filters.reduce((result, predicate) => result.filter(predicate), items);

    return {
        ...state,
        items
    };
}

export function normalizeFiles(state) {
    let {items} = state;
    return {
        ...state,
        items: items.map((file) => ({
            ...file,
            createdAt: new Date(file.createdAt).toLocaleString(),
            statusTitle: FILE_STATUSES_TITLES[file.status],
            transportTitle: TRANSPORT_TYPES_TITLES[file.transport],
            typeTitle: FILE_TYPES_TITLES[file.type],
        }))
    };
}