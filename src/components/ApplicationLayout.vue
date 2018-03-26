<template>
    <el-container>
        <el-header id="header">
            <el-row type="flex" justify="space-between" align="middle" class="header-first-part">
                <el-row type="flex" align="middle">
                    <el-row>
                        <img :src="require('../images/logo-white.png')" />
                    </el-row>

                    <el-row type="flex" justify="space-between" align="middle">
                        <el-menu
                            class="menu"
                            mode="horizontal"
                            :default-active="activeRoute"
                            :background-color="colorAppHeader"
                            active-text-color="white"
                            text-color="white"
                        >
                            <el-menu-item
                                v-for="name in menuItems"
                                :key="name"
                                :index="name"
                                @click="handleNavigate(name)"
                            >
                                {{$t(`applicationLayout.menuNavigationItems.${name}`)}}
                            </el-menu-item>
                        </el-menu>
                    </el-row>
                </el-row>

                <el-row type="flex" align="middle" justify="end" class="header-second-part">
                    <el-col :span="2">
                        <el-row type="flex" class="header-actions">
                            <app-dialog-shower
                                :title="$t('applicationLayout.headerActions.changeClient')"
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
        <el-main class="main">
            <template v-if="isLoading">
                <span v-loading.fullscreen.lock="true" />
            </template>
            <slot />

            <app-upload-dialog :name="DIALOGS_NAMES.FILES_UPLOAD" />
            <app-list-dialog
                :name="DIALOGS_NAMES.RETAILER_CHANGE"
                :items="retailers"
                :query="searchQuery"
                :selected="activeRetailerId"
                @change="onClientsStateUpdate({activeRetailerId: $event})"
                @search="onClientsStateUpdate({query: $event})"
            />
        </el-main>
        <!--
        <el-footer>
            <el-row type="flex" justify="center">
                This website is protected by copyright | Terms of Use, Disclaimers © The Nexxus Marketing Group®, LLC
            </el-row>
        </el-footer>
        -->
    </el-container>
</template>

<script>
    import {mapState, mapMutations, mapGetters} from 'vuex';
    import styleVariables from '../design/theme/vars.scss';
    import _pick from 'lodash/pick';
    import {ROUTES} from '../router/routes';
    import {DIALOGS_NAMES} from '../store/types/dialogs.types';
    import {MUTATION_UPDATE} from '../store/types';

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
                DIALOGS_NAMES,
            };
        },
        computed: {
            ...mapState({
                isLoading: state => state.app.isLoading
            }),
            ...mapState('userProfile', [
                'firstName',
                'lastName',
                'jobTitle',
            ]),
            ...mapState('clients', [
                'activeRetailerId',
            ]),
            ...mapState('clients', {
                searchQuery: 'query',
            }),
            ...mapGetters('clients', [
                'retailers',
            ]),
            activeRoute() {
                return this.$route.name;
            }
        },
        beforeMount() {
            let {app: {authenticated}} = this.$store.state;
            if (!authenticated) {
                this.$router.push('authentication');
            }
        },
        methods: {
            handleNavigate(routeName) {
                this.$router.push({name: routeName});
            },
            ...mapMutations('clients', {
                onClientsStateUpdate: MUTATION_UPDATE
            }),
        }
    }
</script>

<style lang="scss" scoped>
    @import "../design/theme/vars";

    #header {
        height: $headerHeight !important;
        background-color: $colorAppHeader;
        .header-first-part {
            img {
                margin-right: 20px;
            }
        }
        .header-second-part {
            flex-grow: 1;
            .header-actions {
                button {
                    color: white;
                }
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

    .main {
        /* header + footer + padding top|bottom */
        height: calc(100vh - #{$headerHeight} - #{$footerHeight} - 2*20px);
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
</style>

<style>
    body {
        background-color: white;
    }
</style>