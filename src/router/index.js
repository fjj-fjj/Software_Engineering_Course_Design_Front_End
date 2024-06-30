import { createWebHashHistory, createRouter } from "vue-router";
import Manage from '../components/Manage.vue'
import useUser from "../store";
import notification from "../utils/notification";

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/home',
            name:'Home',
            component:()=>import('../components/Home.vue')
        },
        {
            path:'/product/:id',
            name:'ProductItem',
            component:()=>import('../components/ProductItem.vue')
        },
        {
            path:'/login',
            name:'Login',
            component:()=>import('../components/Login.vue')
        },
        {
            path:'/register',
            name:'Register',
            component:()=>import('../components/Register.vue')
        },
        {
            path:'/manage',
            name:'Manage',
            component:Manage,
            children:[
                {
                    path:'/collectTable',
                    name:'CollectTable',
                    component:()=>import('../components/CollectTable.vue')
                },
                {
                    path:'/modifyPassword',
                    name:'ModifyPassword',
                    component:()=>import('../components/ModifyPassword.vue')
                },
                {
                    path:'/compareTwoPhones',
                    name:'CompareTwoPhones',
                    component:()=>import('../components/CompareTwoPhones.vue')
                }
            ]
        },
        {
            path:'/temp',
            name:'Temp',
            component:()=>import('../components/Temp.vue')
        }
    ]
})
router.beforeEach((to,from,next)=>{
    const {username} = useUser()
    if(username=='')
    {
        if(to.path==='/login'||to.path==='/register')
        {
            next()
        }
        else
        {
            notification({
                message:'请先登录',
                type:'error'
            })
            next('/login')
        }
    }
    else
    {
        next()
    }
})
export default router