<template>
    <guest-layout>
        <el-row class="container">
            <el-col :span="12" class="information">
                <p class="information-title">
                    {{$t('signIn.welcome')}}
                </p>
                <p class="information-main">
                    {{$t('signIn.mission')}}
                </p>
                <p>
                    {{$t('signIn.authRequest')}}
                    <a href="" @click.prevent>
                        {{$t('signIn.authRequestLink')}}
                    </a>.
                </p>
                <p>
                    {{$t('signIn.help')}}
                    <a href="mailto:service@thenexxusgroup.com">service@thenexxusgroup.com</a>
                    {{$t('signIn.helpAlternative')}}
                    {{$t('signIn.helpForCanada')}}
                    <a href="mailto:servicecanada@thenexxusgroup.com">servicecanada@thenexxusgroup.com</a>
                    {{$t('signIn.helpForCanadaAlternative')}}
                </p>
                <p>
                    <i>{{$t('signIn.yourTeam')}}</i>
                    <br>
                    <a href="http://www.thenexxusgroup.com">www.thenexxusgroup.com</a>
                </p>
                <p class="information-subline">
                    ⚹⚹ {{$t('signIn.browsersRecommendations')}}
                    <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie" target="_blank">Internet Explorer 11</a>
                    {{$t('signIn.or')}}
                    <a href="http://www.google.com/chrome/browser/desktop/index.html" target="_blank">Chrome</a>
                    {{$t('signIn.browsersRecommendationsReason')}} **
                </p>
            </el-col>
            <el-col :span="12" id="login-form">
                <el-row type="flex" justify="space-between" align="middle">
                    <span class="login-form-title">Log In</span>
                    <app-select
                        :value="$i18n.locale"
                        style="max-width: 150px"
                        size="mini"
                        @change="$i18n.locale = $event"
                        labels-locale="signIn.languages"
                        :options="['en', 'ru']"
                    />
                </el-row>
                <!--:model="{password, login}"-->
                <!--:rules="rules"-->
                <!--ref="form"-->
                <el-form label-position="top">
                    <el-form-item prop="login" class="login-form-item">
                        <el-row>
                            <el-col :span="15">
                                <label>{{$t('signIn.labels.login')}}:</label>
                                <el-input
                                    size="mini"
                                    :value="login"
                                    name="login"
                                    :placeholder="$t('signIn.labels.login')"
                                    @input="onSignInStateUpdate({login: $event})"
                                />
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <span class="login-form-hint">
                            {{$t('signIn.forgotLogin')}}
                            &nbsp;
                            <a href="" @click.prevent><b>{{$t('signIn.clickHere')}}</b></a>
                        </span>
                    </el-form-item>
                    <el-form-item prop="password" class="login-form-item">
                        <el-row>
                            <el-col :span="15">
                                <label>{{$t('signIn.labels.password')}}:</label>
                                <el-input
                                    type="password"
                                    size="mini"
                                    name="password"
                                    :value="password"
                                    :placeholder="$t('signIn.labels.password')"
                                    @input="onSignInStateUpdate({password: $event})"
                                    @change.once="onSignInStateUpdate({password: $event})"
                                />
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <span class="login-form-hint">
                            {{$t('signIn.forgotPassword')}}
                            &nbsp;
                            <a href="" @click.prevent><b>{{$t('signIn.clickHere')}}</b></a>
                        </span>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            style="width: 100px"
                            size="mini"
                            type="primary"
                            @click="handleSignIn({login, password})"
                        >
                            {{$t('signIn.submitButton')}}
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <span class="login-form-hint">
                            {{$t('signIn.withoutAccount')}}
                            &nbsp;
                            <a href="" @click.prevent><b>{{$t('signIn.signUp')}}</b></a>
                        </span>
                    </el-form-item>
                </el-form>
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

    .container {
        flex: 1;
        display: flex;
        .information {
            background-color: $colorAppFooter;
            flex: 1;
            color: white;
            padding: 0 15px;

            & > p {
                font-size: $fontSizeBase;
                line-height: 1.5;
            }

            .information-title {
                font-weight: bold;
                font-size: 15px;
            }
            .information-subline {
                font-size: small;
                font-style: italic
            }
        }

        #login-form {
            background: rgba(255, 255, 255, 0.6);
            padding: 15px;
            .login-form-title {
                font-weight: 400;
                font-size: 30px;
                line-height: 24px;
            }
            form {
                margin-top: 40px;
                .login-form-item {
                    font-weight: bold;
                }
                a {
                    color: #2b92e9;
                }
                .login-form-hint {
                    font-size: 12px;
                }
            }
        }
    }
</style>

<style>
    #login-form .el-form-item__content {
        line-height: 20px;
    }
</style>