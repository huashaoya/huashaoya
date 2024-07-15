<template>
    <div class="box">
        <div class="image">
            <div class="item">
                <el-upload class="avatar-uploader" :show-file-list="false" action="http://127.0.0.1:8081/api/upload"
                    :on-change="onChange"  :data="uploadData" :auto-upload="false" :on-success="success" :limit="1" ref="uploadRef"
                    :on-exceed="handleExceed">
                    <el-image v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 300px; height: 300px"
                        fit="contain" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
                <dv-decoration-7 class="desc">
                    <el-button type="primary" @click="submitUpload" :disabled="disabled" text>开始上传</el-button>
                </dv-decoration-7>

            </div>
        </div>
        <el-image :src="resume" class="avatar" style="width: 400px; height: 600px"
        fit="contain" />
    </div>
</template>

<script setup>
import { Plus, Picture as IconPicture } from '@element-plus/icons-vue'
// import http from '@/utils/judge'
import { onMounted, ref } from 'vue'
import { genFileId } from 'element-plus'

const postType = ref([])

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
onMounted(()=>{
    getAllPostType()
})
</script>

<script>
import { http } from '@/utils/http'

const uploadRef = ref()

const handleExceed = (files) => {
    uploadRef.value.clearFiles()
    const file = files[0]
    file.uid = genFileId()
    uploadRef.value.handleStart(file)
}



export default {
    data() {
        return {
            imageUrl: '',
            disabled: false,
            uploadData: { userId: 1 }, 
            resume:''
        }
    },
    mounted(){
        console.log(666)
        this.getInfo()
    },
    methods: {
        success(res) {
            console.log(res)
            this.getInfo()
        },
        onChange(event) {
            // console.log(event)
            let URL = null
            if (window.createObjectURL !== undefined) {
                // basic
                URL = window.createObjectURL(event.raw)
            } else if (window.URL !== undefined) {
                // mozilla(firefox)
                URL = window.URL.createObjectURL(event.raw)
            } else if (window.webkitURL !== undefined) {
                // webkit or chrome
                URL = window.webkitURL.createObjectURL(event.raw)
            }
            // 转换后的地址为 blob:http://xxx/7bf54338-74bb-47b9-9a7f-7a7093c716b5
            this.imageUrl = URL
            if (event.percentage === 0) {
            }
        },
        submitUpload() {
            this.$refs.uploadRef.submit()
        },
        getInfo() {
            const token = window.localStorage.getItem('token')
            http({
                headers: {
                    'Authorization': token,
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'get',
                url: '/user/getInfo',
            }).then(res => {
                console.log(res.data.data.data[0])
                window.localStorage.setItem("id",res.data.data.data[0].id)
                this.uploadData.userId=res.data.data.data[0].id
                this.resume=res.data.data.data[0].resume
            })
        } 
    }
}
</script>
<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;

    .image {
        width: 40%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        border-radius: 20px;

        .item {
            width: 50%;
            // margin:2%;
            height: 50%;
            background-color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;

            .desc {
                width: 150px;
                height: 30px;
                margin-top: 10px;
                padding: 0 5px;
                color: #339999;
                font-size: 18px;
                font-weight: 600;
            }
        }
    }

    .info {
        width: 28%;
        height: 98%;
        margin: 1%;
        // background-color: rgba(0, 0, 0, 0.391);
        color: white;
        text-align: start;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        .item {
            margin: 2%;
            width: 96%;
            height: 46%;
            background-color: #0f132598;
            padding: 10px;

            .title {
                display: flex;
                margin: 10px;
                color: #339999;
                font-size: 20px;
                line-height: 36px;
                font-weight: 600;
                justify-content: space-between;
            }

            ul {
                display: block;
                height: calc(100% - 44px);
                overflow: auto;

                li {
                    margin: 8px;
                }
            }

        }
    }
}

.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #2c3147;
    color: rgb(255, 255, 255);
    font-size: 30px;
}

.image-slot .el-icon {
    font-size: 30px;
}
</style>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #000000;
    width: 300px !important;
    height: 300px;
    text-align: center;
    background-color: #339999;
}
</style>
