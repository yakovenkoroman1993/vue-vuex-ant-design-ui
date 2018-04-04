<template>
    <el-container direction="vertical">
        <app-layout-header />
        <el-container>
            <app-layout-menu-nav />
            <el-container direction="vertical">
                <app-layout-top-panel :title="title" :back="back"/>

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
    import AppLayoutTopPanel from './TopPanel';

    export default {
        components: {
            AppLayoutMenuNav,
            AppLayoutHeader,
            AppLayoutFooter,
            AppLayoutTopPanel,
        },
        props: {
            title: String,
            back: String,
        },
        data() {
            return {
                DIALOGS_NAMES,
            };
        },
        watch: {
            activeRetailerId(value) {
                if (!value) {
                    this.navigateToClientSelection();
                }
            },
        },
        computed: {
            ...mapState('app', ['authenticated', 'isLoading']),
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
        methods: {
            ...mapMutations('clients', {
                onClientsStateUpdate: MUTATION_UPDATE
            }),
            ...mapMutations('app', {
                onAppStateUpdate: MUTATION_UPDATE
            }),
            navigateToClientSelection() {
                this.onAppStateUpdate({
                    referrerRouteName: this.$route.name
                });
                this.$router.push({
                    name: ROUTES.CLIENT_SELECTION
                });
            }
        },
        beforeMount() {
            if (!this.authenticated) {
                return this.$router.push({
                    name: ROUTES.SIGN_IN
                });
            }

            let {activeRetailerId} = this;
            if (!activeRetailerId) {
                this.navigateToClientSelection();
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../design/vars";
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