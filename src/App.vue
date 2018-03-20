<template>
    <router-view />
</template>

<script>
    import Vue from 'vue';
    import ApplicationLayout from './components/ApplicationLayout';
    import GuestLayout from './components/GuestLayout';

    Vue.component('guest-layout', GuestLayout);
    Vue.component('app-layout', ApplicationLayout);

    export default {
        name: 'app',
    }
</script>


<style lang="scss">
    @import "design/theme/app";
    @import "design/customization/data-tables-pagination";
</style>