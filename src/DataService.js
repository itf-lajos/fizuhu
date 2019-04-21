/* import Axios from 'axios';

export const BACKEND_URL = 'http://localhost:3000';
export const FIREBASE_URL = 'https://fizuhu-itf.firebaseio.com';

const apiKey = "AIzaSyCnTk4xguRoE-Xg2TjWUNhDTIklM3fhENA";
const signUpUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
const signInUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
 */
import store from "./store";
export default {
/*     Auth({ email, password, isSignUp }) {
        return Axios.post(isSignUp ? signUpUrl : signInUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .then(r => r.data)
        .then(r => {
            // adatmegosztás - a window folyamatosan jelen van a weblapon
            // window.user = Object.assign({}, r);
            console.log('loginapi:', r);
            return r;
        })
        .catch(err => {
            console.warn(err);
            // A lekezelt hibaüzenet továbbadása a registration-ba
            return Promise.reject(err.response.data.error.message);
        });
    },
 *//*     SignIn({ email, password }) {
        return Axios.post(signInUrl, {
            "email": email,
            "password": password,
            "returnSecureToken": true
        })
        .then(r => r.data)
        .then(r => {
            // adatmegosztás - a window folyamatosan jelen van a weblapon
            // window.user = Object.assign({}, r);
            console.log('loginapi:', r);
            return r;
        })
        .catch(console.warn);
    },
    SignUp({ email, password }) {
        return Axios.post(signUpUrl, {
            "email": email,
            "password": password,
            "returnSecureToken": true
        })
        .then(r => r.data)
        .then(r => {
            // adatmegosztás - a window folyamatosan jelen van a weblapon
            // window.user = Object.assign({}, r);
            console.log('signup:', r);
            return r;
        })
        .catch(err => {
            console.warn(err);
            // A lekezelt hibaüzenet továbbadása a registration-ba
            return Promise.reject(err.response.data.error.message);
        });
    },
 */   
    // post
/*     GetPosts() {
        // return Axios.get(BACKEND_URL + '/blogposts').then(result => {
        return Axios.get(FIREBASE_URL + '/blogposts.json').then(result => {
            return result.data;
        });
    },
 */
/*     GetPost(postID) {
        // return Axios.get(BACKEND_URL + '/blogposts/' + postID).then(result => {
        // return Axios.get(FIREBASE_URL + '/blogposts/' + postID + '.json').then(result => {
        return Axios.get('${FIREBASE_URL}/blogposts/${postID}.json').then(result => {
            return result.data;
        });
    }, */

    // contact message

/*     PostContactMessage(data) {
        return Axios.post(FIREBASE_URL + '/contactMessages.json', data)
            .then(() => {
                return true;
            })
            .catch(error => {
                console.warn(error);
                return false;
            });
    },
 */
    // survey
    
    GetSurveyData() {
        return Axios.get(FIREBASE_URL + '/surveyResponses.json').then(result => {
            return result.data;
        });
    },

    PostSurveyResponse(data) {
        return Axios.post(FIREBASE_URL + '/surveyResponses.json', data)
            .then(() => {
                return true;
            })
            .catch(error => {
                console.warn(error);
                return false;
            });
    }
};
