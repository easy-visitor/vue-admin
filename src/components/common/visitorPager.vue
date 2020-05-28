<template>
    <div class="page">
        <el-pagination v-show="pager.total"
                       layout="total, prev, pager, next, jumper"
                       :page-size="pager.pageSize"
                       :current-page="pager.page"
                       background
                       @current-change="pagerChange"
                       :total="pager.total">

        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'visitorPager',
        props: [
            'pager',
            'searchData',
            'getData',
        ],
        watch: {
            pager(val) {
                this.pager.page = parseInt(val.page);
                this.pager.pageSize = parseInt(val.pageSize);
                this.pager.total = parseInt(val.total);
            }
        },
        methods: {
            pagerChange: function (val) {
                this.searchData.page = val;
                this.getData();
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
