<template>
    <div class="welcome_panel">
        <el-row>
            <el-col :span="24">
                <el-card shadow="never" class="vel_el_card_override vel_el_card_introduce">
                    <div class="introduce_avatar">
                        <el-avatar :size="400" :src="avatarUrl"/>
                    </div>
                    <div class="introduce_desc">
                        <p class="tit">你好，{{ userNick }}。欢迎使用图像检索系统~</p>
                        <p class="tips">
                           这是<a :href="githubUrl" target="_blank">我们团队</a>设计的图像检索平台。<br>
                            前端使用VUE框架，后端使用flask框架。<br>点击左侧的按钮来使用吧~<br>
                            <a :href="qdUrl" target="_blank">前端仓库</a>（其实复用了之前的项目） <br>
                            <a :href="hdUrl" target="_blank">后端仓库</a>
                        </p>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script setup>
import {computed, getCurrentInstance} from "vue";

import * as Constant from "../../config/constant";
import envConfig from "../../config/envConfig";

const globalCfg = getCurrentInstance().appContext.config.globalProperties

const name = 'vel-frame-welcome'
const githubUrl = 'https://github.com/ThreeRats'
const qdUrl = 'https://github.com/ThreeRats/object_retrieval_web'
const hdUrl = 'https://github.com/ThreeRats/CV-object-retrieval'
const avatarUrl = envConfig.baseUrl() + '/static/imgs/jimeng.webp'

// 用户名称
const userNick = computed(() => globalCfg.$store.getters[Constant.USERINFO_USER_NICK_GET_KEY])

</script>

<style scoped>

.welcome_panel {
    padding: 20px 0 0 20px;
}

:deep(.vel_el_card_introduce) .el-card__body {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
}

:deep(.vel_el_card_override) .el-card__header {
    padding-top: 15px;
    padding-bottom: 15px;
}

.introduce_avatar .el-avatar {
    margin-right: 20px;
}

.introduce_desc {
    width: calc(100% - 80px);
    min-width: 200px;
}

.introduce_desc .tit {
    margin: 20px 0 15px 0;
    color: #141b1e;
    font-weight: 400;
    font-size: 20px;
}

.introduce_desc .tips {
    color: #808695;
}


:deep(.vel_el_card_button) .el-card__body p {
    padding-top: 15px;
}

</style>
