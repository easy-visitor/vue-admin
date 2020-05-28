<template>
    <div class="page-list bg-white">
        <el-table
                :data="data"
                header-row-class-name="el-table-th-bg"
                header-cell-class-name="el-table-th is-center "
                cell-class-name="is-center"
                style="width: 100%"
        >
            <slot name="content"></slot>
        </el-table>
    </div>
</template>

<script>

    export default {
        name: 'visitorTable',
        props: [
            'data'
        ],
        created() {

        },
        mounted() {

        },
        methods: {},
    }
</script>
<style lang="scss">
    .page-list {
        margin-top: 10px;
        text-align: center;
        min-height: 500px;

    }
</style>
