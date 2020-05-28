<template>
    <div class="page">
        <div ref="wangEditor" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
        name: 'wangEditor',
        props: [
            'content',
        ],
        created() {

        },
        mounted() {
            var editor = new E(this.$refs.wangEditor);
            editor.customConfig.onchange = (html) => {
                this.$emit('update:content', html);
            };
            editor.customConfig.showLinkImg = false
            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ]
            editor.customConfig.uploadImgShowBase64 = true
            editor.create();
            editor.txt.html(this.content);
        },
        methods: {
            getContent(){
                alert(this.content)
            }
        },
    }
</script>
<style lang="scss">
    .page-box {
        margin-top: 10px;
        text-align: center;
    }
</style>
