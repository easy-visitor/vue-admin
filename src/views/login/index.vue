<template>
    <div class="content">
        <h2>后台登录</h2>
        <el-form :model="field" ref="field" :rules="rules" class="login" label-width="100">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="field.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="field.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button type="primary" class="login-but" size="medium" :loading="loading"
                       @click="onSubmit('field')">立即登录
            </el-button>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data() {
            return {
                field: {
                    username: "admin",
                    password: "123456",
                },
                loading: false,
                rules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            onSubmit(ruleForm) {
                var _this = this;
                this.$refs[ruleForm].validate(function (valid) {
                    if (valid) {
                        _this.http.request('post', '/login/index', _this.field, function (res) {
                            _this.loading = true;
                            if (res.code == 1) {
                                _this.$message({
                                    message: res.msg,
                                    type: 'success'
                                });
                                let token = res.data.token;
                                _this.$store.dispatch('setToken', token).then((res) => {
                                    setTimeout(function () {
                                        _this.$router.push({path: '/'})
                                    }, 1500)
                                }).catch(res => {
                                    _this.loading = false;
                                    _this.$message({
                                        showClose: true,
                                        message: res,
                                        type: 'error'
                                    })
                                })
                            } else {
                                _this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                                _this.loading = false;
                            }
                        })

                    }
                });
            },
        },
        mounted() {
            var _this = this;
            document.onkeydown = function (e) { // 回车提交表单
                // 兼容FF和IE和Opera
                var theEvent = window.event || e;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                if (code == 13) {
                    _this.onSubmit('field');
                }
            }
        }
    }
</script>
<style>
    body {
        min-width: 980px;
        width: 100%;
        height: 100%;
        position: relative;
        background: url('../../assets/images/bg.jpg') no-repeat !important;
        background-size: cover;
    }
</style>
<style lang="scss">


    .content {
        margin: 0 auto;
        padding: 20px;
        width: 50%;
        max-width: 500px;
        margin-top: 180px;
        border-radius: 10px;
        background: #fff;

    }

    h2 {
        text-align: center;
        color: #333333;
    }

    .login {
        width: 100%;
        text-align: center;

        .el-form-item {
            width: 100%;
        }

        .el-input__inner {
            height: 50px;
            line-height: 50px;
        }

        .login-but {
            margin-top: 20px;
            height: 50px;
            font-size: 16px;
            width: 80%;
            text-align: center;
            margin-bottom: 40px;
        }
    }


</style>
