<template>
    <el-row type="flex" justify="center" align="middle">
        <el-col :span="8" :xs=24 :sm=24 :md=8 :lg=8>
            <el-card>
                <div slot="header">Sign in</div>
                <el-form>
                <el-form-item label="Login">
                    <el-input
                            :value="login"
                            name="login"
                            @input.native="handleTextFieldUpdate"
                    />
                </el-form-item>
                <el-form-item label="Password">
                    <el-input
                            :value="password"
                            name="password"
                            @input.native="handleTextFieldUpdate"
                    />
                </el-form-item>
                <el-form-item v-if="errorMessage">
                    <el-alert :title="errorMessage" type="error"/>
                </el-form-item>
                <el-form-item>
                    <el-row type="flex" justify="space-between">
                        <router-link to="/account/create">Create an account</router-link>
                        <router-link to="/password/restore">Forgot password?</router-link>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-row type="flex" justify="center">
                        <el-button type="primary" @click="handleSignIn(login, password)">Sign in</el-button>
                    </el-row>
                </el-form-item>
            </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex';
    import {SIGN_IN_FORM} from '../store/types';
    import {signIn} from '../store/actions/signin-form.action';

    export default {
        name: 'sign-in',
        computed: {
            ...mapState('signInForm', [
                'errorMessage',
                'password',
                'login',
            ])
        },
        methods: {
            ...mapMutations('signInForm', {
                handleTextFieldUpdate(commit, {target}) {
                    commit(SIGN_IN_FORM.UPDATE, {
                        [target.name]: target.value
                    })
                },
            }),
            ...mapActions('signInForm', {
                handleSignIn(dispatch, login, password) {
                    dispatch(signIn({login, password}));
                }
            })
        }
    }
</script>