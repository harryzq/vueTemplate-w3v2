<template>
  <div id="app" :data-lang="lang">
    <template  v-if="isDataLoad">
      <transition  :name="transitionName">
        <router-view></router-view>
      </transition>
    </template>
  </div>
</template>

<script>
import ga from '@/utils/ga'
import utils from '@/utils/common.js'
import lay from './pages/layout'
export default {
name: 'App',
 watch: {
    isDataLoad(){
      console.log('====全局配置数据====')
      console.log(this.globalConfig)
    },
     //监听路由变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态，默认上下
      if(!to.meta || !to.meta.index ||!from.meta || !from.meta.index || to.meta.index.toString().indexOf('-')>-1 || from.meta.index.toString().indexOf('-')>-1 ){
        this.transitionName = '';
      }else{
        if(to.meta.index > from.meta.index){
          //设置动画名称
            this.transitionName = 'slide-top';
          }else{
            this.transitionName = 'slide-bottom';
          }
      }
    }
  },
  data(){
    return{
      transitionName:'slide-bottom',
      isDataLoad:null,
    }
  },
  created(){
  },
  computed:{
    // 获取语言和token
    lang () {
      return this.$route.query.lang || window.sessionStorage.getItem('Lang') || utils.getLang()
    },
    accessToken () {
      return this.$route.query.access_token || window.sessionStorage.getItem('AccessToken') || ''
    },
  },
  mounted(){
    // 配置和用户初始化
    ga.sendThis(this)
    ga.gaConfig(this.accessToken,this.lang)
  }
};
</script>
<style lang="scss" scoped>
</style>

