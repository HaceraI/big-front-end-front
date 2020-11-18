<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link :to="{ name: 'login' }">登入</router-link></li>
          <li class="layui-this">找回密码<!--重置密码--></li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <div class="layui-tab-item layui-show">
            <!-- 重置密码 -->
            <!--
            <div class="fly-msg">{{d.username}}，请重置您的密码</div>
            <div class="layui-form layui-form-pane"  style="margin-top: 30px;">
              <form action="/user/repass" method="post">
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <input type="password" id="L_pass" name="pass" required lay-verify="required" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                </div>
                <div class="layui-form-item">
                  <label for="L_repass" class="layui-form-label">确认密码</label>
                  <div class="layui-input-inline">
                    <input type="password" id="L_repass" name="repass" required lay-verify="required" autocomplete="off" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">人类验证</label>
                  <div class="layui-input-inline">
                    <input type="text" id="L_vercode" name="vercode" required lay-verify="required" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{d.vercode}}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <input type="hidden" name="username" value="{{d.username}}">
                  <input type="hidden" name="email" value="{{d.email}}">
                  <button class="layui-btn" alert="1" lay-filter="*" lay-submit>提交</button>
                </div>
              </form>
            </div>


            <div class="fly-error">该重置密码链接已失效，请重新校验您的信息</div>
            <div class="fly-error">非法链接，请重新校验您的信息</div>
            -->

            <div class="layui-form layui-form-pane">
              <ValidationObserver>
                <form method="post">
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
                          name="userAccount"
                          v-model="userAccount"
                          placeholder="请输入用户名"
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
                  <ValidationProvider
                    name="captcha"
                    rules="required|length:5"
                    v-slot="{ errors }"
                  >
                    <div class="layui-form-item">
                      <label for="L_vercode" class="layui-form-label"
                        >验证码</label
                      >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          id="L_vercode"
                          name="vercode"
                          v-model="captcha"
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
                    <button class="layui-btn" alert="1">提交</button>
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
import { required, length } from "vee-validate/dist/rules";
import { getCaptcha } from "@/api/login";

extend("required", {
  ...required,
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
  name: "forget",
  data() {
    return {
      userAccount: "",
      captcha: "",
      svg: "",
    };
  },
  mounted() {
    this._getCaptcha();
  },
  methods: {
    /**
     * 获取图形验证码
     */
    _getCaptcha() {
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