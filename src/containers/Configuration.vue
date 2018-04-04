<template>
    <app-layout :title="$t('configuration.title')">
        <el-container direction="vertical" class="container">
            <el-tabs
                id="tabs"
                :value="activeTab"
                @tab-click="handleConfigurationStateUpdate({activeTab: $event.name})"
            >
                <el-tab-pane
                    v-for="type in fileTypes"
                    :key="type"
                    :name="type"
                    :label="$t(`files.types.${type}`)"
                >
                    <el-form class="tab-pane-content" v-if="type === activeTab">
                        <el-form-item>
                            <el-col :span="3" :xs="20">
                                <b>{{$t('configuration.labels.schedule')}}</b>
                            </el-col>
                            <el-switch
                                :value="switches.schedule"
                                @change="handleConfigurationStateUpdate({switches: {schedule: $event}})"
                            />
                        </el-form-item>
                        <el-collapse-transition>
                            <el-form-item v-show="switches.schedule" class="subsection">
                                <el-form>
                                    <el-form-item>
                                        <el-row>
                                            <el-col :span="2" :xs="12">
                                                {{$t('configuration.labels.repeatEvery')}}
                                            </el-col>
                                            <el-col :span="6" :xs="12">
                                                <el-form :inline="true">
                                                    <el-form-item>
                                                        <el-input-number
                                                            size="small"
                                                            :value="repeatNumber"
                                                            @change="handleConfigurationStateUpdate({repeatNumber: $event})"
                                                            :min="1"
                                                        />
                                                    </el-form-item>
                                                    <el-form-item>
                                                        <app-select
                                                            :value="activeScheduleType"
                                                            :options="scheduleTypes"
                                                            :placeholder="$t('configuration.placeholders.scheduleTypeSelect')"
                                                            labels-locale="configuration.scheduleTypes"
                                                            @change="handleConfigurationStateUpdate({activeScheduleType: $event})"
                                                            clearable
                                                        />
                                                    </el-form-item>
                                                </el-form>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-form-item>
                                        <span>{{$t('configuration.labels.repeatOn')}}</span>
                                        <el-checkbox-group size="small" :value="activeRepeatDays">
                                            <el-checkbox-button
                                                v-for="day in calendarDays"
                                                :key="day"
                                                :label="day"
                                                @change="handleConfigurationStateUpdate({activeRepeatDays: {[day]: $event}})"
                                            >
                                                {{$t(`calendar.shortCalendarDays.${day}`)}}
                                            </el-checkbox-button>
                                        </el-checkbox-group>
                                    </el-form-item>
                                    <el-form-item>
                                        <span>{{$t('configuration.labels.scheduleEnds')}}</span>
                                        <el-form :inline="true">
                                            <el-form-item>
                                                <el-radio-group
                                                    :value="activeScheduleEndsOption"
                                                    class="schedule-ends-radio-group"
                                                >
                                                    <el-radio
                                                        v-for="option in scheduleEndsOptions"
                                                        :key="option"
                                                        :label="option"
                                                        @change="handleConfigurationStateUpdate({activeScheduleEndsOption: option})"
                                                    >
                                                        {{$t(`configuration.scheduleEndsGroup.labels.${option}`)}}
                                                    </el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item>
                                                <spacer vertical size="45px" />
                                                <el-date-picker
                                                    :disabled="activeScheduleEndsOption !== scheduleEndsOptions[1]"
                                                    :value="scheduleEndsOnDate"
                                                    size="small"
                                                    type="date"
                                                    value-format="timestamp"
                                                    placeholder="Date"
                                                    @input="handleConfigurationStateUpdate({scheduleEndsOnDate: $event})"
                                                />
                                                <spacer vertical size="5px" />
                                                <el-row>
                                                    <el-input-number
                                                        :disabled="activeScheduleEndsOption !== scheduleEndsOptions[2]"
                                                        size="small"
                                                        :value="occurrencesNumber"
                                                        @change="handleConfigurationStateUpdate({occurrencesNumber: $event})"
                                                        :min="1"
                                                    />
                                                    <spacer size="5px"/>
                                                    {{$t('configuration.scheduleEndsGroup.labels.occurrences')}}
                                                </el-row>
                                            </el-form-item>
                                        </el-form>
                                    </el-form-item>
                                </el-form>
                            </el-form-item>
                        </el-collapse-transition>

                        <el-form-item>
                            <el-col :span="3" class="hidden-sm-and-down">
                                <b>{{$t('configuration.labels.transport')}}</b>
                            </el-col>
                            <app-select
                                :value="activeTransport"
                                :options="transports"
                                @change="handleConfigurationStateUpdate({activeTransport: $event})"
                                :placeholder="$t('files.placeholders.transportSelect')"
                                labels-locale="files.transports"
                            />
                        </el-form-item>

                        <el-form-item>
                            <el-col :span="3" :xs="20">
                                <b>{{$t('configuration.labels.fileSizeRange')}}</b>
                            </el-col>
                            <el-switch
                                :value="switches.fileSizeRange"
                                @change="handleConfigurationStateUpdate({switches: {fileSizeRange: $event}})"
                            />
                        </el-form-item>
                        <el-collapse-transition>
                            <el-form-item v-show="switches.fileSizeRange" class="subsection">
                                <el-row type="flex" align="middle">
                                    <el-col :span="3" :xs="5">
                                        {{$t('configuration.labels.fileSize')}}
                                    </el-col>
                                    <el-col :span="12">
                                        <range-slider
                                            :value="fileSizeRange"
                                            :max="10"
                                            @change="handleConfigurationStateUpdate({fileSizeRange: $event})"
                                        />
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-collapse-transition>

                        <el-form-item>
                            <el-col :span="3" :xs="20">
                                <b>{{$t('configuration.labels.filesRange')}}</b>
                            </el-col>
                            <el-switch
                                :value="switches.filesRange"
                                @change="handleConfigurationStateUpdate({switches: {filesRange: $event}})"
                            />
                        </el-form-item>
                        <el-collapse-transition>
                            <el-form-item v-show="switches.filesRange" class="subsection">
                                <el-row type="flex" align="middle">
                                    <el-col :span="3" :xs="6">
                                        {{$t('configuration.labels.numberFilesPerPeriod')}}
                                    </el-col>
                                    <el-col :span="12">
                                        <range-slider
                                            :value="filesRange"
                                            :max="10"
                                            @change="handleConfigurationStateUpdate({filesRange: $event})"
                                        />
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-collapse-transition>

                        <el-form-item>
                            <el-col :span="3" class="hidden-sm-and-down">
                                <b>{{$t('configuration.labels.fileExtension')}}</b>
                            </el-col>
                            <app-select
                                :value="activeFileExtension"
                                :options="fileExtensions"
                                :placeholder="$t('files.placeholders.fileExtensionSelect')"
                                @change="handleConfigurationStateUpdate({activeFileExtension: $event})"
                                clearable
                            />
                        </el-form-item>

                        <el-form-item>
                            <el-col :span="3" :xs="20">
                                <b>{{$t('configuration.labels.invalidDataLevel')}}</b>
                            </el-col>
                            <el-switch
                                :value="switches.invalidDataLevel"
                                @change="handleConfigurationStateUpdate({switches: {invalidDataLevel: $event}})"
                            />
                        </el-form-item>
                        <el-collapse-transition>
                            <el-form-item v-show="switches.invalidDataLevel" class="subsection">
                                <el-row type="flex" align="middle">
                                    <el-col :span="3" :xs="5">
                                        {{$t('configuration.labels.maxInvalidData')}}
                                    </el-col>
                                    <el-col :span="6">
                                        <el-slider
                                            :value="invalidDataLevel"
                                            @input="handleConfigurationStateUpdate({invalidDataLevel: $event})"
                                            style="width: 400px"
                                            show-input
                                        />
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-collapse-transition>

                        <el-form-item>
                            <el-col :span="3" :xs="20">
                                <b>{{$t('configuration.labels.stopUpload')}}</b>
                                <el-tooltip
                                    effect="dark"
                                    placement="right"
                                    :content="$t('configuration.tooltips.stopUpload')"
                                >
                                    <el-button type="text">
                                        <i class="tooltip-icon el-icon-info" />
                                    </el-button>
                                </el-tooltip>
                            </el-col>
                            <el-switch
                                :value="isStopUploading"
                                @change="handleConfigurationStateUpdate({isStopUploading: $event})"
                            />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <el-row id="actions">
                <hr />
                <el-row type="flex" justify="end">
                    <el-button type="primary" size="medium" @click="handleSaveClick">
                        {{$t('configuration.labels.save').toUpperCase()}}
                    </el-button>
                </el-row>
            </el-row>
        </el-container>
    </app-layout>
