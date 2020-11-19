<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link :to="{ name: 'login' }">登入</router-link></li>
          <li class="layui-this">注册</li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <ValidationObserver ref="form">
                <form method="post">
                  <ValidationProvider
                    name="userName"
                    rules="required|userAccount"
                    v-slot="{ errors }"
                  >
                    <div class="layui-form-item">
                      <div class="layui-row">
                        <label for="L_email" class="layui-form-label"
                          >用户名</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            id="L_email"
                            name="userAccount"
                            v-model="userAccount"
                            :class="{ 'validate-err-input': errors[0] }"
                            placeholder="请输入用户名"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">
                          将会成为您唯一的登入名
                        </div>
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
                  <ValidationProvider
                    name="userNick"
                    rules="required|min:4"
                    v-slot="{ errors }"
                  >
                    <div class="layui-form-item">
                      <div class="layui-row">
                        <label for="L_username" class="layui-form-label"
                          >昵称</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            id="L_username"
                            name="userName"
                            v-model="userName"
                            :class="{ 'validate-err-input': errors[0] }"
                            placeholder="请输入昵称"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
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
                  <ValidationProvider
                    name="password"
                    rules="required|min:6|max:16"
                    vid="confirmPassword"
                    v-slot="{ errors }"
                  >
                    <div class="layui-form-item">
                      <div class="layui-row">
                        <label for="L_pass" class="layui-form-label"
                          >密 码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            id="L_pass"
                            name="password"
                            v-model="password"
                            :class="{ 'validate-err-input': errors[0] }"
                            placeholder="请输入密码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">
                          6到16个字符
                        </div>
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
                  <ValidationProvider
                    name="rePassword"
                    rules="required|min:6|max:16|confirmed:confirmPassword"
                    v-slot="{ errors }"
                  >
                    <div class="layui-form-item">
                      <div class="layui-row">
                        <label for="L_repass" class="layui-form-label"
                          >确认密码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            id="L_repass"
                            name="repassword"
                            v-model="repassword"
                            :class="{ 'validate-err-input': errors[0] }"
                            placeholder="请输入密码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
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
                            v-model="captcha"
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
                    <button class="layui-btn">立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
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
import { required, min, length, max, confirmed } from "vee-validate/dist/rules";
import { getCaptcha } from "@/api/login";

extend("required", {
  ...required,
});
extend("min", {
  ...min,
});
extend("max", {
  ...max,
});
extend("confirmed", {
  ...confirmed,
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
  name: "reg",
  data() {
    return {
      userAccount: "",
      userName: "",
      password: "",
      repassword: "",
      captcha: "",
      svg: "",
    };
  },
  mounted() {
    this._getCapthcha();
  },
  methods: {
    /**
     * 获取图片验证码
     */
    _getCapthcha() {
      getCaptcha().then((res) => {
        if (res.code === 200) {
          this.svg = res.data;
        }
      });
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