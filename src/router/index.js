

// 这里面负责写路由映射，便于管理


// 引入路由模块并使用它
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 创建路由实例并配置路由映射  
const router = new VueRouter({
	routes:[
	{ path: '/merge', component: require('../components/merge.vue') },
	{ path: '/overview', component: require('../components/overview.vue') },
	{ path: '/search', component: require('../components/search.vue') },
	{ path:'*',redirect:'/overview' } 
	]
})


// 输出router
export default router;