</template>

<script>
    import {mapMutations, mapState, mapGetters, mapActions} from 'vuex';
    import {MUTATION_UPDATE} from '../store/types';
    import {save} from '../store/actions/configuration';
    import RangeSlider from '../components/RangeSlider';

    export default {
        components: {
            RangeSlider,
        },
        computed: {
            ...mapGetters('configuration', [
                'activeRepeatDays',
            ]),
            ...mapState('configuration', [
                'activeScheduleEndsOption',
                'scheduleEndsOptions',
                'activeFileExtension',
                'activeScheduleType',
                'scheduleEndsOnDate',
                'occurrencesNumber',
                'invalidDataLevel',
                'isStopUploading',
                'activeTransport',
                'fileSizeRange',
                'scheduleTypes',
                'repeatNumber',
                'filesRange',
                'transports',
                'activeTab',
                'switches',
            ]),
            ...mapState('files', [
                'fileExtensions',
            ]),
            ...mapState('files', {
                fileTypes: 'types',
            }),
            ...mapState('calendar', [
                'calendarDays'
            ]),
        },
        methods: {
            ...mapMutations('configuration', {
                handleConfigurationStateUpdate: MUTATION_UPDATE,
            }),
            ...mapActions('configuration', {
                handleSaveClick(dispatch) {
                    dispatch(save(
                        this.$store.state.configuration,
                        this.$t('configuration.notifications.save')
                    ));
                }
            }),
        }
    }
</script>

<style lang="scss" scoped>
    @import "../design/vars";
    @import "../design/mixins/radio-group";

    @include verticalRadioGroupStyle('.schedule-ends-radio-group')

    .container {
        height: 100%;
    }

    b, .label {
        font-size: $fontSizeBase;
    }

    #tabs {
        flex: 1;
        .tab-pane-content {
            padding: 10px $paddingHorizontalTopPanel;
            & > .el-form-item:not(.subsection) {
                margin-bottom: 10px;
            }

            .subsection {
                margin-bottom: 15px;
            }
        }
    }

    .el-form-item {
        margin-bottom: 0;
    }
</style>

<style lang="scss">
    @import "../design/mixins/overrides";

    #tabs {
        @include overrideTabsStyles();
    }
    #actions {
        padding: 0 20px 10px;
    }
</style>