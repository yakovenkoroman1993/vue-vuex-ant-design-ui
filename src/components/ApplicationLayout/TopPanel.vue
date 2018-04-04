<template>
    <el-row type="flex" justify="space-between" align="middle" id="top-panel">
        <el-row type="flex" align="middle" class="interval-horizontal-10">
            <el-button v-if="back" type="primary" @click="$router.go(-1)">
                <i class="el-icon-arrow-left" />
                {{back.toUpperCase()}}
            </el-button>
            <h1 class="page-title">{{title}}</h1>
        </el-row>
        <p class="client-title">
            <span>{{$t('app.client')}}:</span>
            <span>{{activeRetailer.name}}</span>
        </p>
    </el-row>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        props: {
            title: String,
            back: String,
        },
        computed: {
            ...mapGetters('clients', [
                'activeRetailer',
            ]),
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../design/vars";

    #top-panel {
        padding: 7px $paddingHorizontalTopPanel;
        background-color: $colorTopPanel;
        height: $heightTopPanel;

        .client-title {
            color: $colorPageTitle;
            font-weight: bold;
            margin: 0;
            font-size: $fontSizeLarge;
        }

        .page-title {
            font-size: $fontSizePageTitle;
            color: $colorPageTitle;
            font-weight: bold;
            margin: 0;
        }
    }
</style>