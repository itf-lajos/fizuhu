import Vue from "vue";
import Vuex from "vuex";

import Axios from 'axios';
const apiKey = "AIzaSyCnTk4xguRoE-Xg2TjWUNhDTIklM3fhENA";

Vue.use(Vuex);

import DataService from "./DataService";

export const TYPES = {
    actions: {
        signIn: "signIn",
        signUp: "signUp",        
        auth: "auth"
    },
    mutations: {
        setUser: "setUser"
    }
};

const state = {
    url: {
        signUp: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`,
        signIn: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`,
        firebase: 'https://fizuhu-itf.firebaseio.com',
        backend: 'http://localhost:3000'
    },
    user: {
        kind: '',
        idToken: '',
        email: '',
        refreshToken: '',
        expiresIn: '',
        localId: ''
    }
}

const actions = {
    [TYPES.actions.signIn]({ dispatch }, credentialsPayload) {
        return dispatch(TYPES.actions.auth, {
            ...credentialsPayload,
            isSignUp: false
        });
    },
    [TYPES.actions.signUp]({ dispatch }, credentialsPayload) {
        return dispatch(TYPES.actions.auth, {
            ...credentialsPayload,
            isSignUp: true
        });
    },
    [TYPES.actions.auth]({ commit, state }, { email, password, isSignUp }) {
        return Axios.post(isSignUp ? state.url.signUp : state.url.signIn, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .then(r => r.data)
        .then(r => {
            commit(TYPES.mutations.setUser, r)
            return r;
        })
        .catch(err => {
            console.warn(err);
            return Promise.reject(err.response.data.error.message);
        });
        // }).then(r=> vuexContext.commit(TYPES.mutations.setUser, r));
    }
};

const mutations = {
    [TYPES.mutations.setUser](state, userPayload) {
        state.user = { ...userPayload };
    }
};

export default new Vuex.Store({
    state,
    actions,
    mutations
})

/* let store = {
    state: {
        user: {
            kind: '',
            idToken: '',
            email: '',
            refreshToken: '',
            expiresIn: '',
            localId: ''
        }
    },
        signInAction(credentialsPayload) {
            return this.authAction({
                ...credentialsPayload,
                isSignUp: false
            });
        },
        signUpAction(credentialsPayload) {
            return this.authAction({
                ...credentialsPayload,
                isSignUp: true
            });
        },
        authAction(authPayload) {
            return DataService.Auth(authPayload).then(r=> this.setUserMutation(r));
        },
        setUserMutation(userPayload) {
            this.state.user = Object.assign({}, userPayload);
        }
};

export default store;
*/
