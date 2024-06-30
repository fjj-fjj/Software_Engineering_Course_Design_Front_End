<template>
    <div class="common-layout">
        <el-container>
            <el-header style="background-color: dodgerblue;">
                <h2 style="color: aliceblue;position: absolute;left:5%;top:-0.5%">5G手机评价分析-用户界面</h2>
                <el-button style="position: absolute;right: 12%;top:2.5%;" @click="onLogOut">退出登录</el-button>
                <el-button style="position: absolute;right: 5%;top:2.5%;" @click="returnToHome">返回主页</el-button>
            </el-header>
            <el-container>
                <el-aside>
                    <el-row>
                        <el-col :span="24">
                            <el-menu active-text-color="blue" class="el-menu-vertical-demo" :default-active="active"
                                text-color="#333">
                                <router-link :to="{ name: 'CollectTable' }">
                                    <el-menu-item index="1">
                                        <el-icon>
                                            <Document />
                                        </el-icon>
                                        <span>收藏表</span>
                                    </el-menu-item>
                                </router-link>
                                <router-link :to="{ name: 'ModifyPassword' }">
                                    <el-menu-item index="2">
                                        <el-icon>
                                            <Key />
                                        </el-icon>
                                        <span>修改密码</span>
                                    </el-menu-item>
                                </router-link>
                                <router-link :to="{ name: 'CompareTwoPhones' }">
                                    <el-menu-item index="3">
                                        <el-icon>
                                            <Operation/>
                                        </el-icon>
                                        <span>比较两款手机</span>
                                    </el-menu-item>
                                </router-link>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <el-card class="box-card">
                        <router-view></router-view>
                    </el-card>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import router from '../router'
import notification from '../utils/notification'
import { Document, Key, Operation } from '@element-plus/icons-vue'
import { logout } from '../api'
const active = ref('1')
onMounted(()=>{
    router.push({name:'CollectTable'})
})
const onLogOut = async () => {
    const data = await logout()
    router.push({ name: 'Login' })
    notification({
        message: '退出成功',
        type: 'success'
    })
}
const returnToHome = ()=>{
    router.push({name:'Home'})
}
</script>
<style lang="less" scoped>
.el-container{
    height:100%;
    overflow-y: scroll;
    .el-aside{
        width:200px;
        height: 100%;
        color:#333;
        background: white;
    }
    .el-main{
        height: 100vh;
        background-color: #e9eef3;
        color:#333;
    }
}
</style>