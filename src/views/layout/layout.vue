<template>
    <div id="loyout">
        <el-container>
            <layoutLeft></layoutLeft>
            <el-container>
                <layoutHeader></layoutHeader>
                <el-main id="layout">
                    <transition name="main" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </el-main>
                <el-footer>
                    footer
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import layoutLeft from './header/left'
    import layoutHeader from './header/header'
    export default {
        name: 'layout',
        components: {
            layoutHeader,layoutLeft
        },
        created () {

        }
    }
</script>

<style>

    .main-enter, .main-leave-to {
        opacity: 0;
        transform: translateY(30px);

    }
    .main-enter-active {
        transition: all 0.2s;
    }
    .main-leave-active {
        position: absolute;
        transition: all 0.3s;
    }
</style>
<style lang="scss">
    * {
        margin: 0px;
        padding: 0px;
    }

    body {
        background: #f2f2f2;
        font-size: 16px;
        color: #333333;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    %w100 {
        width: 100%;
    }

    %h100 {
        height: 100%;
    }

    %cursor {
        cursor: pointer;
    }

    html, body, #loyout, .el-container, #asideNav, ul.el-menu {
        @extend %h100;
    }

    @mixin set-value($side, $value) {
        @each $prop in $leftright {
            #{$side}-#{$prop}: $value;
        }
    }

    #elmain {
        background-color: #f0f2f5;
    }

</style>
