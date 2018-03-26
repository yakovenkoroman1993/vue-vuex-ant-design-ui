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
                <div class="tab-pane-content" v-if="type === activeTab">
                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.schedule')}}</b>
                        </el-col>
                        <el-switch
                            :value="switches.schedule"
                            @change="handleConfigurationStateUpdate({switches: {schedule: $event}})"
                        />
                    </el-row>
                    <el-collapse-transition>
                        <el-form v-show="switches.schedule" class="section">
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
                                    <app-select
                                        :value="activeScheduleType"
                                        :options="scheduleTypes"
                                        :placeholder="$t('configuration.placeholders.scheduleTypeSelect')"
                                        labels-locale="configuration.scheduleTypes"
                                        @change="handleConfigurationStateUpdate({activeScheduleType: $event})"
                                        clearable
                                    />
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
                                        :value="scheduleEndsOnDate"
                                        size="small"
                                        type="date"
                                        value-format="timestamp"
                                        placeholder="Date"
                                        @input="handleConfigurationStateUpdate({scheduleEndsOnDate: $event})"
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
                    </el-collapse-transition>

                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.transport')}}</b>
                        </el-col>
                        <app-select
                            :value="activeTransport"
                            :options="transports"
                            @change="handleConfigurationStateUpdate({activeTransport: $event})"
                            :placeholder="$t('files.placeholders.transportSelect')"
                            labels-locale="files.transports"
                        >

                        </app-select>
                    </el-row>

                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.fileSizeRange')}}</b>
                        </el-col>
                        <el-switch
                            :value="switches.fileSizeRange"
                            @change="handleConfigurationStateUpdate({switches: {fileSizeRange: $event}})"
                        />
                    </el-row>
                    <el-collapse-transition>
                        <el-form v-show="switches.fileSizeRange" class="section">
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
                    </el-collapse-transition>

                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.filesRange')}}</b>
                        </el-col>
                        <el-switch
                            :value="switches.filesRange"
                            @change="handleConfigurationStateUpdate({switches: {filesRange: $event}})"
                        />
                    </el-row>
                    <el-collapse-transition>
                        <el-form v-show="switches.filesRange" class="section">
                        <el-form-item>
                            <el-col :span="3">
                                <span>{{$t('configuration.labels.numberFilesPerPeriod')}}</span>
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
                    </el-collapse-transition>

                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.fileExtension')}}</b>
                        </el-col>
                        <app-select
                            :value="activeFileExtension"
                            :options="fileExtensions"
                            :placeholder="$t('files.placeholders.fileExtensionSelect')"
                            @change="handleConfigurationStateUpdate({activeFileExtension: $event})"
                            clearable
                        />
                    </el-row>

                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <b>{{$t('configuration.labels.invalidDataLevel')}}</b>
                        </el-col>
                        <el-switch
                            :value="switches.invalidDataLevel"
                            @change="handleConfigurationStateUpdate({switches: {invalidDataLevel: $event}})"
                        />
                    </el-row>
                    <el-collapse-transition>
                        <el-form v-show="switches.invalidDataLevel" class="section">
                            <el-form-item>
                                <el-col :span="3">
                                    <span>{{$t('configuration.labels.maxInvalidData')}}</span>
                                </el-col>
                                <el-col :span="6">
                                    <el-slider v-model="invalidDataLevel" show-input />
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </el-collapse-transition>

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
                </div>
            </el-tab-pane>
        </el-tabs>
    </app-layout>
</template>

<script>
    import {mapMutations, mapState, mapGetters, mapActions} from 'vuex';
    import {MUTATION_UPDATE} from '../store/types';
    import {mapStateWithMutation} from '../helpers/state.helper';
    import {save} from '../store/actions/configuration';

    export default {
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
                'isStopUploading',
                'activeTransport',
                'scheduleTypes',
                'repeatNumber',
                'transports',
                'activeTab',
                'switches',
            ]),
            // todo: after upgrade element-ui replace to simple mapState
            ...mapStateWithMutation('configuration', MUTATION_UPDATE, [
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
    @import "../design/theme/vars";
    @import "../design/mixins/radio-group";

    @include verticalRadioGroupStyle('.schedule-ends-radio-group')

    b {
        font-size: $fontSizeBase;
    }

    .tab-pane-content {
        & > .el-row {
            height: 40px;
        }
        .section {
            margin-bottom: 10px;
            padding: 10px 0;
            &.hidden {
                display: none;
            }
        }
    }

    .el-form-item {
        margin-bottom: 0;
    }
</style>