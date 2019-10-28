import Vue from 'vue'
import Toast from './index.vue'

const Tip = {}
let showTip = false // 存储loading显示状态
let node = null // 存储loading节点元素
const ToastConstructor = Vue.extend(Toast)

Tip.install = function (Vue) {
  Vue.prototype.$wsToast = function (content, show, delayClose) {
    if (show) {
      // 如果还在，则不再执行
      if (showTip) return;
      node = new ToastConstructor({
        data(){
          return {
            isShow: showTip,
            content: content,
            delayClose:delayClose
          }
        }
      })
      node.$mount() // 挂在实例，为了获取下面的loadingNode.$el
      document.body.appendChild(node.$el)
      node.isShow = showTip = true
      let timer = null
      if(delayClose&&delayClose>0){
        timer = setTimeout(() => {
            node.isShow = showTip = false
            clearTimeout(timer)
            timer = null
        }, delayClose);
      }
    } else {
      if(node){
        node.isShow = showTip = false
      }
    }
  };
}

export default Tip