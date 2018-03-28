<template>
    <el-container direction="vertical">
        <app-layout-header />
        <el-container>
            <app-layout-menu-nav />
            <el-container direction="vertical">
                <el-row type="flex" justify="space-between" align="middle" id="top-panel">
                    <h1 class="page-title">{{title}}</h1>
                    <slot name="clientProfile" />
                </el-row>

                <el-main id="main">
                    <template v-if="isLoading">
                        <span v-loading.fullscreen.lock="true" />
                    </template>

                    <slot />

                    <app-list-dialog
                        :name="DIALOGS_NAMES.RETAILER_CHANGE"
                        :items="retailers"
                        :query="searchQuery"
                        :selected="activeRetailerId"
                        @change="onClientsStateUpdate({activeRetailerId: $event})"
                        @search="onClientsStateUpdate({query: $event})"
                    />
                </el-main>

                <app-layout-footer />
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import {mapState, mapMutations, mapGetters} from 'vuex';
    import {ROUTES} from '../../router/routes';
    import {MUTATION_UPDATE} from '../../store/types';
    import {DIALOGS_NAMES} from '../../store/types/dialogs.types';
    import AppLayoutHeader from './Header';
    import AppLayoutMenuNav from './MenuNavigation';
    import AppLayoutFooter from './Footer';

    export default {
        components: {
            AppLayoutMenuNav,
            AppLayoutHeader,
            AppLayoutFooter,
        },
        props: {
            title: String,
        },
        data() {
            return {
                DIALOGS_NAMES,
            };
        },
        computed: {
            ...mapState('app', ['authenticated']),
            ...mapState('app', ['isLoading']),
            ...mapState('clients', {
                searchQuery: 'query',
            }),
            ...mapState('clients', [
                'activeRetailerId',
            ]),
            ...mapGetters('clients', [
                'retailers',
            ]),
        },
        beforeMount() {
            if (!this.authenticated) {
                this.$router.push({
                    name: ROUTES.SIGN_IN
                });
            }
        },
        methods: {
            ...mapMutations('clients', {
                onClientsStateUpdate: MUTATION_UPDATE
            }),
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../design/theme/vars";

    #top-panel {
        padding: 7px $paddingHorizontalTopPanel;
        background-color: $colorTopPanel;
    }
    #main {
        height: calc(100vh - 177px);
        padding: 0;
    }
</style>

<style>
    body {
        background-color: white;
    }
</style>