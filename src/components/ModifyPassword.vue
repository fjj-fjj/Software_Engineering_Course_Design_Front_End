<template>
    <div class="change-password-box">
        <el-form ref="ruleFormRef" status-icon :model="form" :rules="rules" label-width="200px">
            <el-form-item prop="pwd1" label="请输入原密码">
                <el-input type="password" v-model="form.pwd1" show-password/>
            </el-form-item>
            <el-form-item prop="pwd2" label="请输入修改后的密码">
                <el-input type="password" v-model="form.pwd2" show-password/>
            </el-form-item>
            <el-form-item prop="pwd3" label="请再次输入修改后的密码">
                <el-input type="password" v-model="form.pwd3" show-password/>
            </el-form-item>
            <el-form-item class="button">
                <el-button type="primary" @click="submitForm(ruleFormRef)" class="submitButton">提交</el-button>
                <el-button @click="resetForm" class="resetButton">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { modifyPassword } from '../api';
import router from '../router';
import useUser from '../store';
import notification from '../utils/notification';
const {removeUsername} = useUser()
const form = reactive({
    pwd1: '',
    pwd2: '',
    pwd3: ''
})
const ruleFormRef = ref()
const submitForm = formEl => {
    formEl.validate(async valid=>{
        if(valid)
        {
            const data = await modifyPassword(form)
            console.log(data)
            if(data.code==0)
            {
                router.push({ name: 'Login' })
                notification({
                    message: '修改密码成功',
                    type: 'success'
                })
                removeUsername()
            }
            else
            {
                ElNotification({
                    type:'error',
                    message:data.msg
                })
            }
        }
    })
}
const resetForm = () => {
    ruleFormRef.value.resetFields();
}
const validatePass = (rule, value, callback) => {
    if (value !== form.pwd2) {
        callback(new Error('两次输入密码不一致!'))
    }
    else {
        callback()
    }
}
const rules = reactive({
    pwd1: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    pwd2: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    pwd3: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
    ]
})
</script>
<style lang="less" scoped>
.change-password-box{
    padding-top: 38px;
    .button{
        .submitButton{
            margin-left: 30%;
        }
    }
}
</style>