<template>
    <section class="vel_login">
        <el-form
                :model="loginForm"
                class="el_form_override"
        >
            <h3>
                <el-icon
                        :size="36"
                        color="#409EFF"
                >
                    <ElementPlus/>
                </el-icon>
                图像检索系统
            </h3>
            <el-form-item>
                <el-input
                        v-model="loginForm.userName"
                        placeholder="登录用户名"
                        size="large"
                        prefix-icon="UserFilled"
                        clearable
                />
            </el-form-item>
            <el-form-item>
                <el-input
                        v-model="loginForm.passWord"
                        placeholder="登录密码"
                        type="password"
                        size="large"
                        prefix-icon="Lock"
                        show-password
                />
            </el-form-item>
            <el-form-item>
                <el-button
                        type="primary"
                        :loading="loading"
                        @click="submitLogin"
                        size="large"
                        style="width: 100%"
                >
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script setup>
import {ref, getCurrentInstance} from "vue";
import {cacheUserInfo} from '../../router/modules/auth'

const globalCfg = getCurrentInstance().appContext.config.globalProperties

// 登录表单
const loginForm = ref({
    userName: 'heyixiao',
    passWord: '114514'
})

const loading = ref(false)

// 登录事件
const submitLogin = async () => {
    loading.value = true
    // 模拟登录请求
    // 实际项目应该为POST请求
    console.log('准备请求login.json')
    // let res = await globalCfg.$http.get('/static/res/login.json', {...loginForm})
    let res = {
        "statusCode": 200,
        "message": "登陆成功",
        "data": {
            "userName": "heyixiao",
            "token": "qwertyuiopasdfghjklzxcvbnm",
            "userNick": "hyx"
        }
    }
    console.log('flask返回的res：\n', res)
    // 登录成功，缓存用户信息
    await cacheUserInfo(res.data)

    // 模拟登录耗时操作
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 100)
    })

    // 关闭Loading
    loading.value = false
    console.log('应该成功关闭Loading')
    globalCfg.$router.push('/')
}


</script>

<style scoped>
.vel_login {
    background-color: #2d3a4b;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.el_form_override {
    min-width: 300px;
    padding: 50px;
    background-color: rgb(41, 51, 67);
    border: 1px solid rgb(50, 60, 74);
    border-radius: 5px;
}

.el_form_override h3 {
    font-size: 26px;
    color: #eee;
    margin-bottom: 40px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}

.el_form_override h3 .el-icon {
    margin-right: 10px;
}
</style>
