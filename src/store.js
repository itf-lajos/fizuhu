import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import DataService from "./DataService";

const state = {
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
    signInAction(vuexContext, credentialsPayload) {
        return vuexContext.dispatch("authAction", {
            ...credentialsPayload,
            isSignUp: false
        });
    },
    signUpAction(vuexContext, credentialsPayload) {
        return vuexContext.dispatch("authAction", {
            ...credentialsPayload,
            isSignUp: true
        });
    },
    authAction(vuexContext, authPayload) {
        return DataService.Auth(authPayload).then(r=> vuexContext.commit("setUserMutation", r));
    }
};

const mutations = {
    setUserMutation(state, userPayload) {
        state.user = Object.assign({}, userPayload);
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
