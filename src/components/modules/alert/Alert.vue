<template>
  <div v-show="isShow">
    <div class="alert">
      <div class="msg flex">{{msg}}</div>
      <div v-if="type === 'alert'">
        <div class="btnCommon success" @click="close()">确 定</div>
      </div>
      <div v-if="type === 'confirm'" class="space-round">
        <div class="btnCommon cancel" @click="cancelEvent()">取 消</div>
        <div class="btnCommon success" @click="successEvent()">确 定</div>
      </div>
    </div>
    <div class="mask" @click="closeMask()"></div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    type: {
      type: String,
      default: 'alert'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: ''
    },
    success: {
      type: Function,
      default: () => {
        // Don't do anything?
        console.log("点击了确定")
      }
    },
    cancel: {
      type: Function,
      default: () => {
        // Don't do anything?
        console.log("点击了取消")
      }
    }
  },
  methods: {
    close() {
      this.isShow = false;
    },
    closeMask() {
      if (this.type === 'alert') {
        this.close();
      }
    },
    cancelEvent() {
      this.cancel();
      this.close();
    },
    successEvent() {
      this.success();
      this.close();
    }
  }
}
</script>

<style lang="scss" scoped>
$btn-main: #009688;
$btn-dask: darken($btn-main, 5%);

$btn-cancel: #EDEDED;
$btn-cancel-dask: darken($btn-cancel, 5%);

.alert {
  width: 300px;
  height: 150px;
  background-color: #ffffff;
  left: 50%;
  top: 50%;
  z-index: 3000;
  position: fixed;
  border-radius: 6px;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px 10px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center ;
  align-items: center;
}

.flex {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.space-round {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0;
}

.btnCommon {
  width: 105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 6px;
  cursor: pointer;
  &.success {
    color: #ffffff;
    background-color: $btn-main;
    &:hover {
      background-color: $btn-dask;
    }
  }
  &.cancel {
    background-color: $btn-cancel;
    color: #333333;
    &:hover {
      background-color: $btn-cancel-dask;
    }
  }
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 2999;
}
</style>