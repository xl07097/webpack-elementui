# vue

1. vue 生命周期
   new Vue() 新建Vue实例
   初始化 事件，声明周期
   调用beforeCreate()
   初始化注入，校验
   调用 created()
   判断是否指定el选项，是）
                      否）当调用vm.$mount(el)判断

        模板 是否指定tempalte模板，  是）把模板编译到render函数，
                                    否）把el外部的html作为模板编译
    调用beforeMount()
    创建 vm.$el.替换 "el"
    调用 mounted(), 挂载完成

    data被修改时，调用beforeUpdate()
    虚拟dom重新渲染，并更新应用，调用updated

    当调用vm.$destroy()
    调用beforeDestroy()
    解除绑定，销毁子组件及事件监听器
    销毁完成，调用，destroyed()
