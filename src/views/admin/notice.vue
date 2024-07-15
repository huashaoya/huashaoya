<template>
    <div style="padding:20px; width:800px">
    <el-button type="primary" @click="addPost">发布公告</el-button>
    <!-- <el-pagination small v-model:current-page="currentPage" v-model:page-size="pageSize"
        :page-sizes="[15, 25, 40, 60, 80, 100]" :background="true"
        layout="total, sizes, prev, pager, next, slot" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" /> -->

    <el-table :data="tableData" style="width: 800px">
        <el-table-column fixed prop="id" label="ID" width="150" />
        <el-table-column fixed prop="title" label="名称" width="150" />
        <el-table-column prop="content" label="内容" width="400" />
        <el-table-column fixed="right" label="Operations" min-width="120">
            <template #default="scope">
                <el-button link type="danger"  @click="handleClick(scope.row.id)">
                    删除
                </el-button>
                
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="发布公告" width="500">
        <el-form :label-position="labelPosition" label-width="auto" :model="formLabelAlign" style="max-width: 600px">
            <el-form-item label="标题">
                <el-input v-model="title" />
            </el-form-item>
        
            <el-form-item label="内容">
                <el-input v-model="content" style="width: 400px" :rows="5" type="textarea"
                    placeholder="内容" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">发布</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { ref, onMounted } from 'vue';
import { http } from '@/utils/http'
const total = ref(0)
const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const dialogVisible = ref(false)
const postType = ref([])
const type = ref('')
const title = ref('')
const content = ref('')
// 更新每页数目
function handleSizeChange(number) {
    pageSize.value = number
    getData(currentPage.value, pageSize.value)
}
// 更新现在是第几页
function handleCurrentChange(number) {
    currentPage.value = number
    getData(currentPage.value, pageSize.value)
}
function addPost() {
    dialogVisible.value = true
}
function getData(pageNum, pageSize) {
    let data = {
        pageNum,
        pageSize
    }
    const token = window.localStorage.getItem('token_admin')

    http({
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'get',
        url: '/admin/getNotice',
        params: data
    }).then(res => {
        console.log(res.data.data)
        //total.value = res.data.data.data.total
        tableData.value = res.data.data.data
    })

}

const handleClick = (id) => {
    console.log(id)
    const token = window.localStorage.getItem('token_admin')
    http({
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        url: '/admin/deleteNotice',
        params:{
          id:id
        }
    }).then(res=>{
        console.log(res)
        getData(currentPage.value, pageSize.value)
    })
}

function onSubmit() {
    const token = window.localStorage.getItem('token_admin')
    http({
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        url: '/admin/addNotice',
        params:{
            title:title.value,
            content:content.value
        }
    }).then(res => {
        console.log(res.data.data)
        if (res.data.data.status === 0) { 
          ElNotification({
            title: 'Success',
            message: '发布成功',
            type: 'success'
          })  
          dialogVisible.value=false 
          getData(currentPage.value, pageSize.value)    
        } else {
          ElNotification({
            title: 'warning',
            message: res.data.data.msg,
            type: 'warning'
          })
        }
    })
}

onMounted(() => {
    getData(currentPage.value, pageSize.value)
})
</script>