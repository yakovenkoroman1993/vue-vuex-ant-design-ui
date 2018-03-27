<template>
    <el-header id="header">
        <el-row type="flex" justify="space-between" align="middle">
            <el-row type="flex" align="middle">
                <img :src="require('../../images/logo-white.png')" />
            </el-row>
            <el-row type="flex" align="middle" justify="end" class="left-side">
                <el-col :span="2">
                    <el-row type="flex" class="header-actions">
                        <app-dialog-shower
                            :title="$t('app.headerActions.changeClient')"
                            :dialog-name="DIALOGS_NAMES.RETAILER_CHANGE"
                            type="text"
                        />
                    </el-row>
                </el-col>
                <el-col :span="1">
                    <el-menu
                        class="menu"
                        mode="horizontal"
                        :default-active="activeRoute"
                        :background-color="colorAppHeader"
                        active-text-color="white"
                        text-color="white"
                    >
                        <el-menu-item
                            v-for="{name, iconClass} in iconMenuItems"
                            :key="name"
                            :index="name"
                            class="menu-item-icon"
                            @click="handleNavigate(name)"
                        >
                            <el-button type="text">
                                <i :class="iconClass" />
                            </el-button>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="3">
                    <el-row type="flex" align="middle">
                        <el-row class="profile-avatar" />
                        <el-row style="width: 60%">
                            <div class="profile-title ellipsis">
                                {{firstName}} {{lastName}}
                            </div>
                            <div class="profile-subtitle ellipsis">
                                <small>{{jobTitle}}</small>
                            </div>
                        </el-row>
                    </el-row>
                </el-col>
            </el-row>
        </el-row>
    </el-header>
</template>

<script>
    import {mapState} from 'vuex';
    import styleVariables from '../../design/theme/vars.scss';
    import {ROUTES} from '../../router/routes';
    import {DIALOGS_NAMES} from '../../store/types/dialogs.types';
    import _pick from 'lodash/pick';

    export default {
        data() {
            return {
                ..._pick(styleVariables, [
                    'colorAppHeader',
                ]),
                menuItems: [
                    ROUTES.HOME,
                    ROUTES.CALENDAR,
                ],
                iconMenuItems: [{
                    name: ROUTES.CONFIGURATION,
                    iconClass: 'el-icon-setting'
                }],
                DIALOGS_NAMES
            }
        },
        computed: {
            ...mapState('userProfile', [
                'firstName',
                'lastName',
                'jobTitle',
            ]),
            activeRoute() {
                return this.$route.name;
            }
        },
        methods: {
            handleNavigate(routeName) {
                this.$router.push({
                    name: routeName
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../design/theme/vars";

    #header {
        height: $headerHeight !important;
        background-color: $colorAppHeader;
        .left-side {
            flex-grow: 1;
            .header-actions {
                button {
                    color: white;
                    height: 59px;
                    padding: 0 15px;
                    border: 0;
                    border-radius: 0;
                    &:hover {
                        background-color: rgb(46, 74, 103);
                    }
                }
            }

            .profile-avatar {
                border-radius: 50%;
                background-color: #edeff0;
                width: $avatarHeight;
                height: $avatarHeight;
                margin: 0 10px;
            }

            .profile-title {
                color: white;
            }

            .profile-subtitle {
                color: lightgray;
            }
        }

        .menu {
            li.menu-item-icon {
                width: $widthMenuItemIcon;
                i {
                    font-size: x-large;
                    color: lightgray;
                }
                &.is-active i {
                    color: white;
                }
            }

            li.is-active {
                background-color: $colorPrimary !important;
                border-bottom-color: $colorPrimary !important;
            }
        }
    }
</style>