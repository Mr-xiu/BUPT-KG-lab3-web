<template>
    <div class="page">

        <el-card shadow="never" class="vel_card_override">

            <el-upload
                    action=""
                    accept=".jpg, .png"
                    :limit="1"
                    :auto-upload="false"
                    :on-change="getFile"
                    :on-exceed="handleExceed"
                    :before-remove="handleRemove"
            >
                <el-button type="primary" style="margin-left: 10px;">选择图片</el-button>

            </el-upload>
            <div
                    v-if="imgUrl"
                    style=" display: flex;flex-direction: column;"
            >
                <el-image
                        :src="imgUrl"
                        fit="fill"
                        :preview-src-list="srcList"
                        style="width: 600px; height: 400px; margin-left: 10px;"
                ></el-image>
                <el-button type="success" @click="submitUpload"
                           style="margin-left: 260px;margin-top: 10px; width: 100px;">
                    开始检索
                </el-button>
                <el-progress :percentage="percentage" :color="customColorMethod"
                             style="margin-top: 10px; width: 700px;"
                />
            </div>

        </el-card>
    </div>
</template>

<script>
import {ElMessage, ElLoading} from 'element-plus'
import {reqSendImg, reqGetProcess} from "/src/api"

export default {
    data() {
        return {
            base64Image: "",
            imgUrl: '',
            srcList: [],
            percentage: 0,
        };
    },

    methods: {
        // 进度条更新颜色
        customColorMethod() {

            if (this.percentage < 30) {
                return '#909399'
            }
            if (this.percentage < 70) {
                return '#e6a23c'
            }
            return '#67c23a'
        },
        // 再次上传图片
        handleExceed(file) {
            ElMessage({
                message: '只能上传一张图片~',
                type: 'warning',
            })
        },
        handleRemove(file) {
            this.base64Image = '';
            this.imgUrl = '';
            this.srcList = [];
            this.percentage = 0;
            this.$store.state.has_retrieval = false;
            this.$store.state.now_img = '';
            this.$store.state.time = '';
            this.$store.state.result_img_list = [];
            ElMessage({
                message: '删除成功~',
                type: 'success',
            })
        },
        // 将图片转换为base64格式
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                const reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);

                reader.onload = function () {
                    imgResult = reader.result;
                };
                reader.onerror = function (error) {
                    reject(error);
                };
                reader.onloadend = function () {
                    resolve(imgResult);
                };
            });
        },
        // 获取已上传图片的信息
        getFile(file) {
            this.getBase64(file.raw).then((res) => {
                const params = res.split(",");

                if (params.length > 0) {
                    this.base64Image = params[1];
                    // this.imgUrl = ''
                    this.imgUrl = 'data:image/jpeg;base64,' + params[1];
                    this.srcList.push('data:image/jpeg;base64,' + params[1]);
                    // 发送给后端
                }
            });
        },
        // 上传图片
        async submitUpload() {
            // sleep方法用于请求等待，减轻服务器负载
            function sleep(time) {
                return new Promise(resolve => setTimeout(resolve, time))
            }

            reqSendImg(this.base64Image).then(async (response) => {
                let data = response.data;
                console.log(response);
                const loading = ElLoading.service({
                    lock: true,
                    text: 'Loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
                // status为0时说明后端出现问题
                if (data.status == 0) {
                    ElMessage({
                        message: '上传失败，服务器出现问题！',
                        type: 'error',
                    })
                } else if (data.status == 1) {
                    this.$store.state.has_retrieval = true;
                    this.$store.state.result_img_list = data.result_img_list;
                    this.$store.state.time = data.time;
                    this.$store.state.now_img = this.imgUrl;
                    this.percentage = 100;
                    ElMessage({
                        message: '识别成功，结果请查看查看结果页面~~~',
                        type: 'success',
                    })
                } else {
                    let process_data = {};
                    while (this.percentage != 100) {
                        await sleep(3000);
                        reqGetProcess().then((response) => {
                            process_data = response.data;
                            this.percentage = process_data.percentage;
                        })
                    }
                    this.$store.state.has_retrieval = true;
                    this.$store.state.result_img_list = process_data.result_img_list;
                    this.$store.state.time = process_data.time;
                    this.$store.state.now_img = this.imgUrl;
                    ElMessage({
                        message: '识别成功，结果请查看查看结果页面~~~',
                        type: 'success',
                    })

                }
                loading.close();
            }).catch(function (error) {
                ElMessage({
                    message: '上传失败，请检查网路！',
                    type: 'error',
                })
            });
            // 前端测试使用
            // this.$store.state.has_retrieval = true;
            // this.$store.state.result_img_list = [this.imgUrl, this.imgUrl, this.imgUrl, this.imgUrl, this.imgUrl];
            // this.$store.state.time = '114分514秒';
            // this.$store.state.now_img = this.imgUrl;

        },
    },
};
</script>
<style scoped>
.page {
    padding: 20px;
}


.vel_card_override {
    height: calc(100vh - 90px - 20px - 20px - 2px);
}

</style>