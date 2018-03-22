import {PERIOD_NUMBER_MEASURES, CALENDAR_DAYS} from '../../store/types/calendar.types';

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
        },
        shortCalendarDays: {
            [CALENDAR_DAYS.SUNDAY]: 'S',
            [CALENDAR_DAYS.MONDAY]: 'M',
            [CALENDAR_DAYS.TUESDAY]: 'T',
            [CALENDAR_DAYS.WEDNESDAY]: 'W',
            [CALENDAR_DAYS.THURSDAY]: 'T',
            [CALENDAR_DAYS.FRIDAY]: 'F',
            [CALENDAR_DAYS.SATURDAY]: 'S',
        }
    }
}