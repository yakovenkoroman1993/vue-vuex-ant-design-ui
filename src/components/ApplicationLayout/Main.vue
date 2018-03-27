<template>
    <el-main class="main">
        <template v-if="isLoading">
            <span v-loading.fullscreen.lock="true" />
        </template>

        <slot name="headline" />

        <slot />

        <app-list-dialog
            :name="DIALOGS_NAMES.RETAILER_CHANGE"
            :items="retailers"
            :query="searchQuery"
            :selected="activeRetailerId"
            @change="onClientsStateUpdate({activeRetailerId: $event})"
            @search="onClientsStateUpdate({query: $event})"
        />
    </el-main>
</template>

<script>
    import {DIALOGS_NAMES} from '../../store/types/dialogs.types';
    import {mapState, mapMutations, mapGetters} from 'vuex';
    import {MUTATION_UPDATE} from '../../store/types';

    export default {
        props: {
            title: String,
        },
        data() {
            return {
                DIALOGS_NAMES,
            };
        },
        computed: {
            ...mapState('app', ['isLoading']),
            ...mapState('clients', {
                searchQuery: 'query',
            }),
            ...mapState('clients', [
                'activeRetailerId',
            ]),
            ...mapGetters('clients', [
                'retailers',
            ]),
        },
        methods: {
            ...mapMutations('clients', {
                onClientsStateUpdate: MUTATION_UPDATE
            }),
        },


    }
</script>

<style lang="scss" scoped>
    .main {
        height: calc(100vh - 85px);
    }
</style>
