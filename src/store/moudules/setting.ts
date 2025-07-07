//小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia'
import {ref} from 'vue'
const useLayOutSettingStore = defineStore('SettingStore', ()=> {
  // state: () => {
  //   return {
  //     fold: false, //用户控制菜单折叠还是收起控制
  //     refsh: false, //仓库这个属性用于控制刷新效果
  //   }
  // },
  let fold = ref<boolean>(false); //用户控制菜单折叠还是收起控制
  let refresh = ref<boolean>(false); //仓库这个属性用于控制刷新效果


  return {
    fold,
    refresh
  }
})

export default useLayOutSettingStore
