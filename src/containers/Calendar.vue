<template>
    <app-layout>
        <h1 class="page-title">{{$t('calendar.title')}}</h1>

        <el-form :inline="true">
            <el-form-item :label="$t('calendar.labels.periodNumber')">
                <el-input-number
                    size="small"
                    controls-position="right"
                    :value="periodNumber"
                    @change="handleCalendarStateUpdate({periodNumber: $event})"
                    :min="1"
                />
            </el-form-item>
            <el-form-item>
                <el-select
                    size="small"
                    :value="periodNumberMeasure"
                    @change="handleCalendarStateUpdate({periodNumberMeasure: $event})"
                    placeholder="Status"
                    clearable
                >
                    <el-option
                        v-for="measure in periodNumberMeasures"
                        :key="measure"
                        :label="$t(`calendar.periodNumberMeasures.${measure}`)"
                        :value="measure"
                    />
                </el-select>
            </el-form-item>
        </el-form>

        <full-calendar :events="events" locale="en" />
    </app-layout>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import {CALENDAR} from '../store/types';
    import Calendar from 'vue-fullcalendar';

    export default {
        name: 'calendar',
        components: {
            'full-calendar': Calendar
        },
        data () {
            return {
                events: [
                    {
                        title: 'event1',
                        start: '2016-07-01',
                        cssClass: 'family',
                        YOUR_DATA: {}
                    },
                    {
                        title: 'event2',
                        start: '2016-07-02',
                        end: '2016-07-03',
                        cssClass: ['family', 'career'],
                        YOUR_DATA: {}
                    }
                ]
            }
        },
        computed: {
            ...mapState('calendar', [
                'periodNumberMeasures',
                'periodNumberMeasure',
                'periodNumber',
            ])
        },
        methods: {
            ...mapMutations('calendar', {
                handleCalendarStateUpdate: CALENDAR.UPDATE
            }),
        }
    }
</script>