<template>
    <app-layout>
        <el-row type="flex" justify="space-between" align="middle">
            <h1 class="page-title">{{$t('configuration.title')}}</h1>
            <p class="page-subtitle">
                <span>{{$t('configuration.client')}}:</span>
                <span>{{activeRetailer.firstName}} {{activeRetailer.lastName}}</span>
            </p>
        </el-row>

        <el-tabs
            :value="activeTab"
            @tab-click="handleConfigurationStateUpdate({activeTab: $event.name})"
        >
            <el-tab-pane
                v-for="type in fileTypes"
                :key="type"
                :name="type"
                :label="$t(`files.types.${type}`)"
            >
                <div v-if="type === activeTab">
                    <el-row>
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.schedule')}}</b>
                        </el-col>
                        <el-switch
                            :value="scheduleSwitches.first"
                            @change="handleConfigurationStateUpdate({scheduleSwitches: {first: $event}})"
                        />
                    </el-row>
                    <br />
                    <el-form :disabled="!scheduleSwitches.first" class="section">
                        <el-form-item>
                            <el-row>
                                <el-col style="width: 8%">
                                    <span>{{$t('configuration.labels.repeatEvery')}}</span>
                                </el-col>
                                <el-col :span="2">
                                    <el-input-number
                                        size="small"
                                        :value="repeatNumber"
                                        @change="handleConfigurationStateUpdate({repeatNumber: $event})"
                                        :min="1"
                                    />
                                </el-col>
                                <el-col :span="3">
                                    <el-select
                                        size="small"
                                        :value="activeScheduleType"
                                        @change="handleConfigurationStateUpdate({activeScheduleType: $event})"
                                        :placeholder="$t('configuration.placeholders.scheduleTypeSelect')"
                                        clearable
                                    >
                                        <el-option
                                            v-for="type in scheduleTypes"
                                            :key="type"
                                            :label="$t(`configuration.scheduleTypes.${type}`)"
                                            :value="type"
                                        />
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-row>
                                <el-col :span="5">
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
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-row>
                                {{$t('configuration.labels.scheduleEnds')}}
                            </el-row>
                            <el-row>
                                <el-col :span="1">
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
                                </el-col>
                                <el-col :span="3">
                                    <spacer vertical :size="40" />
                                    <el-date-picker
                                        :disabled="activeScheduleEndsOption !== scheduleEndsOptions[1]"
                                        v-model="scheduleEndsOnDate"
                                        size="small"
                                        type="date"
                                        value-format="timestamp"
                                        @change="handleConfigurationStateUpdate({scheduleEndsOnDate: $event})"
                                        placeholder="Date"
                                    />

                                    <el-input-number
                                        :disabled="activeScheduleEndsOption !== scheduleEndsOptions[2]"
                                        size="small"
                                        :value="occurrencesNumber"
                                        @change="handleConfigurationStateUpdate({occurrencesNumber: $event})"
                                        :min="1"
                                    />
                                    {{$t('configuration.scheduleEndsGroup.labels.occurrences')}}
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-form>
                    <br />
                    <el-row>
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.transport')}}</b>
                        </el-col>
                        <el-select
                            size="small"
                            :value="activeTransport"
                            @change="handleConfigurationStateUpdate({activeTransport: $event})"
                            :placeholder="$t('files.placeholders.transportSelect')"
                        >
                            <el-option
                                v-for="transport in transports"
                                :key="transport"
                                :label="$t('files.transports')[transport]"
                                :value="transport"
                            />
                        </el-select>
                    </el-row>
                    <br />
                    <el-row>
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.fileSizeSwitch')}}</b>
                        </el-col>
                        <el-switch
                            :value="isFileSizeAdjusting"
                            @change="handleConfigurationStateUpdate({isFileSizeAdjusting: $event})"
                        />
                    </el-row>
                    <br />
                    <el-form :disabled="!isFileSizeAdjusting" class="section">
                        <el-form-item>
                            <el-col :span="3">
                                <span>{{$t('configuration.labels.fileSize')}}</span>
                            </el-col>
                            <el-col :span="2">
                                <el-input-number
                                    controls-position="right"
                                    size="small"
                                    :value="fileSizeRange[0]"
                                    @change="handleConfigurationStateUpdate({fileSizeRange: [$event, fileSizeRange[1]]})"
                                    :max="fileSizeRange[1]"
                                />
                            </el-col>
                            <el-col :span="2">
                                <el-slider
                                    v-model="fileSizeRange"
                                    :max="10"
                                    range
                                />
                            </el-col>
                            <el-col :span="3">
                                <spacer :size="20" />
                                <el-input-number
                                    controls-position="right"
                                    size="small"
                                    :value="fileSizeRange[1]"
                                    @change="handleConfigurationStateUpdate({fileSizeRange: [fileSizeRange[0], $event]})"
                                    :min="fileSizeRange[0]"
                                />
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <br />
                    <el-row>
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.schedule')}}</b>
                        </el-col>
                        <el-switch
                            :value="scheduleSwitches.second"
                            @change="handleConfigurationStateUpdate({scheduleSwitches: {second: $event}})"
                        />
                    </el-row>
                    <br />
                    <el-form :disabled="!scheduleSwitches.second" class="section">
                        <el-form-item>
                            <el-col :span="3">
                                <span>{{$t('configuration.labels.filesPerPeriod')}}</span>
                            </el-col>
                            <el-col :span="2">
                                <el-input-number
                                    controls-position="right"
                                    size="small"
                                    :value="filesRange[0]"
                                    @change="handleConfigurationStateUpdate({filesRange: [$event, filesRange[1]]})"
                                    :max="filesRange[1]"
                                />
                            </el-col>
                            <el-col :span="2">
                                <el-slider
                                    v-model="filesRange"
                                    :max="10"
                                    range
                                />
                            </el-col>
                            <el-col :span="3">
                                <spacer :size="20" />
                                <el-input-number
                                    controls-position="right"
                                    size="small"
                                    :value="filesRange[1]"
                                    @change="handleConfigurationStateUpdate({filesRange: [filesRange[0], $event]})"
                                    :min="filesRange[0]"
                                />
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <br />
                    <el-row>
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.fileExtension')}}</b>
                        </el-col>
                        <el-select
                            size="small"
                            :value="activeFileExtension"
                            @change="handleConfigurationStateUpdate({activeFileExtension: $event})"
                            :placeholder="$t('files.placeholders.fileExtensionSelect')"
                        >
                            <el-option
                                v-for="ext in fileExtensions"
                                :key="ext"
                                :label="ext.toUpperCase()"
                                :value="ext"
                            />
                        </el-select>
                    </el-row>
                    <br />
                    <el-row>
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.schedule')}}</b>
                        </el-col>
                        <el-switch
                            :value="scheduleSwitches.third"
                            @change="handleConfigurationStateUpdate({scheduleSwitches: {third: $event}})"
                        />
                    </el-row>
                    <br />
                    <el-form :disabled="!scheduleSwitches.third" class="section">
                        <el-form-item>
                            <el-col :span="3">
                                <span>{{$t('configuration.labels.invalidDataLevel')}}</span>
                            </el-col>
                            <el-col :span="6">
                                <el-slider v-model="invalidDataLevel" show-input />
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <el-row type="flex" align="middle">
                        <el-col :span="3">
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
                    </el-row>
                    <hr />
                    <el-row type="flex" justify="end">
                        <el-button type="primary" size="medium" @click="handleSaveClick">
                            {{$t('configuration.labels.save')}}
                        </el-button>
                    </el-row>
                    <br />
                </div>
            </el-tab-pane>
        </el-tabs>
    </app-layout>
