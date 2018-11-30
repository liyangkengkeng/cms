import Vue from 'vue';
import router from 'vue-router';

Vue.use(router);

export default new router({
    // mode:'history',
    routes: [
        {
            path: '',
            redirect: '/login'
        },
        {
            path: '/goodsList',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '产品管理' },
            children:[
                {
                    path:'/goodsList',
                    component: resolve => require(['../components/page/goods/goodsList.vue'], resolve),
                    meta: { title: '商品管理' },
                },
                {
                    path:'/addGoods',
                    component: resolve => require(['../components/page/goods/found/addGoods.vue'], resolve),
                    meta: { title: '创建商品' },
                },
                {
                    path:'/editGoods',
                    component: resolve => require(['../components/page/goods/editGoods.vue'], resolve),
                    meta: { title: '编辑商品' },
                },
                {
                    path:'/goodsDetails',
                    component: resolve => require(['../components/page/goods/goodsDetails.vue'], resolve),
                    meta: { title: '商品详情' },
                },
                // 英文版
                {
                    path:'/goodsList_en',
                    component: resolve => require(['../components/page/goods_en/goodsList_en.vue'], resolve),
                    meta: { title: '英文版商品管理' },
                },
                {
                    path:'/addGoods_en',
                    component: resolve => require(['../components/page/goods_en/found/addGoods_en.vue'], resolve),
                    meta: { title: '英文版创建商品' },
                },
                {
                    path:'/editGoods_en',
                    component: resolve => require(['../components/page/goods_en/editGoods_en.vue'], resolve),
                    meta: { title: '英文版编辑商品' },
                },
                {
                    path:'/goodsDetails_en',
                    component: resolve => require(['../components/page/goods_en/goodsDetails_en.vue'], resolve),
                    meta: { title: '英文版商品详情' },
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
