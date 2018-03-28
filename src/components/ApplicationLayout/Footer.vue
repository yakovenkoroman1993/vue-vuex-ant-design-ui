<template>
    <el-footer class="footer">
        {{$t('app.footer')}}
        &nbsp;
        <a href="" @click.prevent>Terms of Service</a>&nbsp;|&nbsp;
        <a href="" @click.prevent>FAQ</a>
    </el-footer>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="scss">
    @import '../../design/theme/vars';

    .footer {
        display: flex;
        align-items: center;
        font-size: $fontSizeSmall;
        background-color: $colorAppFooter;
        text-decoration: none;
        padding: 0 5px;
        justify-content: center;
    }
</style>