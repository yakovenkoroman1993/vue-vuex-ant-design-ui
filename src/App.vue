<template>
    <v-app>
        <!--<v-navigation-drawer app></v-navigation-drawer>-->
        <!--<v-toolbar app></v-toolbar>-->
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <template v-if="isLoading">
                        <v-flex d-flex justify-center>
                            <v-progress-circular indeterminate :size="50" color="primary" />
                        </v-flex>
                    </template>
                    <template v-else>
                        <router-view />
                        <!--
                        <v-flex d-flex>
                            <v-avatar :tile="true" :size="50">
                                <img :src="require('./images/logo.png')" />
                            </v-avatar>
                        </v-flex>
                        -->
                    </template>
                </v-layout>
            </v-container>
        </v-content>
        <!--<v-footer app />-->
    </v-app>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'App',
        computed: {
            ...mapState({
                isLoading: state => state.app.isLoading
            })
        }
    }
</script>
