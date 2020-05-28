<template>
    <div>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="beforeClose"
                :show-close="true"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
        >
            <slot name="content"></slot>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'visitorDialog',
        props: [
            'dialogVisible',
            'title',
        ],

        watch: {},
        methods: {
            beforeClose() {
                this.$emit('update:dialogVisible',false)
            }
        },
    }
</script>
<style lang="scss">
    .el-dialog{
        border-radius: 6px !important;
    }
    .el-dialog__body{

        .visitor-form{

            margin-top: 0;
            padding:  0 0;
        }
    }
</style>
