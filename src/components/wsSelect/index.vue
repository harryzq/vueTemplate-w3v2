<template>
  <div class="round-check">
    <div class="round-select">
      <div class="drop-down">
        <span class="drop-down-warp" @click="show = !show">
          <span :class="{'title-chosen':show}">{{defaultSelect.name || label}}</span>
          <i :class="{'shape-up':show}" class="shape-down"></i>
        </span>
      </div>
      <ul  class="drop-down-content" :class="{'drop-down-content-show':show}" >
        <li v-for="(item,index) in selectOption"
            @click.stop="selectItem(item,index)"
            :name='item.name' 
            :value="item.value || ''"
            :key="index">
          <span
          :class="{'selected':(defaultSelect.value === item.value)}"
          >{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "wsSelect",
  props:{
      selectOption:Array,
      label:{
        type:String,
        default:"SELECT"
      },
      selectedItem:{
        type:Object,
        default:{}
      },
      cb:{
        type:Function,
        default:()=>{}
      }
  },
  data() {
    return {
      show: false,
      defaultSelect:this.selectedItem || {},
    };
  },
  methods: {
    selectItem(item,index) {
      if(!this.show) return;
      this.defaultSelect = item
      this.$emit('update:selectedItem',item)
      this.cb(item)
      this.show = false
    }
  }
};
</script>
<style lang="scss" scoped>
.round-check {
  @include res-size(
    $font-size:24px
  );
  .title-chosen{
        color: #ffa400;
    }
  .round-select {
    text-align: center;
    .drop-down {
      width: px2vw(147px);
    }
    ul {
      // overflow-y: auto;
    }
    li span{
      width: px2vw(147px);
      height: px2vh(40px);
      display: block;
      text-decoration: none;
      text-align: center;
      line-height: px2vh(40px);
      color: #333;
      background-color: #fff;
    }
     .selected{
        background-color: #dbdbdb;
      }
    .drop-down-content {
      opacity: 0;
      height: 0;
      transition: all 0.3s ease;
      margin-top: px2vh(7px);
    }
    .drop-down-content-show {
      opacity: 1;
      height: 50vh;
    }
  }
  .drop-down-warp{
      position: relative;
  }
  .shape-down {
    position:absolute;
    width: 0;
    height: 0;
    border: px2vw(9px) solid transparent;
    border-top: px2vw(8px) solid #ddd;
    top: 30%;
    right: px2vw(-30px);
  }
  .shape-up{
    border-bottom: px2vw(8px) solid #ffa400;
      border-top: none;
      
  }
    ::-webkit-scrollbar:vertical {
    width: 1px;
  }
  
  ::-webkit-scrollbar:horizontal {
    height: 0px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #696969;
    border-radius: 1vw;
    border: 0px solid #ffffff;
  }
  
  ::-webkit-scrollbar-track {
    border-radius: 1vw;
    background-color: rgba(255, 255, 255, 0.05);
  }
}
</style>