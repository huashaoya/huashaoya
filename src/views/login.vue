<template>
  <div class="body">
    <!-- 背景 -->
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <!-- 标题 -->
      <h1 class="headline-text">-IT人才招聘-boss直聘</h1>
      <!-- 中间栏背景 -->
      <div class="intermediate-format">
        <!-- 左侧背景 -->
        <div class="format-left">
          <img src="/images/bg-center.png" alt="">
        </div>
        <!-- 登陆注册界面 -->
        <div class="contain mx-auto">
          <div class="container" :class="{ active: isActive }">

            <div class="container-font">
              <div class="contain-center">
                <h1>请登陆</h1>
                <form>
                  <div class="form-control">
                    <input type="text" required name="username" id="username" v-model="username">
                    <label>账号：</label>
                  </div>

                  <div class="form-control">
                    <input type="password" required name="password" id="password" v-model="password">
                    <label>密码：</label>
                  </div>

                  <el-select v-model="type" placeholder="账户类型" style="width: 220px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                  <div style="height: 10px;"></div>
                  <button class="btn" id="login" @click.prevent="login">登录</button>

                  <p class="text">还没有账号?
                    <span class="turning" @click="pageTurning">立即注册</span>
                  </p>
                </form>
              </div>
            </div>

            <div class="container-back">
              <div class="contain-center">
                <h1>注册表</h1>
                <form>
                  <div class="form-control">
                    <input type="text" required v-model="username_register">
                    <label>账号：</label>
                  </div>
                  <div class="form-control">
                    <input type="password" required v-model="password_1">
                    <label>密码：</label>
                  </div>
                  <div class="form-control">
                    <input type="password" required v-model="password_2">
                    <label>再次输入密码：</label>
                  </div>
                  <el-select v-model="type" placeholder="账户类型" size="large" style="width: 240px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                  <div style="height: 10px;"></div>
                  <button class="btn" id="reguser" @click.prevent="register">注册</button>
                  <p class="text">已有账号?
                    <span class="turning" @click="pageTurning">立即登录</span>
                  </p>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { http } from '@/utils/http'
import { ElNotification } from 'element-plus'

export default {
  data() {
    return {
      username: null,
      password: null,
      isActive: false,
      username_register: null,
      password_1: null,
      password_2: null,
      nickname: null,
      type: '个人',
      options: [
        {
          value: '个人',
          label: '个人',
        },
        {
          value: '公司',
          label: '公司'
        }
      ]
    }
  },
  mounted() {
    // 标题跳动
    const labels = document.querySelectorAll('.form-control label')
    labels.forEach(label => {
      label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
    })
  },
  methods: {
    pageTurning() {
      if (this.isActive) {
        this.isActive = false
      } else {
        this.isActive = true
      }
    },

    login() {
      let url = ''
      if (this.type === "个人") {
        url = "/user/login"
      } else {
        url = "/company/login"
      }
      // 请求登录接口
      http({
        method: 'get',
        url,
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        params: {
          name: this.username,
          password: this.password,
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.data.status === 0) { // 登录成功
          ElNotification({
            title: 'Success',
            message: '登录成功,欢迎访问',
            type: 'success'
          })
         
          if (this.type === "个人") {
            this.$router.push('/user/')
            window.localStorage.setItem('type', '个人')
            window.localStorage.setItem('token', res.data.data.token)
          } else {
            this.$router.push('/company/')
            window.localStorage.setItem('type', '公司')
            window.localStorage.setItem('token_admin', res.data.data.token)
          }
          
        } else {
          ElNotification({
            title: 'warning',
            message: res.data.data.msg,
            type: 'warning'
          })
        }
      })
    },
    // 注册接口
    register() {
      // 校验完整性
      if (this.password_1 == null || this.password_2 == null) {
        ElNotification({
          title: 'warning',
          message: '密码不能为空',
          type: 'warning'
        })
      } else if (this.password_1 !== this.password_2) {
        ElNotification({
          title: 'warning',
          message: '两次输入密码不一致',
          type: 'warning'
        })
      } else {
        let url = ''
        if (this.type === "个人") {
          url = "/user/register"
        } else {
          url = "/company/register"
        }
        http({
          method: 'post',
          url,
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            name: this.username_register,
            password: this.password_1            
          }
        }).then(res => {
          console.log(res)
          if (res.data.data.status === 0) {
            ElNotification({
              title: 'Success',
              message: '注册成功',
              type: 'success'
            })
          } else {
            ElNotification({
              title: 'warning',
              message: res.data.data.msg,
              type: 'warning'
            })
          }
        })
      }
    }
  }
}

