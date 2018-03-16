<template>
    <el-row type="flex" justify="center" align="middle">
        <el-col :span="8" :xs=24 :sm=24 :md=8 :lg=8>
            <el-card>
                <div slot="header">
                    {{$t('signIn.title')}}
                </div>

                <el-form :model="{password, login}" :rules="rules" ref="form">
                    <el-form-item :label="$t('signIn.labels.login')" prop="login">
                        <el-input v-model="login" />
                    </el-form-item>
                    <el-form-item :label="$t('signIn.labels.password')" prop="password">
                        <el-input v-model="password" />
                    </el-form-item>
                    <el-form-item v-if="errorMessage">
                        <el-alert :title="errorMessage" type="error"/>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" justify="space-between">
                            <router-link to="/account/create">
                                {{$t('signIn.signUpLink')}}
                            </router-link>
                            <router-link to="/password/restore">
                                {{$t('signIn.forgotPasswordLink')}}
                            </router-link>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" justify="center">
                            <el-button type="primary" @click="handleSignIn(login, password)">
                                {{$t('signIn.submitButton')}}
                            </el-button>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import {SIGN_IN} from '../store/types';
    import {signIn} from '../store/actions/signIn.action';
    import {mapStateWithMutation} from '../helpers/state.helper';

    export default {
        name: 'sign-in',
        data() {
            return {
                rules: {
                    login: [{
                        required: true,
                        message: this.$t('validation.require', {name: 'name'}),
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
        computed: {
            ...mapState('signIn', [
                'errorMessage',
            ]),
            ...mapStateWithMutation(`signIn`, SIGN_IN.UPDATE, [
                'login',
                'password'
            ]),
        },
        methods: {
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
        }
    }
</script>