<template>
    <el-container>
        <el-header id="header">
            <el-row type="flex" justify="space-between" align="middle">
                <el-row type="flex" align="middle">
                    <el-row id="image-box">
                        <img :src="require('../images/logo-white.png')" />
                    </el-row>
                    <el-menu
                        id="menu"
                        mode="horizontal"
                        :default-active="activeRoute"
                        :background-color="colorAppHeader"
                        active-text-color="white"
                        text-color="white"
                    >
                        <el-menu-item
                            v-for="name in routeNames"
                            :key="name"
                            :index="name"
                            @click="handleNavigate(name)"
                        >
                            {{$t(`applicationLayout.menuNavigationItems.${name}`)}}
                        </el-menu-item>
                    </el-menu>
                </el-row>

                <el-row type="flex" align="middle" justify="end" class="header-second-part">
                    <el-col :span="4">
                        <el-row type="flex" justify="space-around" align="middle">
                            <a href="" @click.prevent class="upload-file-link">
                                <span>+</span>
                                <span>
                                    {{$t('applicationLayout.headerActionLinks.uploadFile')}}
                                </span>
                            </a>

                            <a href="" @click.prevent class="settings-link">
                                <i class="el-icon-setting" />
                            </a>
                        </el-row>
                    </el-col>

                    <el-row type="flex" align="middle">
                        <div class="profile-avatar" />
                        <span class="profile-label">
                            {{firstName}} {{lastName}}, {{jobTitle}}
                        </span>
                    </el-row>
                </el-row>
            </el-row>
        </el-header>
        <el-main class="main">
            <template v-if="isLoading">
                <span v-loading.fullscreen.lock="true" />
            </template>
            <slot />
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
    import {mapState} from 'vuex';
    import styleVaribles from '../design/theme/vars.scss';
    import _pick from 'lodash/pick';
    import {ROUTES} from '../router/routes';

    export default {
        data() {
            return {
                ..._pick(styleVaribles, [
                    'colorAppHeader',
                ]),
                routeNames: [
                    ROUTES.HOME,
                    ROUTES.CALENDAR,
                ]
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../design/theme/vars";

    #header {
        height: $headerHeight !important;
        background-color: $colorAppHeader;
        .header-second-part {
            flex-grow: 1;
        }
    }

    #menu {
        li.is-active {
            background-color: $colorPrimary !important;
            border-bottom-color: $colorPrimary !important;
        }
    }

    #image-box {
        margin-right: 20px;
    }

    .main {
        /* header + footer + padding top|bottom */
        height: calc(100vh - #{$headerHeight} - #{$footerHeight} - 2*20px);
    }

    .profile-avatar {
        border-radius: 50%;
        background-color: #edeff0;
        width: $iconHeight;
        height: $iconHeight;
        margin: 0 10px;
    }

    .profile-label {
        color: white;
    }

    .settings-link {
        font-size: $iconHeight;
        color: lightgray;
    }

    .upload-file-link {
        color: white;
    }

</style>

<style>
    body {
        background-color: white;
    }
</style>