
/**
 * 模块化 store
 * system
 * 仅作学习使用
 */


export default {
    state: {
        userCount: 10
    },
    mutations: {
        add(state) {
            state.userCount++
        }
    }
}
