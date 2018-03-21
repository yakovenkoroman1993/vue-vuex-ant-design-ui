import {PERIOD_NUMBER_MEASURES} from '../../store/types/calendar.types';

export default {
    en: {
        title: 'Calendar',
        labels: {
            periodNumber: 'Period'
        },
        periodNumberMeasures: {
            [PERIOD_NUMBER_MEASURES.DAY]: 'Days',
            [PERIOD_NUMBER_MEASURES.MONTH]: 'Months',
            [PERIOD_NUMBER_MEASURES.WEEK]: 'Weeks',
            [PERIOD_NUMBER_MEASURES.YEAR]: 'Years',
        }
    }
}