</template>

<script>
    import {mapMutations, mapState, mapGetters, mapActions} from 'vuex';
    import {CONFIGURATION} from '../store/types';
    import {mapStateWithMutation} from '../helpers/state.helper';
    import {save} from '../store/actions/configuration';

    export default {
        data() {
            let {scheduleEndsOnDate} = this.$store.state.configuration;
            return {
                scheduleEndsOnDate,
            };
        },
        computed: {
            ...mapGetters('configuration', [
                'activeRepeatDays',
            ]),
            ...mapState('configuration', [
                'activeScheduleEndsOption',
                'scheduleEndsOptions',
                'isFileSizeAdjusting',
                'activeFileExtension',
                'activeScheduleType',
                'occurrencesNumber',
                'scheduleSwitches',
                'isStopUploading',
                'activeTransport',
                'scheduleTypes',
                'repeatNumber',
                'transports',
                'activeTab',
            ]),
            // todo: after upgrade element-ui replace to simple mapState
            ...mapStateWithMutation('configuration', CONFIGURATION.UPDATE, [
                'invalidDataLevel',
                'fileSizeRange',
                'filesRange',
            ]),
            ...mapState('userProfile', [
                'activeRetailer',
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
                handleConfigurationStateUpdate: CONFIGURATION.UPDATE,
            }),
            ...mapActions('configuration', {
                handleSaveClick(dispatch) {
                    dispatch(save(
                        this.$store.state.configuration,
                        this.$t('configuration.notifications.save')
                    ));
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../design/theme/vars";

    .tab-content {
        border: 0;
    }

    .schedule-ends-radio-group {
        display: flex;
        flex-direction: column;
        padding: 0 2px;

        label {
            margin: 0 !important;
            height: 40px;
            display: flex;
            align-items: center;

            &:last-child {
                margin: 0;
            }
        }
    }

    b {
        font-size: $fontSizeBase;
    }

    .section {
        background-color: lighten(whitesmoke, 1%);
        padding: 10px;
    }

    .el-form-item {
        margin-bottom: 0;
    }
</style>