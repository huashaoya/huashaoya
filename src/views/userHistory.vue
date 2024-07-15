<template>

   <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="id" label="ID" width="150" />
        <el-table-column fixed prop="companyName" label="发布公司" width="150" />
        <el-table-column prop="postName" label="岗位名称" width="120" />
        <el-table-column prop="status" label="状态" width="120" />
    </el-table>

</template>

<script  setup>
import { onMounted, ref } from 'vue';
import { http } from '@/utils/http'
const tableData = ref([])


function getData() {
   
    const token = window.localStorage.getItem('token')
    http({
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'get',
        url: '/user/getAllDeliveryRecords',
    }).then(res => {
        //console.log(res.data.data.data)

        tableData.value=res.data.data.data.map(v=>{
            if(v.status===0){
                v.status='进行中'
            }else if(v.status===1){
                v.status='已录用'
            }else if(v.status===2){
                v.status='已结束'
            }
            return v
        })
    })

}

onMounted(() => {
    getData()
})
</script>