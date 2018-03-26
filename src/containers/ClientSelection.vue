<template>
    <app-list-dialog
        :name="DIALOGS_NAMES.RETAILER_CHANGE"
        :items="retailers"
        :query="searchQuery"
        @change="handleClientSelect"
        @search="onClientsStateUpdate({query: $event})"
        conserved
    />
</template>

<script>
    import {mapState, mapMutations, mapGetters} from 'vuex';
    import {MUTATION_UPDATE} from '../store/types';
    import {DIALOGS_NAMES} from '../store/types/dialogs.types';
    import {ROUTES} from '../router/routes';

    export default {
        data() {
            return {
                DIALOGS_NAMES,
            };
        },
        computed: {
            ...mapGetters('clients', [
                'activeRetailer',
                'retailers',
            ]),
            ...mapState('clients', {
                searchQuery: 'query',
            }),
            ...mapState('app', [
                'referrerRouteName',
            ]),
        },
        methods: {
            ...mapMutations('clients', {
                onClientsStateUpdate: MUTATION_UPDATE
            }),
            ...mapMutations('app', {
                onAppStateUpdate: MUTATION_UPDATE
            }),
            ...mapMutations('dialogs', {
                handleDialogOpen(commit) {
                    commit(MUTATION_UPDATE, {
                        [DIALOGS_NAMES.RETAILER_CHANGE]: true
                    });
                }
            }),
            handleClientSelect(activeRetailerId) {
                this.onClientsStateUpdate({activeRetailerId});
                this.$router.push({
                    name: this.referrerRouteName || ROUTES.HOME
                });
                this.onAppStateUpdate({referrerRouteName: null});
            },
        },
        beforeMount() {
            this.handleDialogOpen();
        }
    }
</script>