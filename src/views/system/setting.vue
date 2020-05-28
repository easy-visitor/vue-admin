<template>
    <div class="setting">
        <h2>系统设置</h2>
        <div class="visitor-form" v-loading="loading">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

                <el-tab-pane :label="group.name" :name="'name_'+group.id" :key="index"
                             v-for="(group,index) in config_group">
                    <el-form ref="form" label-width="120px">
                        <el-form-item :label="config.title" :key="index" v-for="(config,index) in group.config">
                            <el-input v-model="config.value" :placeholder="'请输入'+config.title"></el-input>
                        </el-form-item>
                        <el-form-item class="text-center">
                            <el-button type="primary" @click="onGroupConfig()">设置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="添加分组" name="createGroup">
                    <el-form ref="group" :rules="groupRules" :model="group" label-width="80px">
                        <el-form-item label="分组名称" prop="name">
                            <el-input v-model="group.name" placeholder="请输入分组名称"></el-input>
                        </el-form-item>
                        <el-form-item label="分组描述" prop="tip">
                            <el-input type="textarea" v-model="group.tip" placeholder="请输入分组描述"></el-input>
                        </el-form-item>
                        <el-form-item class="text-center">
                            <el-button type="primary" @click="onGroupSubmit('group')">创建分组</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="添加字段" name="createFiled">
                    <el-form ref="filed" :rules="filedRules" :model="filed" label-width="80px">
                        <el-form-item label="分组" prop="name">
                            <el-select v-model="filed.group_id" placeholder="请选择">
                                <el-option
                                        v-for="item in config_group"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="变量名" prop="name" required>
                            <el-input v-model="filed.name" placeholder="请输入变量名"></el-input>
                        </el-form-item>
                        <el-form-item label="变量标题" prop="title" required>
                            <el-input v-model="filed.title" placeholder="请输入变量标题"></el-input>
                        </el-form-item>
                        <el-form-item label="变量描述" prop="tip">
                            <el-input v-model="filed.tip" placeholder="请输入变量描述"></el-input>
                        </el-form-item>
                        <el-form-item label="变量类型" prop="type">
                            <el-input v-model="filed.type" placeholder="请输入变量描述"></el-input>
                        </el-form-item>
                        <el-form-item label="变量值" prop="value">
                            <el-input v-model="filed.value" placeholder="请输入变量值"></el-input>
                        </el-form-item>
                        <el-form-item label="变量内容" prop="content">
                            <el-input v-model="filed.content" placeholder="请输入变量内容"></el-input>
                        </el-form-item>
                        <el-form-item label="验证规则" prop="rule">
                            <el-input v-model="filed.rule" placeholder="请输入验证规则"></el-input>
                        </el-form-item>
                        <el-form-item label="扩展属性" prop="extend">
                            <el-input v-model="filed.extend" placeholder="请输入扩展属性"></el-input>
                        </el-form-item>
                        <el-form-item class="text-center">
                            <el-button type="primary" @click="onFiledSubmit('filed')">创建分组</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'setting',
        data() {
            return {
                activeName: 'first',
                form: {},
                group: {
                    name: "",
                    tip: "",
                },
                groupLoading: false,
                loading: false,
                groupRules: {
                    name: [
                        {required: true, message: '请输入分组名称', trigger: 'blur'},
                    ],
                    tip: [
                        {required: true, message: '请输入分组描述', trigger: 'blur'},
                    ]
                },
                filed: {},
                filedRules: {},
                config_group: []
            }
        },
        created() {
            this.getConfig();
        },
        methods: {
            getConfig() {
                var _this = this;
                _this.loading = true;
                this.http.request('get', '/config/index', {}, function (res) {
                    _this.loading = false;
                    if (res.code == 1) {
                        _this.config_group = res.data.config_group;
                        _this.activeName = ("name_" + _this.config_group[0]['id']) || 'createGroup';
                    } else {
                        _this.$toast.error(res.msg)
                    }
                })
            },
            handleClick() {

            },
            onGroupConfig() {
                var _this = this;
                _this.http.request('post', '/config/setConfig', {config_group: _this.config_group}, function (res) {
                    if (res.code == 1) {
                        _this.$toast.success(res.msg);
                        _this.getConfig();
                    } else {
                        _this.$toast.error(res.msg);
                    }
                })
            },
            onFiledSubmit(filed) {
                var _this = this;
                this.$refs[filed].validate((valid) => {
                    if (valid) {
                        this.groupLoading = true;
                        _this.http.request('post', '/config/createFiled', _this.filed, function (res) {
                            if (res.code == 1) {
                                _this.$toast.success(res.msg);
                                _this.getConfig();
                            } else {
                                _this.$toast.error(res.msg);
                            }
                        })

                    }
                });
            },
            onGroupSubmit(group) {
                var _this = this;
                this.$refs[group].validate((valid) => {
                    if (valid) {
                        this.groupLoading = true;
                        _this.http.request('post', '/config/createGroup', _this.group, function (res) {
                            if (res.code == 1) {
                                _this.$toast.success(res.msg);
                                _this.getConfig();
                            } else {
                                _this.$toast.error(res.msg);
                            }
                        })

                    }
                });
            }
        }
    }
</script>
<style>
    body {
        background-color: #edf2f6 !important;
    }
</style>
<style lang="scss">

</style>
