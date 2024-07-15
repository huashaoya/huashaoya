<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">发岗位</el-menu-item>
        <!-- <el-menu-item index="3">聊天消息</el-menu-item> -->
        <!-- <el-menu-item index="4">公司资料</el-menu-item> -->
        <el-menu-item index="5">投递情况</el-menu-item>
    </el-menu>
    <RouterView />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const activeIndex = ref('1')

const handleSelect = (key: string, keyPath: string[]) => {
    if(key==='1'){
        router.push('/company')
    }else if(key==='2'){
        router.push('/company/work')
    }else if(key==='3'){
        router.push('/company/chat')
    }else if(key==='4'){
        router.push('/company/info')
    }else{
        router.push('/company/history')
    }
}

</script>