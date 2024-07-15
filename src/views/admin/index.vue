<template>
    <div style="height: 100vh;">
        <el-row class="tac">
            <el-col :span="4">
                <div style="background-color: #545c64;height: 100vh;">
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                        default-active="2" text-color="#fff"  @select="handleSelect">

                        <!-- <el-menu-item index="1">
                            <el-icon><icon-menu /></el-icon>
                            <span>人员管理</span>
                        </el-menu-item> -->
                        <!-- <el-menu-item index="2">
                            <el-icon><icon-menu /></el-icon>
                            <span>公司管理</span>
                        </el-menu-item> -->
                        <el-menu-item index="3">
                            <el-icon>
                                <document />
                            </el-icon>
                            <span>公告管理</span>
                        </el-menu-item>
                        <!-- <el-menu-item index="4">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>岗位类型管理</span>
                        </el-menu-item> -->
                    </el-menu>
                </div>

            </el-col>
            <el-col :span="8">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>


</template>

<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const activeIndex = ref('1')
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key)
    if(key==='1'){
        router.push('/admin')
    }else if(key==='2'){
        router.push('/admin')
    }else if(key==='3'){
        router.push('/admin/notice')
    }else if(key==='4'){
        router.push('/admin/postType')
    }
}
</script>