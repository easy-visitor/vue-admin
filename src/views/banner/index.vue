<template>
    <div>
        <el-row class="mt-10 bg-white tip">
            <span><i class="el-icon-location"></i>广告管理</span>
            <el-button @click="createArticle()" type="success" class="fr fr-r-10">添加广告</el-button>
        </el-row>
        <div class="visitor-table bg-white">
            <el-row>
                <el-form class="search-toolbar" ref="searchData" :model="searchData">
                    <el-input style="width:180px" maxlength="20" v-model="searchData.title"
                              placeholder="请输入标题"></el-input>
                    <div style="display: inline-block">
                        <el-button type="primary">搜索</el-button>
                        <el-button>重置</el-button>
                    </div>
                </el-form>
            </el-row>
            <visitorTable :data.sync="list" v-loading="loading">
                <template #content>
                    <el-table-column prop="cover" label="封面">
                        <template slot-scope="scope">
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="scope.row.cover"
                                    :preview-src-list="[scope.row.cover]">
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
                        <template slot-scope="scope">
                            {{scope.row.html}} {{scope.row.title}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="keyword" label="关键字"></el-table-column>
                    <el-table-column prop="is_forever" label="是否永久">
                        <template slot-scope="scope">
                            <el-tag
                                    v-if="scope.row.is_forever == 1"
                                    type=" success"
                                    disable-transitions>是
                            </el-tag>
                            <el-tag
                                    v-else
                                    type="primary"
                                    disable-transitions>
                                否
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_forever" label="位置">
                        <template slot-scope="scope">
                            <el-tag
                                    v-if="scope.row.position == 1"
                                    type=" success"
                                    disable-transitions>首页
                            </el-tag>
                            <el-tag
                                    v-else
                                    type="primary"
                                    disable-transitions>
                                其他
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </template>
            </visitorTable>
        </div>
        <visitorDialog :title.sync="title" :dialogVisible.sync="dialogVisible">
            <template #content>
                <el-form ref="filed" class="visitor-form" :rules="filedRules" :model="filed" label-width="120px">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="filed.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="分类封面" prop="cover">
                        <visitorUploadCover :coverUrl.sync="filed.cover"
                                            :uploadId.sync="filed.upload_id">
                        </visitorUploadCover>
                    </el-form-item>
                    <el-form-item label="关键字" prop="keyword">
                        <el-input type="textarea" v-model="filed.keyword" placeholder="请输入关键字"></el-input>
                    </el-form-item>
                    <el-form-item label="连接地址" prop="link">
                        <el-input v-model="filed.link" placeholder="请输入连接地址"></el-input>
                    </el-form-item>
                    <el-form-item label="是否永久" prop="is_hot">
                        <el-radio-group v-model="filed.is_forever">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="位置" prop="position">
                        <el-radio-group v-model="filed.position">
                            <el-radio :label="1">首页</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="开始时间" prop="start_time" v-if="filed.is_forever==0">
                        <el-date-picker
                                v-model="filed.start_time"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择开始时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="结束时间" prop="end_time" v-if="filed.is_forever==0">
                        <el-date-picker
                                v-model="filed.end_time"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择结束时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-row class="text-center">
                        <el-button type="primary" @click="createType('filed')">保存</el-button>
                    </el-row>
                </el-form>
            </template>
        </visitorDialog>
    </div>
</template>

<script>
    import visitorDialog from '@/components/common/visitorDialog.vue'
    import visitorTable from '@/components/common/visitorTable.vue'
    import visitorUploadCover from '@/components/common/visitorUploadCover.vue'

    export default {
        name: 'ArticleType',
        components: {visitorUploadCover, visitorDialog, visitorTable},
        data() {
            return {
                loading: false,
                title: "标题",
                dialogVisible: false,
                searchData: {},
                filedRules: {},
                filed: {
                    title: "",
                    cover: "",
                    keyword: "",
                    is_forever: 1,
                    position: 1,
                },
                list: [],
            }
        },
        watch: {},
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.loading = true;
                this.http.request('post', '/banner/index', this.searchData, (res => {
                    this.loading = false;
                    if (res.code == 1) {
                        this.list = res.data.list;
                    }
                }));
            },
            createArticle() {
                this.dialogVisible = true;
            },
            createType(filed) {
                var _this = this;
                this.$refs[filed].validate((valid) => {
                    if (valid) {
                        _this.http.request('post', '/banner/bannerHandle', _this.filed, (res => {
                            if (res.code == 1) {
                                _this.dialogVisible = false;
                                _this.$toast.success(res.msg);
                                _this.getData();
                            } else {
                                _this.$toast.error(res.msg);
                            }
                        }))
                    }

                })
            },
            handleEdit(row) {
                this.filed = row;
            },
            handleDelete(row) {
                this.$toast.confirm('删除该广告', function () {

                });
            },
        }
    }
</script>

<style scoped>

</style>
