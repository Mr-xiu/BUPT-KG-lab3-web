<template>
  <div class="page">
    <el-card shadow="never" class="vel_card_override">
      <div>
        <div v-show="show_kg">
          <div id="draw" ref="draw" style="width: 1200px; height: 500px;"></div>
          <el-button type="info" @click="toShowList"
                     style="width: 100px;margin: 20px 44%;">
            返回
          </el-button>
        </div>
        <div v-show="!show_kg">
          <div class="title_list">
            <div v-for="i in Math.min(8,entity_list.length-(now_page-1)*8)" :key="i"
                 class="chatItem">
              <el-button
                  type="warning"
                  @click="toShowKg((now_page - 1) * 5 + i - 1)"
              >{{ entity_list[(now_page - 1) * 8 + i - 1]['title'] }}
              </el-button
              >
            </div>
          </div>
          <div id="changePages">
            <el-button v-if="now_page !== 1" type="success" @click="now_page--"
            >上一页
            </el-button
            >
            <el-button v-else type="info" disabled>上一页</el-button>
            <el-button
                v-if="now_page*8 < entity_list.length"
                type="success"
                @click="now_page++"
            >下一页
            </el-button
            >
            <el-button v-else type="info" disabled>下一页</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {reqGetEntity} from "/src/api"


import {ElMessage} from "element-plus";
import * as echarts from "echarts";

const node_params = {
  'title': '0',
  "受灾地点": '1',
  "结束时间": '2',
  "开始日期": '2',
  "结束日期": '2',
  "开始时间": '2',

  "承载体": '3',

  "最大水深": '4',
  "积水深度": '4',
  "受灾面积": '5',
  "绝收面积": '5',
  "承灾面积": '5',
  "受灾面积2": '5',

  "转移安置人口": '6',
  "死亡人数": '6',
  "受灾群众": '6',
  "失踪人数": '6',
  "受灾人数": '6',

  "摧毁房屋": '7',
  "经济损失": '7',
}

export default {
  data() {
    return {
      now_page: 1,  // 当前所在页数
      show_kg: false,
      entity_list: [],
      show_entity: {},
    };
  },

  mounted() {
    this.entity_list = []
    reqGetEntity().then((response) => {
      let data = response.data
      console.log('reqGetEntity:', data)
      this.entity_list = data
    }).catch(function () {
      ElMessage({
        message: '联结服务器失败，请检查网路与服务器配置！',
        type: 'error',
      })
    });


  },
  methods: {
    generate_nodes(id, node_type, name) {
      let x = 0, y = 0, size = 0;
      if (node_type === 'title') {
        x = 600
        y = 250
        size = 30
      } else {
        let theta = Math.random() * 3.1415926 * 2
        let radius = 100 + Math.random() * 150
        let cos_value = Math.cos(theta) * radius
        let sin_value = Math.sin(theta) * radius

        x = 600 + cos_value
        y = 250 + sin_value
        size = 20
      }
      return {
        "id": String(id),
        "name": name,
        "symbolSize": size,
        "color_type": node_params[node_type],
        "x": String(x),
        "y": String(y),
      }

    },
    toShowKg(index) {
      this.show_entity = this.entity_list[index]
      this.show_kg = true

      let title = this.show_entity['title']
      let nodes = []  // 结点信息
      let links = []  // 关系信息
      nodes.push(this.generate_nodes(0, 'title', title))
      // 添加子node
      for (let relation_type in this.show_entity) {
        if (relation_type === 'title') continue
        for (let name in this.show_entity[relation_type]) {
          let id = nodes.length
          // 创建节点
          nodes.push(this.generate_nodes(id, relation_type, this.show_entity[relation_type][name]))
          // 创建关系
          links.push({
            "target": '0',
            "source": String(id),
            "value": relation_type,
          })
        }
      }
      console.log('draw:', this.$refs.draw)
      // 使用echarts画图
      let myChart = echarts.getInstanceByDom(this.$refs.draw)
      if (myChart !== undefined) {
        myChart.dispose()
      }
      myChart = echarts.init(this.$refs.draw);
      myChart.showLoading();
      myChart.hideLoading();
      let option = {
        title: {
          text: '暴雨洪涝芝士图谱',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'none',
            data: nodes,
            links: links,

            roam: true,
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 10
              }
            },
            itemStyle: {
              color: function (params) {
                let colorList = [
                  'Purple',
                  'MediumBlue',
                  'Green',
                  'Orange',
                  'DarkViolet',
                  'MistyRose1',
                  'OrangeRed2',
                  'Firebrick1',
                ];
                return colorList[parseInt(params.data.color_type)];
              },

            },
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      option && myChart.setOption(option);
    },
    toShowList() {
      this.show_entity = []
      this.show_kg = false
    },

  }
}
</script>

<style scoped>
.page {
  padding: 20px;
}

.vel_card_override {
  height: calc(100vh - 90px - 20px - 20px - 2px);
}

.chatItem {
  height: 40px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

#changePages {
  display: flex;
  justify-content: space-around;
}


</style>