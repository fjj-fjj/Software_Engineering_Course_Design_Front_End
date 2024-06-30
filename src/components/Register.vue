<template>
    <el-card class="box-card">
        <el-card class="box-form">
            <template #header>
                <div class="card-header">
                    <h3>5G手机评价分析平台注册</h3>
                </div>
            </template>
            <el-form ref="ruleFormRef" status-icon :model="form" :rules="rules" label-width="120px">
                <el-form-item prop="username" label="用户名:">
                    <el-input v-model="form.username" placeholder="请输入用户名" auto-complete="off" />
                </el-form-item>
                <el-form-item prop="pwd1" label="密&nbsp;&nbsp;&nbsp;码:">
                    <el-input v-model="form.pwd1" type="password" show-password placeholder="请输入密码"
                        auto-complete="off" />
                </el-form-item>
                <el-form-item prop="pwd2" label="确认密码:">
                    <el-input v-model="form.pwd2" type="password" show-password placeholder="请再次输入密码"
                        auto-complete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button class="button" @click="submitForm(ruleFormRef)" type="primary"
                        size="large">注册</el-button>
                    <el-button class="button" @click="resetForm" type="info" size="large">重置</el-button>
                </el-form-item>
            </el-form>
            <router-link :to="{ name: 'Login' }" style="color:#333;">返回登陆界面</router-link>
        </el-card>
    </el-card>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { register } from '../api';
import router from '../router';
import notification from '../utils/notification';
const form = reactive({
    username: '',
    pwd1: '',
    pwd2: ''
})
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    pwd1: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    pwd2: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== form.pwd1) {
                    console.log(111)
                    callback(new Error('两次输入的密码不一致'))
                }
                callback()
            }, trigger: 'blur'
        }
    ]
})
const ruleFormRef = ref()
const submitForm = formEl => {
    formEl.validate(async valid => {
        if (valid) {
            const data = await register(form)
            if (data.code == 0) {
                router.push({ name: 'Login' })
                notification({
                    message: '注册成功',
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