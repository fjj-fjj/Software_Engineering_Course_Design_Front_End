import { defineStore } from "pinia"
const useUser = defineStore('username', {
    state:()=>{
        return {
            username:''
        }
    },
    getters:{},
    actions:{
        updateUsername(val){
            this.username = val
        },
        removeUsername(){
            this.username = ''
        }
    },
    persist:{
        enabled:true,
        strategies:[
            {
                key:'username',
                storage:localStorage
            }
        ]
    }
})
export default useUser