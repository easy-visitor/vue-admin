<template>
    <div>
        <el-row class="mt-10 bg-white tip">
            <span><i class="el-icon-location"></i>分类管理</span>
            <el-button @click="createArticle()" type="success" class="fr fr-r-10">添加分类</el-button>
        </el-row>
        <div class="visitor-table bg-white">
            <el-row>
                <el-form class="search-toolbar" ref="searchData" :model="searchData">
                    <el-input style="width:180px" maxlength="20" v-model="searchData.order_no"
                              placeholder="请输入订单号"></el-input>
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
                    <el-table-column prop="alias" label="别名"></el-table-column>
                    <el-table-column prop="keyword" label="关键字"></el-table-column>
                    <el-table-column prop="is_hot" label="是否热门">
                        <template slot-scope="scope">
                            <el-tag
                                    v-if="scope.row.is_hot == 1"
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
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑
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
                    <el-form-item label="选择上级" prop="parent_id">
                        <el-select v-model="filed.parent_id" placeholder="请选择">
                            <el-option
                                    key="0"
                                    label="顶级分类"
                                    value="0">
                            </el-option>
                            <el-option
                                    v-for="item in list"
                                    :key="item.id"
                                    :label="item.html+item.title"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分类标题" prop="title">
                        <el-input v-model="filed.title" placeholder="请输入分类标题"></el-input>
                    </el-form-item>
                    <el-form-item label="分类别名" prop="alias">
                        <el-input v-model="filed.alias" placeholder="请输入分类别名"></el-input>
                    </el-form-item>

                    <el-form-item label="分类关键字" prop="keyword">
                        <el-input type="textarea" v-model="filed.keyword" placeholder="请输入分类关键字"></el-input>
                    </el-form-item>

                    <el-form-item label="是否热门" prop="is_hot">
                        <el-radio-group v-model="filed.is_hot">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="分类封面" prop="cover">
                        <visitorUploadCover :coverUrl.sync="filed.cover"
                                            :uploadId.sync="filed.upload_id"></visitorUploadCover>
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
                typeGroup: true,
                searchData: {},
                filedRules: {},
                filed: {
                    parent_id: "0",
                    title: "",
                    alias: "",
                    cover: "",
                    keyword: "",
                    is_hot: 0,
                },
                list: [],
                tableData5: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        tag: '家'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄',
                        tag: '公司'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        tag: '家'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄',
                        tag: '公司'
                    }]
            }
        },
        watch:{
            'filed.parent_id':function () {
                if (this.filed.parent_id !=0){
                    // this.filed.parent_id = this.filed.parent_id
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.loading = true;
                this.http.request('post', '/article/type', this.searchData, (res => {
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
                        _this.http.request('post', '/article/typeHandle', _this.filed, (res => {
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
            handleEdit(index, row) {
                console.log(index, row);
                this.$message({
                    showClose: true,
                    message: index, row,
                    type: 'success'
                })
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$message({
                    showClose: true,
                    message: index, row,
                    type: 'success'
                })
            },
        }
    }
</script>

<style scoped>

</style>
