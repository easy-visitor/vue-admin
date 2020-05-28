import Vue from 'vue'
import Vuex from 'vuex'

import routerData from './routerData'
import Cookies from 'js-cookie'

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        token: Cookies.get('token', ''),
        isCollapse: false,
        tabnavBox: [
            {
                title: '首页',
                path: '/index'
            }
        ]
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            Cookies.set('token', token, {expires: 1 / 24});
        },
        collapse(state, arg) {
            state.isCollapse = !state.isCollapse;
            if (state.logoShow) {
                setTimeout(function () {
                    state.logoShow = false
                }, 300)
            } else {
                state.logoShow = true
            }
        },
        addTab(state, arg) {
            state.isActive = arg.path;
            for (let i = 0; i < state.tabnavBox.length; i++) {
                if (state.tabnavBox[i].path === arg.path) {
                    return false
                }
            }
            state.tabnavBox.push({
                title: arg.title,
                path: arg.path
            })
        },
        removeTab (state, arg) {
            let index = state.tabnavBox.findIndex(function (value, key) {
                return value.path === arg.tabItem.path
            })
            state.tabnavBox.splice(index, 1)
            if (arg.tabItem.path === arg.fullPath) {
                let tabActive = state.tabnavBox[index] || state.tabnavBox[index - 1]
                arg.router.push(tabActive.path)
            }
        },
        removeOtherTab (state, arg) {
            state.tabnavBox = [{
                title: '首页',
                path: '/index'
            }]
            if (arg.all) {
                arg.router.push('/index')
                return false
            }
            state.tabnavBox.push(arg.tabItem)
            arg.router.push(arg.tabItem.path)
        },
    },
    actions: {
        setToken({commit}, token) {
            return new Promise((resolve, reject) => {
                commit('setToken', token);
                resolve()
            })
        },
        collapse({commit}, arg) {
            commit('collapse', arg)
        },
        addTab({commit}, arg) {
            commit('addTab', arg)
        },
        removeTab ({commit}, arg) {
            commit('removeTab', arg)
        },
        removeOtherTab ({commit}, arg) {
            commit('removeOtherTab', arg)
        },
    },
    modules: {},
    getters: {
        routers: state => state.routerData.routers,
        token: state => state.token,
        isCollapse: state => state.isCollapse,
        tabnavBox: state => state.tabnavBox,
    },
})
