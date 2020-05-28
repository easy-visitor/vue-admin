<template>
    <div>
        <el-row class="mt-10 bg-white tip">
            <span><i class="el-icon-location"></i>订单管理</span>
            <el-button @click="createArticle()" type="success" class="fr fr-r-10">发布文章</el-button>
        </el-row>

        <el-row class="mt-10 bg-white">

            <el-form class="search-toolbar" ref="searchData" :model="searchData">
                <el-input style="width:180px" maxlength="20" v-model="searchData.order_no"
                          placeholder="请输入订单号"></el-input>
                <div style="display: inline-block">
                    <el-button type="primary">搜索</el-button>
                    <el-button>重置</el-button>
                </div>
            </el-form>
        </el-row>
        <template>
            <div class="page-list bg-white">
                <el-table
                        :data="tableData5"
                        header-row-class-name="el-table-th-bg"
                        header-cell-class-name="el-table-th is-center "
                        cell-class-name="is-center"
                        style="width: 100%"
                >
                    <el-table-column
                            prop="date"
                            label="日期"
                            sortable
                            width="180"
                            :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                            :filter-method="filterHandler"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址"
                            :formatter="formatter">
                    </el-table-column>
                    <el-table-column
                            prop="tag"
                            label="标签"
                            width="100"
                            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.tag === '家' ? 'primary' : 'success'"
                                    disable-transitions>{{scope.row.tag}}
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
                </el-table>
                <el-row class="mt-10">
                    <div class="page-box">
                    </div>
                </el-row>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'filterTable',
        data() {
            return {
                searchData: {},
                tableData5: [{
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
        methods: {
            createArticle(){
              this.$router.push({
                  path:'/createArticle'
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
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value
            },
            formatter(row, column) {
                return row.address
            },
            filterTag(value, row) {
                return row.tag === value
            }
        }
    }
</script>

<style scoped>

</style>
