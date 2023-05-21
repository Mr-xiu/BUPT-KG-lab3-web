<template>
    <div class="page">
        <el-card shadow="never" class="vel_card_override">
            <div v-if="has_retrieval">
                <!--                <h3 style="margin-left: 10px;">原图：</h3>-->
                <el-button type="primary" style="margin-left: 10px;">原图</el-button>
                <br>
                <el-image
                        :src="now_img"
                        fit="fill"
                        :preview-src-list="srcList"
                        style="width: 300px; height: 200px; margin-left: 10px; margin-top: 20px;"
                ></el-image>
                <!--                <h3 style="margin-left: 10px; margin-top: 30px;">相似的图片：</h3>-->
                <br>
                <el-button type="success" style="margin-left: 10px; margin-top: 20px;">相似的图片</el-button>
                <br>
                <div style="display:flex; ">
                    <div v-for="i in result_img_list.length" :key="i">
                        <el-image
                                :src="result_img_list[i-1]"
                                fit="fill"
                                :preview-src-list="result_img_list"
                                style="width: 150px; height: 100px; margin-left: 10px; margin-top: 20px;margin-right: 30px;"
                        >{{ result_img_list[i] }}
                        </el-image>
                    </div>
                </div>
                <br>
                <el-button type="info" style="margin-left: 10px; margin-top: 20px;">共耗时：{{ time }}</el-button>
                <br>

            </div>
            <h3 v-else> 请先上传图片识别...</h3>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            has_retrieval: this.$store.state.has_retrieval,
            now_img: this.$store.state.now_img,
            result_img_list: this.$store.state.result_img_list,
            srcList: [this.$store.state.now_img],
            time: this.$store.state.time,
        };
    },

    methods: {}
}
</script>

<style scoped>
.page {
    padding: 20px;
}

.vel_card_override {
    height: calc(100vh - 90px - 20px - 20px - 2px);
}

</style>