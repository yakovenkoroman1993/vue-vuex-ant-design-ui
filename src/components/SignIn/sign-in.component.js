import Vue from 'vue';
import Component from 'vue-class-component';
import Template from './sign-in.template.html';
import {mapState, mapMutations, mapActions} from 'vuex';
import {SIGN_IN_FORM} from '../../store/types';
import {signIn} from '../../store/actions/signin-form.action';

@Template
@Component({
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
            handleSignIn(dispatch) {
                let {login, password} = this.$store.state.signInForm;
                dispatch(signIn({login, password}));
            }
        })
    }
})
export default class extends Vue {}