<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">找岗位</el-menu-item>
        <!-- <el-menu-item index="3">聊天消息</el-menu-item> -->
        <el-menu-item index="4">我的简历</el-menu-item>
        <el-menu-item index="5">投递记录</el-menu-item>
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
    console.log(key)
    if(key==='1'){
        router.push('/user/index')
    }else if(key==='2'){
        router.push('/user/work')
    }else if(key==='3'){
        router.push('/user/chat')
    }else if(key==='4'){
        router.push('/user/info')
    }else{
        router.push('/user/history')
    }
}


</script>