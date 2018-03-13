export const FILTER_OPTIONS = {
    BY_FILES: 'byFiles',
    BY_DAYS: 'byDays',
};

export const FILTER_OPTIONS_TITLES = {
    [FILTER_OPTIONS.BY_FILES]: 'By files',
    [FILTER_OPTIONS.BY_DAYS]: 'By days',
};

export const FILE_TYPES = {
    ALL: 'all',
    SALES: 'sales',
    REMITTANCE: 'remittance'
};

export const FILE_TYPES_TITLES = {
    [FILE_TYPES.ALL]: 'All',
    [FILE_TYPES.SALES]: 'Sales',
    [FILE_TYPES.REMITTANCE]: 'Remittance',
};

export const TRANSPORT_TYPES = {
    SFTP: 'sftp',
    AS2: 'as2',
};

export const TRANSPORT_TYPES_TITLES = {
    [TRANSPORT_TYPES.SFTP]: 'SFTP',
    [TRANSPORT_TYPES.AS2]: 'AS2',
};

export const FILE_STATUSES = {
    VALID: 'valid',
    INVALID: 'invalid',
};

export const FILE_STATUSES_TITLES = {
    [FILE_STATUSES.VALID]: 'Valid',
    [FILE_STATUSES.INVALID]: 'Invalid',
};
