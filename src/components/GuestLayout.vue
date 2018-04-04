<template>
    <el-container class="container" direction="vertical">
        <template v-if="isLoading">
            <span v-loading.fullscreen.lock="true" />
        </template>
        <el-main class="main">
            <slot />
        </el-main>
    </el-container>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState('app', [
                'isLoading'
            ]),
        }
    }
</script>

<style scoped lang="scss">
    @import "../design/vars";

    .container {
        background: url('../images/login-bg.jpg') no-repeat;
        background-size: cover;
        align-items: center;
        height: 100vh;
        width: 100%;
        .main {
            flex-grow: 0;
            padding: 0;
        }
    }
</style>