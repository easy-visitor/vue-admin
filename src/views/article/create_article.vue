<template>
    <div class="setting">
        <h2>发布文章</h2>
        <div class="visitor-form" v-loading="loading">
            <el-form ref="filed" :rules="filedRules" :model="filed" label-width="120px">
                <el-form-item label="选择分类" prop="name">
                    <el-select v-model="filed.type_id" placeholder="请选择">
                        <el-option
                                v-for="item in typeGroup"
                                :key="item.id"
                                :label="item.html+item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="filed.title" placeholder="请输入文章标题"></el-input>
                </el-form-item>
                <el-form-item label="文章关键字" prop="keyword" >
                    <el-input v-model="filed.keyword" placeholder="请输入文章关键字"></el-input>
                </el-form-item>
                <el-form-item label="是否收费" prop="price" >
                    <el-input type="number" v-model="filed.price" placeholder="请输入是否收费 0表示不收费"></el-input>
                </el-form-item>
                <el-form-item label="文章描述" prop="keyword" >
                    <el-input type="textarea" v-model="filed.description" placeholder="请输入文章描述"></el-input>
                </el-form-item>

                <el-form-item label="文章封面" prop="cover">
                    <visitorUploadCover :coverUrl.sync="filed.cover"
                                        :uploadId.sync="filed.upload_id"></visitorUploadCover>
                </el-form-item>
                <el-form-item label="下载地址" prop="type">
                    <el-input v-model="filed.download_url" placeholder="请输入下载地址"></el-input>
                </el-form-item>
                <el-form-item label="解压密码" prop="password">
                    <el-input v-model="filed.password" placeholder="请输入解压密码"></el-input>
                </el-form-item>
                <el-form-item label="回复关键字" prop="reply_keyword">
                    <el-input v-model="filed.reply_keyword" placeholder="请输入回复关键字"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <wangEditor  :content.sync="filed.content"></wangEditor>
                </el-form-item>
                <el-form-item class="text-center">
                    <el-button type="primary" @click="onFiledSubmit('filed')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import visitorUploadCover from '@/components/common/visitorUploadCover.vue'
    import wangEditor from '@/components/common/wangEditor.vue'

    export default {
        name: 'ArticleType',
        components: {visitorUploadCover,wangEditor},
        data() {
            return {
                loading: false,
                filed: {
                    type_id:"",
                    title:"",
                    keyword:"",
                    price:"",
                    cover:"",
                    description:"",
                    download_url:"",
                    password:"",
                    reply_keyword:"",
                    content:"",
                },
                typeGroup: [],
                filedRules: {}

            }
        },
        created(){
            this.getType()
        },
        methods: {
            getType() {
                this.http.request('post', '/article/type', this.searchData, (res => {
                    if (res.code == 1) {
                        this.typeGroup = res.data.list;
                    }
                }));
            },
            onFiledSubmit(filed) {
                var _this = this;
                this.$refs[filed].validate((valid) => {
                    _this.http.request('post','/')
                })
            }
        }
    }
</script>

<style lang="scss">

</style>