</script>

<style scoped>
.body {
  position: relative;
  background-color: #edf5f5;
  color: #000;
  font-family: 'Muli', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

/* 背景 */
.area {
  /* background: #4e54c8; */
  background: #176ac2;
  background: -webkit-linear-gradient(to left, #4094ee, #1c82f0);
  width: 100%;
  height: 100vh;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;

}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {

  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }

}

/* 标题效果 */
.headline-text {
  /* position: absolute;
      left: 0px;
      top: 0px; */
  /* border: #000 2px solid; */
  color: black;
  font-size: 40px;
  margin-top: 100px;
  text-transform: uppercase;
  cursor: pointer;
  text-shadow: rgb(100, 169, 212) 4px 4px 2px;
  /* background-color: #000; */
  color: white;
  text-align: center;
}

/* JS使用的css */
/* 实现字体3D效果 */
.headline-text:hover {
  text-shadow: 0 1px 0 hsl(174, 5%, 80%), 0 2px 0 hsl(174, 5%, 75%),
    0 3px 0 hsl(174, 5%, 70%), 0 4px 0 hsl(174, 5%, 66%),
    0 5px 0 hsl(174, 5%, 64%), 0 6px 0 hsl(174, 5%, 62%),
    0 7px 0 hsl(174, 5%, 61%), 0 8px 0 hsl(174, 5%, 60%),
    0 0 5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.2),
    0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.3);
}

/*
  strong {
    font-size: 200px;
  } */

.area .intermediate-format {
  position: relative;
  width: 1000px;
  height: 600px;
  background-color: #f3f3f3;
  margin: 15px auto;
  border-radius: 10px;
  /* overflow: hidden; */
}

.area .intermediate-format .format-left {
  height: 100%;
  width: 60%;
  border-radius: 20px;
}

.area .intermediate-format .format-left img {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}

.area .intermediate-format .contain {
  /* float: right; */
  position: absolute;
  top: 60px;
  right: 53px;
  width: 30%;
  max-width: 100%;
  height: 80%;
  margin-left: -50%;
  transition: all 0.7s linear;
  /* box-shadow: 1px 1px 1px black; */
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
}

.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 1000ms ease-out;
}

.contain:hover {
  transform: scale(1.1);
  transition: all 0.7s linear;
}

.container-font,
.container-back {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}

.container-back {
  transform: rotateY(180deg);
}

.active {
  transform: rotateY(180deg);
}

.contain-center {
  position: absolute;
  width: 100%;
  padding: 0 40px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 10px) perspective(100px);
  z-index: 20;
  display: block;
}

.container h1 {
  font-size: 24px;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 30px;
}

.container .contain-center .turning {
  color: red;
  cursor: pointer;
}

.btn {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  /* background: #000000; */
  background-color: #1c82f0;
  color: #fff;
  padding: 15px;
  font-family: inherit;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
}

.btn:focus {
  outline: 0;
}

.btn:active {
  transform: scale(0.98);
  /* transition: all 0.3s; */
}

.text {
  margin-top: 8px;
}
</style>
<style>
.form-control {
  position: relative;
  margin: 15px 0 15px;
  /* width: 400px; */
  width: 100%;
}

.form-control input {
  background-color: transparent;
  border: 0;
  /* border-bottom: 2px #fff solid; */
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: #000;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom: 1px #000 solid;
  /* border-bottom-color: #000; */
}

.contain-center .form-control label {
  position: absolute;
  top: 15px;
  left: 0;
  color: #000;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus+label span,
.form-control input:valid+label span {
  /* color: #000; */
  transform: translateY(-30px);
}
</style>