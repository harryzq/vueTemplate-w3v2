  
<template>
  <div class="ga-loading" v-if="isShowLoading">
     <div class="mask rule-mask loading-mask"></div>
      <img :src="loadingIcon"/>
    <div>{{content}}</div>
  </div>
</template>

<script>
import loading_icon from 'assets/images/loading.svg'
  export default {
    data() {
      return {
        loadingIcon:loading_icon,
        isShowLoading:false,
        content:''
      };
    }
  };
</script>
<style lang="scss">
.ga-loading{
    width: 100%;
    height:  100%;;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    img{
      width: 20vh;
      height: 20vh;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -10vh;
      margin-top: -10vh;
      z-index: 999;
    }
}
</style>