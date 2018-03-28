<template>
    <guest-layout>
        <el-row type="flex" id="logo">
            <el-col :span="12">
                <img :src="require('./../images/logo.png')" />
                <img src="https://www.nexxhub.com/Images/nexxhub.png" />
            </el-col>
        </el-row>
        <el-row type="flex" id="content">
            <div id="information">
                <h1>
                    {{$t('signIn.welcome')}}
                </h1>
                <p>
                    <b>{{$t('signIn.mission')}}</b>
                    <br />
                    {{$t('signIn.description')}}
                    <br />
                    <br />
                    {{$t('signIn.advantage')}}
                </p>
            </div>
            <div id="login-form">
                <el-row type="flex" justify="space-between" align="middle">
                    <h1>{{$t('signIn.loginFormTitle')}}</h1>
                    <app-select
                        :value="$i18n.locale"
                        style="max-width: 150px"
                        size="mini"
                        @change="$i18n.locale = $event"
                        labels-locale="signIn.languages"
                        :options="['en', 'ru']"
                    />
                </el-row>

                <el-form label-position="top">
                    <el-form-item prop="login" class="login-form-item">
                        <el-row>
                            <el-col :span="15">
                                <label>{{$t('signIn.labels.login')}}:</label>
                                <el-input
                                    :value="login"
                                    name="login"
                                    :placeholder="$t('signIn.labels.login')"
                                    @input="onSignInStateUpdate({login: $event})"
                                />
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item prop="password" class="login-form-item">
                        <el-row>
                            <el-col :span="15">
                                <label>{{$t('signIn.labels.password')}}:</label>
                                <el-input
                                    type="password"
                                    name="password"
                                    :value="password"
                                    :placeholder="$t('signIn.labels.password')"
                                    @input="onSignInStateUpdate({password: $event})"
                                    @change.once="onSignInStateUpdate({password: $event})"
                                />
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item class="login-form-item">
                        <el-button
                            class="sign-in-button"
                            type="primary"
                            @click="handleSignIn({login, password})"
                        >
                            {{$t('signIn.loginFormTitle')}}
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        {{$t('signIn.withoutAccount')}}
                        <a class="sign-up-link" href="" @click.prevent>
                            <b>{{$t('signIn.signUp')}}</b>
                        </a>
                    </el-form-item>
                </el-form>
            </div>
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
            redirectRoute(value) {
                if (!value) {
                    return;
                }

                this.$router.push(value);
            },
            errorMessage(value) {
                if (value) {
                    this.$notify.error(value);
                }
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
                handleSignIn(dispatch, fields) {
                    let errorFieldNames = ['login', 'password'].filter(name => !fields[name]);
                    if (errorFieldNames.length) {
                        return this.$notify.warning({
                            title: 'Warning',
                            message: `Enter ${errorFieldNames.join(', ')}`,
                        });
                    }

                    dispatch(signIn(fields));
                }
            }),
        },
    }
</script>

<style lang="scss" scoped>
    @import "../design/theme/vars";

    $informationHorizontalPadding: 100px;
    $informationWidth: 364px;
    $formHorizontalPadding: 30px;
    $loginFormWidth: $informationWidth + 2 * (
        $informationHorizontalPadding - $formHorizontalPadding
    );

    h1 {
        font-size: 30px;
        font-weight: 400;
        line-height: 24px;
    }

    #logo > div:first-child {
        background-color: white;
        display: flex;
        padding: 10px 25px;
        justify-content: space-between;
        img {
            height: 60px;
        }
    }
    #content {
        min-height: calc(100vh - 600px);
    }
    #information {
        background-color: $colorAppFooter;
        color: white;
        padding: 0 $informationHorizontalPadding;
        width: $informationWidth;
        & > p {
            font-size: $fontSizeBase;
            line-height: 1.5;
        }
    }
    #login-form {
        background: rgba(255, 255, 255, 0.6);
        padding: 0 $formHorizontalPadding;
        width: $loginFormWidth;
        form {
            .login-form-item {
                font-weight: bold;
                margin-bottom: 20px;
            }
            .sign-up-link {
                color: #2b92e9;
            }
            .sign-in-button {
                width: 140px;
                font-size: large;
                padding: 10px 25px;
            }
        }
    }
</style>

<style>
    #login-form .el-form-item__content {
        line-height: 20px;
    }
</style>