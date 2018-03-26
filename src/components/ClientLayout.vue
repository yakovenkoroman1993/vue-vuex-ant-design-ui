<template>
    <app-layout :title="title" v-if="activeRetailerId">
        <template slot="clientProfile">
            <p class="client-title">
                <span>{{$t('configuration.client')}}:</span>
                <span>{{activeRetailer.name}}</span>
            </p>
        </template>
        <slot />
        <app-upload-dialog :name="DIALOGS_NAMES.FILES_UPLOAD" />
    </app-layout>
</template>

<script>
    import {mapState, mapMutations, mapGetters} from 'vuex';
    import {ROUTES} from '../router/routes';
    import {DIALOGS_NAMES} from '../store/types/dialogs.types';
    import {MUTATION_UPDATE} from '../store/types';

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
            ...mapState('clients', [
                'activeRetailerId',
            ]),
            ...mapGetters('clients', [
                'activeRetailer',
            ]),
        },
        watch: {
            activeRetailerId(value) {
                if (!value) {
                    this.navigateToClientSelection();
                }
            },
        },
        methods: {
            ...mapMutations('app', {
                onAppStateUpdate: MUTATION_UPDATE
            }),
            navigateToClientSelection() {
                this.onAppStateUpdate({
                    referrerRouteName: this.$route.name
                });
                this.$router.push({
                    name: ROUTES.CLIENT_SELECTION
                });
            }
        },
        beforeMount() {
            let {activeRetailerId} = this;
            if (!activeRetailerId) {
                this.navigateToClientSelection();
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../design/theme/vars";

    .client-title {
        font-size: $fontSizePageTitle;
        color: $colorPageTitle;
        font-weight: bold;
        margin: 0 0 15px;
        font-size: $fontSizeLarge;
    }
</style>