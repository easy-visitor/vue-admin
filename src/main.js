import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './function/http'
import './plugins/element.js'
import toast from './function/toast'

Vue.prototype.http = http;
Vue.prototype.$toast = toast;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    // debugger
    if (store.state.token) {
        store.dispatch('setToken', store.state.token);
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            if (to.matched.length === 0) {
                next({path: '/404'});
                return false
            }
        }
        next()
    } else {
        if (to.path === '/login') {
            next()
        }
        next({path: '/login'})
    }

    /*  if (store.state.token) {
        store.dispatch('setToken', store.getters.token)
        if (to.path === '/login') {
          next({path: '/'})
        } else {
          if (!store.getters.info.role) {
            // const role = ['/markdown', '/erji', '/erji2', '/siji', '/wuji']
           !async function getAddRouters () {
              // 省略 axios 请求代码 通过 token 向后台请求用户权限等信息，这里用假数据赋值
              await store.dispatch('getInfo', {
                role: 'superAdmin',
                permissions: '超级管理员'
              })
              await store.dispatch('newRoutes', store.getters.info.role)
              console.log(store.getters.addRouters)
              await router.addRoutes(store.getters.addRouters)
              next({path: '/index'})
            }()
          } else {
            let is404 = to.matched.some(record => {
              if(record.meta.role){
                return record.meta.role.indexOf(store.getters.info.role) === -1
              }
            })
            if(is404){
              next({path: '/404'})
              return false
            }
            next()
          }
        }
      } else {
        if (to.path === '/login') {
          next()
        }
        next({path: '/login'})

      }*/
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
