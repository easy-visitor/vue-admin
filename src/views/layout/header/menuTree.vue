<template>
    <div>
        <template v-for="(child,index) in menuData">
            <el-submenu v-if="child.children.length > 0" :index="'index_child'+index" :key="index">
                <template slot="title">
                    <i :class="child.iconCls?child.iconCls:[fa,fa-file]"></i>
                    <span slot="title">{{child.name}}</span>
                </template>
                <menu-tree :menuData="child.children"></menu-tree>
            </el-submenu>
            <el-menu-item v-else-if="!child.hidden" :index="child.path" :key="index">
                <i :class="child.iconCls?child.iconCls:[fa,fa-file]"></i>
                <span slot="title">{{child.name}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'menuTree',
        props: ['menuData', 'menuClick'],
    }
</script>

<style scoped>

</style>
