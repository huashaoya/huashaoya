<template>
    <el-table :data="tableData" style="width: 100%">
         <el-table-column fixed prop="id" label="ID" width="150" />
         <el-table-column prop="postName" label="岗位名称" width="120" />
         <el-table-column fixed prop="userName" label="投递人" width="150" />
         <el-table-column prop="status" label="状态" width="120" />
         <el-table-column  label="简历" width="120" >
            <template #default="scope">
                <el-image v-if="scope.row.resume" :src="scope.row.resume" class="avatar" style="width: 50px; height: 80px"
                fit="contain"  :preview-src-list="srcList" :preview-teleported="true"/>
                </template>
         </el-table-column>
         <el-table-column fixed="right" label="Operations" min-width="120">
                <template #default="scope">
                    <el-button link type="primary" @click="setStatus(scope.row.id,1)">
                        录用
                    </el-button>
                    <el-button link type="danger" @click="setStatus(scope.row.id, 2)">
                        结束
                    </el-button>
                </template>
            </el-table-column>
     </el-table>
 
 </template>
 
 <script  setup>
 import { onMounted, ref } from 'vue';
 import { http } from '@/utils/http'
 const tableData = ref([])
 const srcList=ref([])
 function setStatus(id,status){
    const token = window.localStorage.getItem('token_admin')
     http({
         headers: {
             'Authorization': token,
             'content-type': 'application/x-www-form-urlencoded'
         },
         method: 'get',
         url: '/company/updateDeliveryStatus',
         params:{
            id,
            status
         }
     }).then(res => {
        console.log(res.data)
        getData()
        
     })
 }
 function getData() {
    
     const token = window.localStorage.getItem('token_admin')
     http({
         headers: {
             'Authorization': token,
             'content-type': 'application/x-www-form-urlencoded'
         },
         method: 'get',
         url: '/company/getAllDeliveryRecords',
     }).then(res => {
        console.log(res.data.data.data)
        tableData.value=res.data.data.data
        srcList.value=[]
        tableData.value=res.data.data.data.map(v=>{
            if(v.status==0){
                v.status='进行中'
            }else if(v.status==1){
                v.status='已录用'
            }else if(v.status==2){
                v.status='已结束'
            }
            srcList.value.push(v.resume)
            return v
        })
     })
 
 }
 
 onMounted(() => {
     getData()
 })
 </script>

 <style>
 .el-table__fixed-body-wrapper {
    z-index: auto !important;
  }
 </style>