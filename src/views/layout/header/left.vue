<template>
    <div>
        <el-aside id="asideNav">
            <div class="logo-name" :class="$store.getters.isCollapse?'logo':''">
                <p>EASY VISITOR后台管理系统</p>
            </div>
            <el-menu
                    class="el-menu-vertical"
                    @select="selectMenu"
                    :defaultActive="defaultActive"
                    background-color="#03152A"
                    :collapse="$store.getters.isCollapse"
                    text-color="rgba(255,255,255,.7)"
                    active-text-color="#ffffff"
                    :collapse-transition="true"
            >
                <template v-for="(item,index) in routers">
                    <el-submenu v-if="item.children.length > 0" :index="'index_'+index" :key="index">
                        <template slot="title">
                            <i :class="item.iconCls?item.iconCls:[fa,fa-server]"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <menu-tree :menuData="item.children"></menu-tree>
                    </el-submenu>
                    <el-menu-item  :index="item.path" :key="index" v-else>
                        <i :class="item.iconCls?item.iconCls:[fa,fa-file]"></i>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
    import menuTree from './menuTree'

    export default {
        name: 'left',
        components: {
            menuTree
        },
        data() {
            return {
                defaultActive: '/',
                isCollapse: false,
                routers: [
                    {
                        path: '/index',
                        iconCls: 'el-icon-s-home', // 图标样式class
                        name: "首页",
                        component: "",
                        children: []
                    },
                    {
                        path: '/system',
                        iconCls: 'el-icon-s-grid', // 图标样式class
                        name: "系统管理",
                        component: "",
                        children: [
                            {
                                path: '/setting',
                                iconCls: 'el-icon-setting', // 图标样式class
                                name: "系统设置",
                                component: "",
                                children: []
                            },
                            {
                                path: '/auth',
                                iconCls: 'el-icon-edit-outline', // 图标样式class
                                name: "权限管理",
                                component: "",
                                children: []
                            },
                            {
                                path: '/admin',
                                iconCls: 'el-icon-s-custom', // 图标样式class
                                name: "用户管理",
                                component: "",
                                children: []
                            },
                            {
                                path: '/banner',
                                iconCls: 'el-icon-s-custom', // 图标样式class
                                name: "广告管理",
                                component: "",
                                children: []
                            }
                        ]
                    },
                    {
                        path: '/',
                        iconCls: 'el-icon-tickets', // 图标样式class
                        name: "文章管理",
                        component: "",
                        children: [
                            {
                                path: '/article',
                                iconCls: 'el-icon-edit-outline', // 图标样式class
                                name: "文章列表",
                                component: "",
                                children: []
                            },
                            {
                                path: '/articleType',
                                iconCls: 'el-icon-edit-outline', // 图标样式class
                                name: "文章分类",
                                component: "",
                                children: []
                            }
                        ]
                    },
                ]
            }
        },
        watch: {},
        created() {
            this.defaultActive = this.$route.path
        },
        methods: {
            menuClick(item){
                console.log(item)
            },
            selectMenu(key) {
                if (this.defaultActive != key) {
                    var title = '';
                    this.$router.push({path: key});
                    this.defaultActive = key;
                    /*this.$store.dispatch('addTab', {
                        title: title,
                        path: key
                    })*/
                }
            }
        }
    }
</script>

<style lang="scss">
    $top: top;
    $bottom: bottom;
    $left: left;
    $right: right;
    %w100 {
        width: 100%;
    }

    %h100 {
        height: 100%;
    }

    %cursor {
        cursor: pointer;
    }


    #asideNav {
        width: auto !important;
        display: flex;
        flex-direction: column;
        border-right: solid 1px #e6e6e6;

        .logo {
            width: 64px;
            overflow: hidden;
            transform: translate3d(0px, 0px, 0px) rotate(0);
            transition: transform 0.5s linear 0s;
        }

        .logo-name {
            background-color: #03152A !important;
            @extend %w100;
            font-weight: 300;
            z-index: 999;

            p {
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 16px;
                color: #5e6d82;
            }
        }

        .el-menu-vertical:not(.el-menu--collapse) {
            width: 200px;
            @extend %h100;
            overflow-y: scroll;
            overflow-x: hidden;
        }

        .el-menu {
            flex: 1;
            overflow: inherit;
            border-right: none;

            &::-webkit-scrollbar {
                display: none;
            }

            .fa {
                vertical-align: middle;
                margin-right: 5px;
                width: 24px;
                text-align: center;
                font-size: 18px;
            }

            .el-menu-item {
                background-color: #020f1d !important;
                border-bottom: 1px solid #020f1d;

                &:hover {
                    color: #ffffff !important;
                    background-color: #375573 !important;
                }
            }

            .el-menu-item.is-active {
                background-color: #56a9ff !important
            }

            .is-opened > .el-submenu__title > .el-icon-arrow-down {
                color: #ffffff;
                font-weight: 500;
                font-size: 18px;
            }
        }

    }
</style>
