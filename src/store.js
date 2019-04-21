import Vue from "vue";
import Vuex from "vuex";

import Axios from 'axios';
const apiKey = "AIzaSyCnTk4xguRoE-Xg2TjWUNhDTIklM3fhENA";
const emptyUserObject = {
    kind: '',
    idToken: '',
    email: '',
    refreshToken: '',
    expiresIn: '',
    localId: '',
    expirationDate: ''
};

Vue.use(Vuex);

import DataService from "./DataService";

export const TYPES = {
    actions: {
        signIn: "signIn",
        signUp: "signUp",        
        auth: "auth",
        loadPosts: "loadPosts",
        postContactMessage: "postContactMessage",
        postSurveyResponse: "postSurveyResponse",
        getSurveyData: "getSurveyData"
    },
    mutations: {
        setUser: "setUser",
        deleteUser: "deleteUser",
        setPosts: "setPosts"
    },
    getters: {
        isLoggedIn: "isLoggedIn",
        getPost: "getPost"
    }
};

const state = {
    url: {
        signUp: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`,
        signIn: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`,
        firebase: 'https://fizuhu-itf.firebaseio.com',
        backend: 'http://localhost:3000'
    },
    user: { ...emptyUserObject, idToken: localStorage.getItem("idToken") },
    posts: JSON.parse(localStorage.getItem("posts")) || []
};

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
            commit(TYPES.mutations.deleteUser);
            return Promise.reject(err.response.data.error.message);
        });
        // }).then(r=> vuexContext.commit(TYPES.mutations.setUser, r));
    },
    [TYPES.actions.loadPosts]({ commit, state }) {
        return Axios.get(`${state.url.firebase}/blogposts.json?auth=${state.user.idToken}`)
        .then(r => r.data)    
        .then(r => {
                commit(TYPES.mutations.setPosts, r);
                return r;
            }
        );
    },
    [TYPES.actions.postContactMessage]({ state }, contactPayLoad) {
        return Axios.post(
            `${state.url.firebase}/contactMessages.json?auth=${state.user.idToken}`, contactPayLoad)
            .catch(error => {
                console.warn('store postContactMsg', error);
                return Promise.reject();
            }
        );
    },
    [TYPES.actions.postSurveyResponse]({ state }, surveyPayLoad) {
        return Axios.post(
            `${state.url.firebase}/surveyResponses.json?auth=${state.user.idToken}`, surveyPayLoad)
            .catch(error => {
                console.warn('store postSurvey error: ', error);
                return false;
            }
        );
    },
    [TYPES.actions.getSurveyData]() {
        return Axios.get(
            `${state.url.firebase}/surveyResponses.json?auth=${state.user.idToken}`)
            .then(result => {
            return result.data;
            })
            .catch(error => {
                console.warn('getPostSurvey error: ', error);
                return Promise.reject();
            }
        );
    }
};

const mutations = {
    [TYPES.mutations.setUser](state, userPayload) {
        state.user = { ...userPayload };
        localStorage.setItem("idToken", state.user.idToken);
    },
    [TYPES.mutations.deleteUser]() {
        state.user = { ...emptyUserObject };
        localStorage.removeItem("idToken");
    },
    [TYPES.mutations.setPosts](state, fbPost) {
        // Firebase-ből másképp jönnek az adatok, mint ahogy nekünk kellene
        state.posts = Object.values(fbPost);
        localStorage.setItem("posts", JSON.stringify(state.posts));
    }
};

const getters = {
    [TYPES.getters.isLoggedIn]: state => Boolean(state.user.idToken),
    [TYPES.getters.getPost]: state => postId => {
        return state.posts.find(p => p.id === postId);
    }
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
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
