<template>
    <guest-layout>
        <el-row class="container" type="flex" justify="center" align="middle">
            <el-col :xs=24 :sm=24 :md=5 :lg=6>
                <el-card id="card" :body-style="{padding: '10px'}">
                    <div slot="header">
                        <el-row id="logo-box" type="flex" justify="center">
                            <img :src="require('./../images/logo.png')" />
                        </el-row>

                        <el-form>
                            <el-form-item>
                                <el-input
                                    :value="login"
                                    @input="onSignInStateUpdate({login: $event})"
                                    :placeholder="$t('signIn.labels.login')"
                                    @blur.once="handleFieldBlurFor('login')"
                                />
                                <small v-if="errorsDisplay.login && errors.login" class="text-danger">
                                    {{getErrorTextFor('login')}}
                                </small>
                            </el-form-item>
                            <el-form-item>
                                <el-input
                                    :value="password"
                                    @input="onSignInStateUpdate({password: $event})"
                                    :placeholder="$t('signIn.labels.password')"
                                    @blur.once="handleFieldBlurFor('password')"
                                />
                                <small v-if="errorsDisplay.password && errors.password" class="text-danger">
                                    {{getErrorTextFor('password')}}
                                </small>
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
                            :disabled="!valid"
                            @click="handleSignIn"
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
    import {mapGetters, mapState, mapActions, mapMutations} from 'vuex';
    import {SIGN_IN} from '../store/types';
    import {signIn} from '../store/actions/signIn.action';

    export default {
        name: 'sign-in',
        computed: {
            ...mapState('signIn', [
                'errorsDisplay',
                'errorMessage',
                'password',
                'errors',
                'login',
            ]),
            ...mapGetters('signIn', [
                'valid'
            ])
        },
        methods: {
            ...mapMutations('signIn', {
                onSignInStateUpdate: SIGN_IN.UPDATE,
                handleFieldBlurFor(commit, fieldName) {
                    commit(SIGN_IN.RESOLVE_STATE_KEY_FOR_VALIDATION, fieldName);
                }
            }),
            ...mapActions('signIn', {
                handleSignIn(dispatch) {
                    if (!this.valid) {
                        return;
                    }

                    let {login, password} = this;
                    dispatch(signIn({login, password}));
                }
            }),
            getErrorTextFor(fieldName) {
                let errors = this.errors[fieldName];
                return this.$t(`validation.${Object.keys(errors)[0]}`, {
                    value: Object.values(errors)[0]
                });
            }
        }
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