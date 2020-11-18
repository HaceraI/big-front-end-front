import {
  localize
} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN.json';

// Install zh_CN localizations.
localize({
  zh_CN: {
    messages: {
      ...zh_CN.messages,
      // 重置【required】
      required: '请输入{_field_}'
    },
    names: {
      userName: '用户名',
      password: '密码',
      rePassword: '密码',
      captcha: '验证码',
      userNick: '昵称'
    },
    fields: {
      password: {
        min: "{_field_}长度不符合要求"
      },
      rePassword: {
        confirmed: "两次密码不一致，请检查"
      }
    }
  }
});