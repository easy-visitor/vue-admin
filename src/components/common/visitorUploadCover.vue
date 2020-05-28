<template>
    <div class="upload-cover">
        <i v-if="coverUrl"
           @click="deleteCover" class="el-icon-delete cover-delete"></i>
        <el-upload class="avatar-uploader"
                   v-loading="fullscreenLoading"
                   element-loading-text="上传中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)"
                   :action="actionUrl"
                   :show-file-list="false"
                   :headers="headers"
                   :before-upload="beforeUpload"
                   :on-success="handleSuccess">
            <img v-if="coverUrl" :src="coverUrl" class="avatar">
            <i v-if="!coverUrl" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>
<script>
    export default {
        name: 'visitorUploadCover',
        props: {
            'uploadUrl': {
                type: String,
                default: ''
            },
            'size': {
                type: Number,
                default: 5//单位M
            },
            "fileType": {
                type: Array,
                default: function () {
                    return ["image/bmp", "image/jpg", "image/jpeg", "image/png", "image/gif"]
                }
            },
            'uploadId': String,
            'coverUrl': {
                type: String,
                required: true,
                default: 'http://www.zht168.local/storage/cover/62\\e677ff5fc4674ca26b6a2ffd1152ae.png'
            },
            'callback': Function
        },
        created() {
            this.actionUrl = this.http.axios.defaults.baseURL + '/upload/index';
            if (this.uploadUrl !== '') {
                this.actionUrl = this.http.axios.defaults.baseURL + this.uploadUrl;
            }
            console.log(this.actionUrl);
        },
        data() {
            return {
                actionUrl: "",
                headers: {
                    token: this.$store.state.token
                },
                fullscreenLoading: false,
            }
        },
        methods: {
            handleSuccess(res) {
                this.fullscreenLoading =  false;
                if (res.code == 1) {
                    // this.coverUrl = res.data.url;
                    // this.uploadId = res.data.upload_id;
                    this.$emit('update:coverUrl', res.data.url);
                    this.$emit('update:uploadId', res.data.upload_id);
                    this.callback && this.callback(res);
                } else {
                    this.$toast.error(res.msg);
                }
            },
            beforeUpload(file) {
                var isType = this.fileType.indexOf(file.type);
                if (isType === -1) {
                    this.$toast.error('封面格式错误,仅支持【' + this.fileType.toString() + '】');
                    return false;
                }
                let size = file.size / 1024 / 1024 < this.size;

                if (!size) {
                    this.$toast.error('封面大小不能超过 ' + this.size + 'MB!');
                    return false;
                }
                this.fullscreenLoading = true;
                return true;
            },
            deleteCover: function () {
                // this.coverUrl = '';
                // this.uploadId = '';
                this.$emit('update:coverUrl', '');
                this.$emit('update:uploadId', '');
            }
        },
    }
</script>
<style lang="scss">
    .upload-cover {
        width: 178px;
        height: 178px;
        position: relative;
        .cover-delete{
            position:absolute;
            top: 6px;
            z-index: 5;
            cursor: pointer;
            right: 5px;
        }
        .avatar-uploader {
            .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }

            .el-upload:hover {
                border-color: #409EFF;
            }
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }

</style>
