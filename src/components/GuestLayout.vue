<template>
    <el-container>
        <el-main class="main">
            <template v-if="isLoading">
                <span v-loading.fullscreen.lock="true" />
            </template>
            <slot />
        </el-main>
    </el-container>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'guest-layout',
        computed: {
            ...mapState({
                isLoading: state => state.app.isLoading
            }),
        }
    }
</script>

<style scoped>
    .main {
        display: flex;
        height: calc(100vh - 16px);
    }
</style>