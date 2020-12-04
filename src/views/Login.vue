<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li><router-link :to="{ name: 'reg' }">注册</router-link></li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <ValidationObserver ref="loginForm" v-slot="{ handleSubmit }">
                <form method="post" @submit.prevent="handleSubmit(login)">
                  <!-- 用户名 -->
                  <ValidationProvider
                    name="userName"
                    rules="required|userAccount"
                    v-slot="{ errors }"
                  >
                    <div class="layui-form-item">
                      <label for="L_email" class="layui-form-label"
                        >用户名</label
                      >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          id="L_email"
                          name="name"
                          v-model="name"
                          placeholder="请输入用户名"
                          :class="{ 'validate-err-input': errors[0] }"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <transition name="fade">
                        <div
                          class="layui-form-mid validate-err-msg"
                          v-if="errors.length !== 0"
                        >
                          {{ errors[0] }}
                        </div>
                      </transition>
                    </div>
                  </ValidationProvider>

                  <!-- 密码 -->
                  <ValidationProvider
                    name="password"
                    rules="required|min:6"
                    v-slot="{ errors }"
                  >
                    <div class="layui-form-item">
                      <label for="L_pass" class="layui-form-label">密 码</label>
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          id="L_pass"
                          name="password"
                          v-model="password"
                          placeholder="请输入密码"
                          :class="{ 'validate-err-input': errors[0] }"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <transition name="fade">
                        <div
                          class="layui-form-mid validate-err-msg"
                          v-if="errors.length !== 0"
                        >
                          {{ errors[0] }}
                        </div>
                      </transition>
                    </div>
                  </ValidationProvider>

                  <!-- 验证码 -->
                  <ValidationProvider
                    name="captcha"
                    rules="required|length:5"
                    v-slot="{ errors }"
                  >
                    <div class="layui-form-item">
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label"
                          >验证码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            id="L_vercode"
                            name="vercode"
                            v-model="code"
                            :class="{ 'validate-err-input': errors[0] }"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <span
                          style="color: #c00"
                          class="captcha"
                          @click="_getCaptcha()"
                          v-html="svg"
                        ></span>
                      </div>
                      <transition name="fade">
                        <div
                          class="layui-form-mid validate-err-msg"
                          v-if="errors.length !== 0"
                        >
                          {{ errors[0] }}
                        </div>
                      </transition>
                    </div>
                  </ValidationProvider>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="submit">立即登录</button>
                    <span style="padding-left: 20px">
                      <router-link :to="{ name: 'forget' }"
                        >忘记密码？</router-link
                      >
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a
                      href=""
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href=""
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { required, min, length } from "vee-validate/dist/rules";
import { getCaptcha } from "@/api/login";
import { v4 as uuidv4 } from "uuid";

extend("required", {
  ...required,
});
extend("min", {
  ...min,
});
extend("length", {
  ...length,
});
extend("userAccount", (value) => {
  // 验证手机号或者邮箱。
  if (
    /^1[3456789]\d{9}$/.test(value) ||
    /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
  ) {
    return true;
  }
  return "请输入正确的用户名格式类型(手机号或邮箱)";
});

export default {
  name: "login",
  data() {
    return {
      svg: "",
      name: "",
      password: "",
      code: "",
    };
  },
  mounted() {
    let sid;
    if (localStorage.getItem("sid")) {
      sid = localStorage.getItem("sid");
    } else {
      sid = uuidv4();
      localStorage.setItem("sid", sid);
    }
    this.$store.commit("setSid", sid);
    console.log(sid);
    // 获取图形验证码
    this._getCaptcha();
  },
  methods: {
    /**
     * 获取图片验证码
     */
    _getCaptcha() {
      const sid = this.$store.state.sid;

      getCaptcha(sid).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.svg = res.data;
        }
      });
    },
    /**
     * 用户登录
     */
    login() {
      console.log("ewewwe");
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/** css */
#app {
  background-color: #f2f2f2;
}
.layui-container {
  background-color: #fff;
}
input {
  width: 190px;
}
.a_forget_password {
  margin-left: 15px;
  &:hover {
    color: #009688;
  }
}
.captcha {
  position: relative;
  top: -4px;
  &:hover {
    cursor: pointer;
  }
}
.validate-err-msg {
  color: red;
  //animation: validate-err-msg 5s;
  transition: opacity 0.5s;
}
.validate-err-input {
  border: red 1px solid;
}
</style>