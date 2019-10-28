import Vue from 'vue'
import TipComponent from './index.vue'

const Tip = {}
let showTip = false // 存储loading显示状态
let loadingNode = null // 存储loading节点元素
const TipConstructor = Vue.extend(TipComponent)

Tip.install = function (Vue) {
  Vue.prototype.$wsTip = function (content, show, isCloseable,cusContent) {
    content = this.globalConfig && this.globalConfig.configData.translation[content]? this.globalConfig.configData.translation[content]:"Network connection error, please try again later";
    if(cusContent){
      content = cusContent
    }
    if (show) {
      // 如果loading还在，则不再执行
      if (showTip) return;
      loadingNode = new TipConstructor({
        data(){
          return {
            isShow: showTip,
            content: content,
            isCloseable: isCloseable
          }
        }
      })
      loadingNode.$mount() // 挂在实例，为了获取下面的loadingNode.$el
      document.body.appendChild(loadingNode.$el)
      loadingNode.isShow = showTip = true
    } else {
      if(loadingNode){
        loadingNode.isShow = showTip = false
      }
    }
  };
}

export default Tip