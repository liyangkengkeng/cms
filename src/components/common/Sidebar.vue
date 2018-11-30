<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" style='padding-left:50px'>
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '产品管理',
                        subs: [
                            {
                                index: '/goodsList',
                                title: '商品管理',
                                subs:[
                                    {
                                        index:'goodsDetails',
                                        title:'商品详情'
                                    },
                                    {
                                        index: '/addGoods',
                                        title: '创建商品',
                                    },
                                    {
                                        index: '/editGoods',
                                        title: '编辑商品',
                                    }
                                ]
                            },
                            {
                                index: '/goodsList_en',
                                title: '英文版商品管理',
                                subs:[
                                    {
                                        index:'goodsDetails_en',
                                        title:'英文版商品详情'
                                    },
                                    {
                                        index: '/addGoods_en',
                                        title: '英文版创建商品',
                                    },
                                    {
                                        index: '/editGoods_en',
                                        title: '英文版编辑商品',
                                    }
                                ]
                            },
                        ]
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){

            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
