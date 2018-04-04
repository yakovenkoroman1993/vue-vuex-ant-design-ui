<template>
    <app-layout :title="$t('calendar.title')">
        <el-container direction="vertical" class="container">
            <el-form :inline="true">
                <el-form-item :label="$t('calendar.labels.periodNumber')">
                    <el-input-number
                        size="small"
                        controls-position="right"
                        :value="periodNumber"
                        @change="onCalendarStateUpdate({periodNumber: $event})"
                        :min="1"
                    />
                </el-form-item>
                <el-form-item>
                    <app-select
                        :value="periodNumberMeasure"
                        :options="periodNumberMeasures"
                        labels-locale="calendar.periodNumberMeasures"
                        @change="handleCalendarViewChange"
                        clearable
                    />
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        size="small"
                        type="date"
                        placeholder="Date"
                    />
                </el-form-item>
            </el-form>

            <full-calendar
                :events="events"
                :config="config"
                ref="calendar"
            />
        </el-container>
    </app-layout>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import {MUTATION_UPDATE} from '../store/types';
    import {FILE_TYPES} from '../store/types/files.types';
    import 'fullcalendar/dist/fullcalendar.min.css';
    import styleVariables from '../design/vars.scss';

    export default {
        components: {
            // dynamic import to avoid the increasing of size for vendor bundle
            'full-calendar': () => (
                import('vue-full-calendar/components/FullCalendar')
            )
        },
        data() {
            let defaultView = this.$store.state.calendar.periodNumberMeasure;
            return {
                config: {
                    locale: 'en',
                    // height: 700,
                    defaultView,
                    editable: false,
                    header: {
                        left:   'prevYear,prev',
                        center: 'title',
                        right:  'next,nextYear'
                    }
                }
            };
        },
        computed: {
            ...mapState('calendar', [
                'periodNumberMeasures',
                'periodNumberMeasure',
                'periodNumber',
            ]),
            ...mapState('files', {
                events(state) {
                    return state.items.map(({type, createdAt}) => {
                        return {
                            title: type.toUpperCase(),
                            start: new Date(createdAt).toDateString(),
                            color: {
                                [FILE_TYPES.SALES]: styleVariables.colorPrimary,
                                [FILE_TYPES.REMITTANCE]: styleVariables.colorWarning,
                                [FILE_TYPES.INVENTORY]: styleVariables.colorInfo,
                            }[type],
                        }
                    });
                }
            })
        },
        methods: {
            ...mapMutations('calendar', {
                onCalendarStateUpdate: MUTATION_UPDATE
            }),
            handleCalendarViewChange(view) {
                this.$refs.calendar.fireMethod('changeView', view);
                this.onCalendarStateUpdate({periodNumberMeasure: view});
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../design/vars";

    .container {
        padding: $paddingHorizontalTopPanel $paddingHorizontalTopPanel 0;
    }
</style>