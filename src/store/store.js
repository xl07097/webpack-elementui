import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{ // 状态树
        count: 1
    },
    getters:{

    },
    actions:{ // 同步

    },
    mutations:{ // 异步

    },
    modules:{ // 模块化
        user:{
            state:{
                userCount: 10
            },
            mutations:{
                add(state){
                    state.userCount++
                }
            }
        }
    }
})