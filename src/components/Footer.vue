<template>
    <el-footer class="footer" :class="{centered}">
        {{$t('app.footer')}}
        &nbsp;
        <a href="" @click.prevent>Terms of Service</a>&nbsp;|&nbsp;
        <a href="" @click.prevent>FAQ</a>
    </el-footer>
</template>

<script>
    export default {
        props: {
            centered: {
                type: Boolean,
                default: false
            }
        },
    }
</script>

<style scoped lang="scss">
    @import '../design/theme/vars';

    .footer {
        height: $heightFooter !important;
        display: flex;
        align-items: center;
        font-size: $fontSizeSmall;
        background-color: $colorAppFooter;
        color: white;
        text-decoration: none;
        font-weight: bold;
        padding: 0 5px;
        &.centered {
            justify-content: center;
        }
    }
</style>