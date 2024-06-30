import { defineStore } from "pinia";
const useHome = defineStore('home',{
    state:()=>{
        return {
            homePage:1,
            homeSortMethod:'goods_price_desc',
            homeInitialLetter:'全部',
            homeMsg:''
        }
    },
    getters:{},
    actions:{
        updateHomeMsg(val){
            this.homeMsg = val
        },
        updateHomePage(val){
            this.homePage = val
        },
        updateHomeSortMethod(val){
            this.homeSortMethod = val
        },
        updateHomeInitialLetter(val){
            this.homeInitialLetter = val
        },
        removeHome(){
            this.homePage = 1
            this.homeSortMethod = 'goods_price_desc'
            this.homeInitialLetter = '全部'
            this.homeMsg = ''
        }
    },
    persist:{
        enabled:true,
        strategies:[
            {
                key:'home',
                storage:localStorage
            }
        ]
    }
})
export default useHome