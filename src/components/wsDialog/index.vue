<template>
 <!-- 弹窗 -->
    <div v-if="show == true">
        <div class="dialog outter-dialog common-dialog fadeInUp animated " >
          <slot name="content"></slot>
        </div>
        <div class="mask rule-mask " ></div>
    </div>
        
</template>
<script>
export default {
    name: 'wsDialog',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        closeAfterContent:{
            type: Boolean,
            default: false
        },
        beforeClose:Function
    },
    data(){
        return{
            hideAfterContent:true
        }
    },
    methods: {
        handleClose() {
            if(!this.closeAfterContent){
                 if(typeof this.beforeClose === 'function'){
                this.beforeClose(this.hide)
                }else{
                    this.hide()
                }
            }else{
                this.hide()
            }
        },
        // 点击遮罩关闭
        hide(){
            this.$emit('update:show',false)
        }
    }
}
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
</style>