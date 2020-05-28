<template>
    <div>
        <el-header id="header">
            <span class="hideAside" @click="collapse"><i class="el-icon-menu"></i></span>
            <ul class="personal">

                <li class="msg" @click="msgClick">
                    <el-tooltip class="item" effect="dark" content="消息" placement="bottom">
                        <el-badge :value="user.msg" :max="9" class="item">
                            <i class="el-icon-chat-dot-round"></i>
                        </el-badge>
                    </el-tooltip>
                </li>
                <li class="fullScreen" @click="fullScreen">
                    <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
                        <i class="el-icon-full-screen"></i>全屏
                    </el-tooltip>
                </li>
                <li>
                    <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link">
                          {{user.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                <li class="icon"><img :src="user.avatar"/></li>
            </ul>
        </el-header>
        <!--<tabNav></tabNav>-->
    </div>
</template>

<script>
    // import tabNav from './tabNav'
    export default {
        name: 'Header',
        components: {},
        data() {
            return {
                user: {
                    avatar: "http://www.zht168.local/static/user.png",
                    msg: "11",
                    nickname: "visitor",
                },
                isFullScreen: false,
            }
        },
        methods: {
            collapse() {
                this.$store.dispatch('collapse')
            },
            msgClick() {

            },
            fullScreen() {
                if (this.isFullScreen) {
                    exitFullscreen();
                } else {
                    fullScreen();
                }
                this.isFullScreen = !this.isFullScreen;
            },
            handleCommand(command) {
                var _this = this;
                if (command == 'logout') {
                    this.$store.dispatch('setToken', '').then(res => {
                        this.$message({
                            message: "已退出登录",
                            type: 'success'
                        });
                        setTimeout(function () {
                            _this.$router.push({path: '/login'})
                        }, 1500)
                    }).catch(res => {

                    })
                }
            }
        }
    }

    //全屏
    function fullScreen() {
        var element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }

    //退出全屏
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

</script>

<style lang="scss">

    %w100 {
        width: 100%;
    }

    %h100 {
        height: 100%;
    }

    %cursor {
        cursor: pointer;
    }

    html, body, #app, .el-container, #asideNav, ul.el-menu {
        @extend %h100;
    }


    #header {
        max-height: 50px;
        line-height: 50px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        display: flex;
        justify-content: space-between;

        .hideAside {
        }

        .personal {
            display: flex;
            flex-direction: row;

            li {
                font-size: 12px;
            }

            .msg {
                margin-right: 30px;

                i {
                    font-size: 20px;
                }

                .el-badge__content {
                    top: 12px;
                }
            }

            .fullScreen {
                font-size: 20px;
                margin-right: 30px;
            }

            .icon img {
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                width: 40px;
                height: 40px;
            }
        }
    }
</style>
