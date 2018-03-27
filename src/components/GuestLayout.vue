'<template>
    <el-row type="flex" justify="center" align="middle" class="wrapper">
        <template v-if="isLoading">
            <span v-loading.fullscreen.lock="true" />
        </template>
        <el-container class="container">
            <el-header class="header">
                <el-row>
                    <el-col :span="12" class="logo">
                        <img src="https://www.nexxhub.com/Images/nexxhub.png" />
                        <img :src="require('./../images/logo.png')" />
                    </el-col>
                </el-row>
            </el-header>
            <el-main class="main">
                <slot />
            </el-main>
            <app-footer />
        </el-container>
    </el-row>
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
    @import "../design/theme/vars";

    .wrapper {
        height: 100vh;
        .container {
            background: url(https://www.nexxhub.com/images/Login_BG_Image.jpg) no-repeat;
            height: 750px;
            max-width: 1516px;
            margin: auto;
            align-items: center;

            & > * {
                width: 60%;
            }
            .header {
                height: auto !important;
            }
            .header, .main {
                padding: 0;
            }
            .header {
                .logo {
                    background-color: white;
                    display: flex;
                    padding: 0 10px;
                    justify-content: space-between;
                    img {
                        height: 50px;
                    }
                }
            }
            .main {
                flex-grow: 0;
            }
        }
    }
</style>