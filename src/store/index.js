import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authState: 'authenticating',
        user: null,
        token: null,
    },
    mutations: {
        login(state, { username, token }) {
            state.authState = 'authenticated';
            state.user = username;
            state.token = token;
        },
        logout(state) {
            state.authState = 'not-authenticated';
            state.user = null;
            state.token = null;
        },
    },
    getters: {},
    actions: {},
    modules: {},
});
