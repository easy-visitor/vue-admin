import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/layout.vue'
import Index from '@/views/index/index.vue'
import Error from '@/views/error.vue'

//文章管理
import ArticleManage from '@/views/article/index.vue'
import createArticle from '@/views/article/create_article.vue'
import ArticleType from '@/views/article/type.vue'


//系统管理
import SystemManage from '@/views/system/setting.vue'
import Auth from '@/views/system/auth.vue'
import Admin from '@/views/system/admin.vue'
import Banner from '@/views/banner/index.vue'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: '/index',
        component: Layout,
        children: [
            {
                path: '/index',
                name: '主页',
                meta:{
                    // 页面标题title
                    title: '主页'
                },
                component: Index,
                children: []
            }
        ]
    },
    {
        path: '/article',
        name: 'articleManage',
        component: Layout,
        children: [
            {
                path: '/article',
                name: '文章管理',
                component: ArticleManage,
                children: [],
                meta:{
                    // 页面标题title
                    title: '文章管理'
                },
            },
            {
                path: '/createArticle',
                name: '发布文章',
                component: createArticle,
                children: [],
                meta:{
                    // 页面标题title
                    title: '发布文章'
                },
            },
            {
                path: '/articleType',
                name: '文章分类',
                component: ArticleType,
                meta:{
                    // 页面标题title
                    title: '文章分类'
                },
                children: []
            }
        ]
    },
    {
        path: '/system',
        name: 'setting',
        component: Layout,
        children: [
            {
                path: '/setting',
                name: '系统设置',
                meta:{
                    // 页面标题title
                    title: '系统设置'
                },
                component: SystemManage,
                children: []
            },
            {
                path: '/auth',
                name: '权限管理',
                component: Auth,
                meta:{
                    // 页面标题title
                    title: '权限管理'
                },

                children: []
            },
            {
                path: '/admin',
                name: '管理员',
                meta:{
                    // 页面标题title
                    title: '管理员'
                },
                component: Admin,
                children: []
            },
            {
                path: '/banner',
                name: '广告管理',
                meta:{
                    // 页面标题title
                    title: '广告管理'
                },
                component: Banner,
                children: []
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta:{
            // 页面标题title
            title: '登录'
        },
        component: Login
    },
    {
        path: '/404',
        name: '404',
        meta:{
            // 页面标题title
            title: '错误'
        },
        component: Error
    },
];

const router = new VueRouter({
    mode: "history",
    routes: routes
});

export default router
