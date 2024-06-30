<template>
    <el-card class="box-card">
        <el-card class="box-form">
            <template #header>
                <div class="card-header">
                    <h3>5G手机评价分析平台登录</h3>
                </div>
            </template>
            <el-form ref="ruleFormRef" status-icon :model="form" :rules="rules" label-width="120px">
                <el-form-item prop="username" label="用户名:">
                    <el-input v-model="form.username" placeholder="请输入用户名" auto-complete="off" />
                </el-form-item>
                <el-form-item prop="pwd" label="密&nbsp;&nbsp;&nbsp;码:">
                    <el-input v-model="form.pwd" type="password" show-password placeholder="请输入密码"
                        auto-complete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button class="button" @click="submitForm(ruleFormRef)" type="primary"
                        size="large">登录</el-button>
                    <el-button class="button" @click="resetForm" type="info" size="large">重置</el-button>
                </el-form-item>
            </el-form>
            <router-link :to="{ name: 'Register' }" style="color:#333;">注册账号</router-link>
        </el-card>
    </el-card>
</template>
<script setup>
import { login } from '../api'
import { ref, reactive } from 'vue'
import router from '../router';
import notification from '../utils/notification';
import useUser from '../store'
const {updateUsername} = useUser()
const form = reactive({
    username: '',
    pwd: ''
})
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    pwd: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})
const ruleFormRef = ref()
const submitForm = formEl => {
    formEl.validate(async valid => {
        if (valid) {
            const data = await login(form)
            console.log(data)
            if (data.code == 0) {
                updateUsername(form.username)
                router.push({ name: 'Home' })
                notification({
                    message: '登录成功',
                    type: 'success'
                })
            }
            else {
                ElNotification({
                    type: 'error',
                    message: data.msg
                })
            }
        }
    })
}
const resetForm = () => {
    ruleFormRef.value.resetFields()
}
</script>
<style lang="less" scoped>
.box-card {
    height: 100%;

    .box-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70%;
        max-width: 750px;

        .card-header {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .el-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .el-form-item {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 70%;
                margin-top: 15px;
                margin-bottom: 15px;

                .button {
                    width: 90px;
                }
            }
        }
    }
}
</style>