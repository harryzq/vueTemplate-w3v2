  
<template>
 <!-- 弹窗 -->
    <div v-if="isShow == true">
        <div class="dialog outter-dialog common-dialog fadeInUp animated " >
          <div class="team-detail-warp">
            <i @click="isShow=false" class="icon-cross" v-if="isCloseable == true"></i>
             <div class="team-member-title"></div>
             <div class="team-member-warp tip-content">
               {{content}}
             </div>
          </div>
        </div>
        <div class="mask rule-mask"></div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow:false,
        content:'NetWork Error',
        isCloseable:true
      };
    }
  };
</script>
<style lang="scss" scoped>
.toast-bg{
    opacity: .7;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 50;
    background-color: rgba(0, 0, 0, 0.95);
    top: 0;
    left: 0;
}
.toast-container{
    width: 100vw;
    height: 100vh;
}
.toast-main{
    position: absolute;
    top: 50%;
    left: 50%;
}
.gaToast-leave-to{
    opacity: 0;
}
.gaToast-leave{
    opacity: 1;
}
.gaToast-leave-active{
     transition: all .5s ease
}
.mask{
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	position: absolute;
	background-color: #000;
	opacity: 0.8;
	z-index: 100;
}
.rule-mask{
	z-index: 97;
	// height: px2vh(644px);
	height: 100%;
	top: auto;
	bottom: 0;
}
.loading-mask{
	z-index: 100;
}
.tip-content{
  color: #fff;
  text-align: center;
  margin-top: px2vh(80px);
  min-height: px2vh(200px);
  justify-content: center;
  align-items: center;
  font-family: 'Kensmark-03-Regular';
  @include res-size(
    $font-size:36px,
  )
}
</style>