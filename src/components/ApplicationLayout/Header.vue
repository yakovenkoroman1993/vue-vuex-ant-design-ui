<template>
    <el-header id="header">
        <el-row type="flex" justify="space-between" align="middle">
            <el-row type="flex" align="middle">
                <img style="width: 150px" :src="require('../../images/logo.png')" />
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
                            <div class="ellipsis">
                                <b >{{firstName}} {{lastName}}</b>
                            </div>
                            <div class="ellipsis">
                                <small><b>{{jobTitle}}</b></small>
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
    import styleVariables from '../../design/vars.scss';
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
    @import "../../design/vars";

    #header {
        height: $heightHeader !important;
        background-color: $colorAppHeader;
        .left-side {
            flex-grow: 1;
            .header-actions {
                button {
                    color: $colorTextRegular;
                    height: 59px;
                    padding: 0 15px;
                    border: 0;
                    border-radius: 0;

                    &:hover {
                        color: $colorPrimary;
                    }
                }
            }

            .profile-avatar {
                border-radius: 50%;
                background-color: #edeff0;
                width: $heightAvatar;
                height: $heightAvatar;
                margin: 0 10px;
            }
        }

        .menu {
            .menu-item-icon {
                width: $widthMenuItemIcon;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0;

                i {
                    font-size: x-large;
                    margin: 0;
                }

                button {
                    padding: 0;
                    border-radius: 50%;
                    width: $widthMenuItemIcon / 2;
                    height: $widthMenuItemIcon / 2;
                }

                &.is-active {
                    i {
                        color: white;
                    }
                    button {
                        background-color: $colorPrimary;
                    }
                    border-bottom-color: $colorPrimary !important;
                }
            }
        }
    }
</style>