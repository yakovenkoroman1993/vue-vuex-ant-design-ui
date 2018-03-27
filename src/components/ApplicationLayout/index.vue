<template>
    <el-container direction="vertical">
        <app-layout-header />
        <el-container>
            <app-layout-menu-nav />
            <app-layout-main :title="title">
                <el-row slot="headline" type="flex" justify="space-between" align="middle">
                    <slot name="title">
                        <h1 class="page-title">{{title}}</h1>
                    </slot>

                    <slot name="clientProfile" />
                </el-row>
                <slot />
            </app-layout-main>
        </el-container>
        <app-footer centered />
    </el-container>
</template>

<script>
    import {mapState} from 'vuex';
    import {ROUTES} from '../../router/routes';
    import AppLayoutHeader from './Header';
    import AppLayoutMain from './Main';
    import AppLayoutMenuNav from './MenuNavigation';

    export default {
        components: {
            AppLayoutMenuNav,
            AppLayoutHeader,
            AppLayoutMain,
        },
        props: {
            title: String,
        },
        computed: {
            ...mapState('app', ['authenticated']),
        },
        beforeMount() {
            if (!this.authenticated) {
                this.$router.push({
                    name: ROUTES.SIGN_IN
                });
            }
        },
    }
</script>

<style>
    body {
        background-color: white;
    }
</style>