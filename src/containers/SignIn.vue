<template>
    <guest-layout>
        <el-row class="container" type="flex" justify="center" align="middle">
            <el-col :xs=24 :sm=24 :md=5 :lg=6>
                <el-card id="card" :body-style="{padding: '10px'}">
                    <div slot="header">
                        <el-row id="logo-box" type="flex" justify="center">
                            <img :src="require('./../images/logo.png')" />
                        </el-row>

                        <el-form :model="{password, login}" :rules="rules" ref="form">
                            <el-form-item prop="login">
                                <el-input
                                    :value="login"
                                    @input="onSignInStateUpdate({login: $event})"
                                    :placeholder="$t('signIn.labels.login')"
                                />
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input
                                    :value="password"
                                    @input="onSignInStateUpdate({password: $event})"
                                    :placeholder="$t('signIn.labels.password')"
                                />
                            </el-form-item>
                            <el-form-item v-if="errorMessage">
                                <el-alert :title="errorMessage" type="error"/>
                            </el-form-item>
                            <el-form-item>
                                <el-row type="flex" justify="space-between">
                                    <router-link class="helper-link" to="/account/create">
                                        {{$t('signIn.signUpLink')}}
                                    </router-link>
                                    <router-link class="helper-link" to="/password/restore">
                                        {{$t('signIn.forgotPasswordLink')}}
                                    </router-link>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-row type="flex" justify="center">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="handleSignIn(login, password)"
                        >
                            {{$t('signIn.submitButton').toUpperCase()}}
                        </el-button>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </guest-layout>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex';
    import {MUTATION_UPDATE} from '../store/types';
    import {signIn} from '../store/actions/signIn.action';

    export default {
        name: 'sign-in',
        data() {
            return {
                rules: {
                    login: [{
                        required: true,
                        message: this.$t('validation.require', {name: 'your login'}),
                        trigger: 'blur',
                    }, {
                        min: 3,
                        message: this.$t('validation.lengthShouldBeMore', {value: 3}),
                        trigger: 'blur',
                    }, {
                        max: 10,
                        message: this.$t('validation.lengthShouldBeLess', {value: 10}),
                        trigger: 'change',
                    }],
                    password: [{
                        required: true,
                        message: this.$t('validation.require', {name: 'password'}),
                        trigger: 'blur',
                    }, {
                        min: 6,
                        message: this.$t('validation.lengthShouldBeMore', {value: 6}),
                        trigger: 'blur',
                    }]
                }
            };
        },
        watch: {
            redirectRoute(route) {
                if (!route) {
                    return;
                }

                this.$router.push(route);
            },
        },
        computed: {
            ...mapState('signIn', [
                'redirectRoute',
                'errorMessage',
                'password',
                'login',
            ]),
        },
        methods: {
            ...mapMutations('signIn', {
                onSignInStateUpdate: MUTATION_UPDATE
            }),
            ...mapActions('signIn', {
                handleSignIn(dispatch, login, password) {
                    this.$refs.form.validate((valid) => {
                        if (!valid) {
                            return false;
                        }

                        dispatch(signIn({login, password}));
                    });
                }
            })
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        flex: 1;
    }

    .helper-link {
        font-size: 16px;
        line-height: 24px;
    }

    #logo-box {
        padding-top: 10px;
        padding-bottom: 30px;
    }
</style>