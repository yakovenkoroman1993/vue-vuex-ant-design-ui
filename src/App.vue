<template>
    <el-container>
        <el-header>
            <el-row type="flex" justify="center">
                <img id="logo" :src="require('./images/logo.png')" />
            </el-row>
        </el-header>
        <el-main class="main">
            <template v-if="isLoading">
                <span v-loading.fullscreen.lock="true"/>
            </template>
            <router-view style="height: 100%"/>
        </el-main>
        <el-footer>
            <el-row type="flex" justify="center">
                This website is protected by copyright | Terms of Use, Disclaimers © The Nexxus Marketing Group®, LLC
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'App',
        computed: {
            ...mapState({
                isLoading: state => state.app.isLoading
            })
        }
    }
</script>

<style scoped>
    #logo {
        height: 60px;
    }
    .main {
        /*header + footer + padding top|bottom*/
        height: calc(100vh - 60px - 60px - 2*20px);
    }
</style>
