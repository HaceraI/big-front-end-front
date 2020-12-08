import AlertComponent from "@/components/modules/alert/Alert";

const Alert = {}

Alert.install = (Vue) => {
    const AlertConstructor = Vue.extend(AlertComponent);
    const instance = new AlertConstructor();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);

    // 4. 添加实例方法
    Vue.prototype.$alert = (msg, success) => {
        // 逻辑...
        instance.msg = msg;
        instance.isShow = true;
        instance.type = "alert";
        if (success) {
            instance.success = success;
        }
    }

    Vue.prototype.$confirm = (msg, success, cancel) => {
        // 逻辑...
        instance.msg = msg;
        instance.isShow = true;
        instance.type = "confirm";
        if (success) {
            instance.success = success;
        }
        if (cancel) {
            instance.cancel = cancel;
        }
    }
}

export default Alert;