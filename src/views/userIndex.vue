<template>
  <div style="padding:20px;text-align: center">
    <el-row>
      <el-col :span="6">
        <el-statistic title="Daily active users" :value="268500" />
      </el-col>
      <el-col :span="6">
        <el-statistic :value="138">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Ratio of men to women
              <el-icon style="margin-left: 4px" :size="12">
                <Male />
              </el-icon>
            </div>
          </template>
          <template #suffix>/100</template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="Total Transactions" :value="outputValue" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="Feedback number" :value="562">
          <template #suffix>
            <el-icon style="vertical-align: -0.125em">
              <ChatLineRound />
            </el-icon>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
    <h1>🤪网站公告:</h1>
    <div v-for="item in tableData" style="margin:20px">
      <h2>[{{ item.title}}]</h2>
      <h4>{{ item.content}}</h4>
    </div>
  </div>
   
  </template>
  
  <script  setup>
  import { ref ,onMounted} from 'vue'
  import { useTransition } from '@vueuse/core'
  import { ChatLineRound, Male } from '@element-plus/icons-vue'
  import { http } from '@/utils/http'
  const tableData=ref([])
  const source = ref(0)
  const outputValue = useTransition(source, {
    duration: 1500,
  })
  source.value = 172000
  function getData(){
    const token = window.localStorage.getItem('token_admin')
    http({
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'get',
        url: '/admin/getNotice',
    }).then(res => {
        console.log(res.data.data)
        //total.value = res.data.data.data.total
        tableData.value = res.data.data.data
    })

}
onMounted(()=>{
  getData()
})
  </script>
  
  <style scoped>
  .el-col {
    text-align: center;
  }
  </style>