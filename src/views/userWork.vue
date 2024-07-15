<template>
    <div style="padding: 20px;">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
            
            <el-form-item>
                <el-input v-model="key" style="width: 240px" placeholder="搜索岗位" />
                <el-button type="primary" @click="search">搜索</el-button>                 
            </el-form-item>
            <el-form-item>
                <el-select v-model="type" placeholder="岗位类型" style="width: 240px">
                    <el-option v-for="item in postType" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-input v-model="minMoney" style="width: 80px" placeholder="最低价" />-
                <el-input v-model="maxMoney" style="width: 80px" placeholder="最高价" />

                <el-button type="primary" @click="search2">筛选</el-button>                 
            </el-form-item>
        </el-form>
        <el-pagination small v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="[15, 25, 40, 60, 80, 100]" :background="true" layout="total, sizes, prev, pager, next, slot"
            :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="id" label="ID" width="150" />
            <el-table-column fixed prop="type" label="岗位类型" width="150" />
            <el-table-column prop="name" label="岗位名称" width="120" />
            <el-table-column prop="money" label="价格" width="120" />
            <el-table-column prop="requirement" label="岗位描述" width="600" />
            <el-table-column prop="companyName" label="发布公司" width="120" />
            <el-table-column fixed="right" label="Operations" min-width="120">
                <template #default="scope">
                    <el-button link type="primary" @click="handleClick(scope.row.id, scope.row.companyId)">
                        投递
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
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
const postType = ref([])
const type = ref('')
const minMoney = ref('0')
const maxMoney = ref('1000')
const key = ref('')
function search(){
    const token = window.localStorage.getItem('token')
    http({
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        url: '/user/search',
        params: {
            key:key.value
        }
    }).then(res => {
        console.log(res.data.data.data)
        // total.value = res.data.data.data.total
        tableData.value = res.data.data.data
    })
}
function search2(){
    const token = window.localStorage.getItem('token')
    http({
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        url: '/user/searchPostsByRequirements',
        params: {
            type:type.value,
            minMoney:parseInt(minMoney.value),
            maxMoney:parseInt(maxMoney.value)
        }
    }).then(res => {
        console.log(res.data.data.data)
        // total.value = res.data.data.data.total
        tableData.value = res.data.data.data
    })
}
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
function getData(pageNum, pageSize) {
    let data = {
        pageNum,
        pageSize
    }
    const token = window.localStorage.getItem('token')
    http({
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'get',
        url: '/user/getAllPost',
        params: data
    }).then(res => {
        console.log(res.data.data)
        total.value = res.data.data.data.total
        tableData.value = res.data.data.data.list
    })

}
function getAllPostType() {
    const token = window.localStorage.getItem('token')
    http({
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'get',
        url: '/admin/getAllPostType',
    }).then(res => {
        console.log(res.data.data)
        let tmp = []
        res.data.data.postType.forEach(element => {
            tmp.push({
                label: element.name,
                value: element.name
            })
            postType.value = tmp
        });
    })
}
const handleClick = (postId, companyId) => {
    console.log(postId, companyId, parseInt(companyId))
    const token = window.localStorage.getItem('token')
    http({
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'get',
        url: '/user/delive',
        params: {
            postId,
            companyId: parseInt(companyId)
        }
    }).then(res => {
        console.log(res.data.data)
        ElNotification({
            title: 'Success',
            message: '投递成功',
            type: 'success'
          })
    })
}
onMounted(() => {
    getData(currentPage.value, pageSize.value)
    getAllPostType()
})
</script>