<template>
<div v-if="isShow">
    <div class="ws-toast" >
        <span>
             {{content}}
        </span>
    </div>
     <div class="mask rule-mask"></div>
</div>

</template>

<script>
export default {
    name:'wsToast',
    data(){
        return{
            isShow:false,
            content:'NetWork Error',
            delayClose:null
        }
    }
}
</script>
<style lang="scss" scoped>
.ws-toast{
    // background-color: #3b3b3b;
    // padding: px2vh(6px) px2vw(6px);
    position: fixed;
    top: 50%;
    left: 50%;
    color: #fff;
    z-index: 34;
    margin-left: px2vw(-444px);
    margin-top: px2vw(-32px);
    text-align: center;
	width: px2vw(889px);
    height: px2vh(64px);
    line-height: px2vh(64px);
    background: linear-gradient(
        to right,#16122d,#3f280d, 
        #3f280d, #16122d
        );
	background-blend-mode: normal, 
        normal;
    opacity:0.85;
    span{
        font-family: 'Bahnschrift-Condensed';
        opacity:1;
        @include res-size(
            $font-size: 36px
        );
        color: #f7d494;
    }
}
</style>