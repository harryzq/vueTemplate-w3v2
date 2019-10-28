import Vue from 'vue'
import LoadingComponent from './loading.vue'

const Loading = {}
let showLoading = false // 存储loading显示状态
let loadingNode = null // 存储loading节点元素
const LoadingConstructor = Vue.extend(LoadingComponent)

Loading.install = function (Vue) {
  Vue.prototype.$wsLoading = function (content, type) {
    if (type === 'show') {
      // 如果loading还在，则不再执行
      if (showLoading) return;
      loadingNode = new LoadingConstructor({
        data(){
          return {
            isShowLoading: showLoading,
            content: content
          }
        }
      })
      loadingNode.$mount() // 挂在实例，为了获取下面的loadingNode.$el
      document.body.appendChild(loadingNode.$el)
      loadingNode.isShowLoading = showLoading = true
    } else {
      if(loadingNode){
        loadingNode.isShowLoading = showLoading = false
      }
    }
  };

  ['show', 'hide'].forEach(function (type) {
    Vue.prototype.$wsLoading[type] = function (tips) {
      return Vue.prototype.$wsLoading(tips, type)
    }
  })
}

export default Loading