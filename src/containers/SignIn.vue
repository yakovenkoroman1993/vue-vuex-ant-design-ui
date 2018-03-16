<template>
    <el-row type="flex" justify="center" align="middle">
        <el-col :span="8" :xs=24 :sm=24 :md=8 :lg=8>
            <el-card>
                <div slot="header">Sign in</div>

                <el-form :model="{password, login}" :rules="rules" ref="form">
                    <el-form-item label="Login" prop="login">
                        <el-input v-model="login" />
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input v-model="password" />
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
                        message: 'Please input name',
                        trigger: 'blur',
                    }, {
                        min: 3,
                        message: 'Length should be at least 3',
                        trigger: 'blur',
                    }, {
                        max: 10,
                        message: 'Length should be less 10',
                        trigger: 'change',
                    }],
                    password: [{
                        required: true,
                        message: 'Please input password',
                        trigger: 'blur',
                    }, {
                        min: 6,
                        message: 'Length should be at least 6',
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