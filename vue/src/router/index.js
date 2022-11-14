import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from "js-cookie";
import Layout from "@/views/AdminLayout";
import StudentLayout from "@/views/StudentLayout";

Vue.use(VueRouter)

let admin = Cookies.get('admin') ? JSON.parse(Cookies.get("admin")) : {}
let flag =Cookies.get('admin')? 1:0
const routes = [
    // 登录
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login')
    },
    {
        path: '/student',
        name: 'StudentLayout',
        component: StudentLayout,
        redirect: '/selectClassHome',
        children: [
            {
                path:'/selectClassHome',
                name:'SelectClassHome',
                component:()=>import('@/views/home/SelectClassHome')
            },
            {
                path:'/classList',
                name:'ClassList',
                component:()=>import('@/views/studentClass/classList')
            }
        ]
    },
    // 主页
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect:  flag===0 ?'home': (admin.userInfo.flag===2? '/student': '/home'), //重定向，这样才能显示Home子路由，否则停留在Layout
        //'/'的子路由：完整路由是由Layout的path和子路由的path拼接起来的
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/home/HomeView.vue')
            },
            // Admin
            {
                path: 'adminList',
                name: 'AdminList',
                component: () => import('@/views/user/List.vue')
            },
            {
                path: 'addAdmin',
                name: 'AddAdmin',
                component: () => import('@/views/user/Add.vue')
            },
            {
                path: 'editAdmin',
                name: 'EditAdmin',
                component: () => import('@/views/user/Edit.vue')
            },
            {
                path: 'sc',
                name: 'Sc',
                component: () => import('@/views/selectClass/sc')
            },
            {
                path: 'classes',
                name: 'Class',
                component: () => import('@/views/selectClass/classes')
            },

        ]
    },
    {
        path: "*",
        component: () => import('@/views/404')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const Admin =Cookies.get('admin')
    flag=Cookies.get('admin')? 1:0
    admin = Cookies.get('admin') ? JSON.parse(Cookies.get("admin")) : {}
    if(from.path==='/login'&&admin.userInfo.flag===0&&to.path==='/selectClassHome') return next('/home')
    if(to.path===from.path){
        flag=0;
    }
    // console.log('user',user,Admin? user.userInfo.flag:1)
    if (!Admin && to.path !== '/login') return next("/login") //强制退回到登录页面
    if(from.path==='/'){
         if (admin.userInfo.flag===0){
            if(to.path === '/student'){
                return  next("*");
            }
            else if(to.path === '/selectClassHome'){
                return  next("*");
            }
        }
        else{
            if(to.path === '/home'){
                 next("*");
            }
            else if(to.path === '/userList'){
                return  next("*");
            }
            else if(to.path === '/addUser'){
                return  next("*");
            }
            else if(to.path === '/editUser'){
                return  next("*");
            }
            else if(to.path === '/adminList'){
                return  next("*");
            }
            else if(to.path === '/addAdmin'){
                return  next("*");
            }
            else if(to.path === '/editAdmin'){
                return  next("*");
            }
            else if(to.path === '/sc'){
                return  next("*");
            }
            else if(to.path === '/classes'){
                return  next("*");
            }

        }
    }
    next()
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}


export default router
