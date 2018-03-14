<template>
    <v-flex xs12 sm8 md4 justify-center>
        <v-card class="elevation-12" dark color="second">
            <v-alert type="error" :value="true">
                Error! This page not found
            </v-alert>
        </v-card>
    </v-flex>
</template>

<script>
    export default {
        name: 'not-found',
    }
</script>