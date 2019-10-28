<template>
  <div class="ws-history" v-if="visiable">
    <div class="dialog outter-dialog common-dialog fadeInUp animated">
      <div class="warp">
        <!-- 关闭 -->
        <i @click="close" class="icon-cross"></i>
        
        <div class="title">
          <!-- 选择轮数 -->
          <ws-select
            class="select-items"
            v-if="needSelect"
            :selectedItem.sync="selectedItem"
            :selectOption="selectOption"
            :label.sync="label"
            :cb="callback"
          ></ws-select>
          {{title}}</div>
        <div class="items">
          <!-- 列表元素class必须为item才能有间隔颜色 -->
          <slot name="historyItem"></slot>
        </div>
      </div>
    </div>
    <div class="mask rule-mask"></div>
  </div>
</template>

<script>
export default {
  name: "wsHistory",
  props: {
    title: {
      type: String,
      default: ""
    },
    visiable: {
      type: Boolean,
      default: false
    },
    needSelect: {
      type: Boolean,
      default: false
    },
    selectOption: Array,
    label: {
      type: String,
      default: ""
    },
    cb: Function
  },
  data() {
    return {
      selectedItem: null
    };
  },
  methods: {
    close() {
      this.$emit("update:visiable", false);
    },
    callback(item) {
      this.cb(item);
    }
  }
};
</script>
<style lang="scss" scoped>
.ws-history {
  .warp {
    min-width: px2vw(776px);
    min-height: px2vh(492px);
    max-height: 80%;
    overflow: auto;
    max-width: 98vw;
    background-color: #3b3b3b;
    padding: px2vh(57px);
    position: relative;
    .icon-cross {
      position: absolute;
      background: url("../../assets/images/cross.png") no-repeat;
      background-size: px2vw(33px);
      width: px2vw(33px);
      height: px2vw(33px);
      top: px2vh(14px);
      left: px2vw(16px);
    }
    .title {
      max-width: px2vw(776px);
      word-break: break-all;
      font-family: "Kensmark-03-Black";
      margin-bottom: px2vh(23px);
      position: relative;
      @include res-size($font-size: 52px);
        .select-items{
            font-family: 'Bahnschrift';
            z-index: 10;
            position: absolute;
            right: px2vw(-20px);
            bottom: 0;
            height: px2vh(5px);
        }
    }
    .items {
      max-height: px2vh(492px);
      @include res-size($font-size: 31px);
      & .item:nth-child(even) {
        background-color: #979797;
      }
      & .item:nth-child(odd) {
        background-color: #b5b5b5;
      }
      overflow: auto;
      .item {
        height: px2vh(96px);
        padding: px2vh(15px) px2vw(21px);
        line-height: px2vh(96px);
      }
    }
    ::-webkit-scrollbar {
      width: px2vw(16px);
      background-color: #6d6d6d;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #fff;
      height: px2vh(86px);
      border-radius: 0;
    }
  }
}
</style>