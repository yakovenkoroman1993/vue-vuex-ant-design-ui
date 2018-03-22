<template>
    <router-view />
</template>

<script>
    import Vue from 'vue';
    import ApplicationLayout from './components/ApplicationLayout';
    import GuestLayout from './components/GuestLayout';
    import Spacer from './components/Spacer';

    Vue.component('guest-layout', GuestLayout);
    Vue.component('app-layout', ApplicationLayout);
    Vue.component('spacer', Spacer);

    export default {
        name: 'app',
    }
</script>


<style lang="scss">
    @import "design/theme/app";
</style>