<template>
  <div class="number-input-warp">
    <slot name="left"></slot>
    <span @click="decrease" class="number-decrease">-</span>
    <input :disabled="disabled" type="number" v-model="defaultVal" @keyup="changeInput" />
    <span @click="increase" class="number-increase">+</span>
    <span @click="fillMaxs" class="number-max">{{translation.WORLDCUP_STORE_REDEEM_NUM_MAX||'MAX'}}</span>
    <slot name="right"></slot>
  </div>
</template>

<script>
import { isNull } from "../../utils/validate";
export default {
  name: "wsNumberInput",
  data() {
    return {
      defaultVal: this.value,
      translation:[]
    };
  },
  model: {
    prop: "value", //绑定的值，通过父组件传递
    event: "update" //自定义
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    fillMax: {
      type: Number,
      default: null
    }
  },
   created(){
    if(this.globalConfig){
      this.translation = this.globalConfig.configData.translation
    }
  },
  methods: {
    updateVal() {
      this.$emit("update", this.defaultVal);
    },
    // 输入框改变
    changeInput(e) {
      let timer = null;
      let inputVal = e.target.value;
      timer = setTimeout(() => {
        // 负数
        if (!isNull(this.min) && this.min.toString()) {
          if (inputVal.toString().indexOf("-") > -1) {
            this.defaultVal = 0;
            this.updateVal();
            clearTimeout(timer);
            timer = null;
            return;
          }
        }
        // 小了
        if (!isNull(this.min) && this.min.toString() && inputVal < this.min) {
          this.defaultVal = this.min;
          this.updateVal();
          clearTimeout(timer);
          timer = null;
          return;
        }
        // 大了
        if (!isNull(this.max) && this.max.toString() && inputVal > this.max) {
          this.defaultVal = this.max;
          this.updateVal();
          clearTimeout(timer);
          timer = null;
          return;
        }
      }, 100);
    },
    // 减
    decrease() {
      // null 不校验
      if (
        !isNull(this.min) &&
        this.min.toString() &&
        this.defaultVal - 1 < this.min
      )
        return;
      this.defaultVal -= 1;
      this.updateVal();
    },
    // 加
    increase() {
      if (
        !isNull(this.max) &&
        this.max.toString() &&
        this.defaultVal + 1 > this.max
      )
        return;
      this.defaultVal += 1;
      this.updateVal();
    },
    fillMaxs() {
      this.defaultVal = this.fillMax;
      this.updateVal();
    }
  }
};
</script>
<style lang="scss" scoped>
.number-input-warp {
    font-family: 'Bahnschrift';
    display: flex;
    align-items: center;
    @include res-size(
            // $height: 60px,
            // $line-height: 60px,
      );
  input{
      text-align: center;
      @include res-size(
            $width: 97px,
            $height: 40px,
            $line-height: 44px,
            $font-size: 47px,
            $margin-left:7px,
            $margin-right:7px
      )
  }
  .number-decrease,.number-increase{
      display: inline-block;
      background-color: #979797;
      text-align: center;
      @include res-size(
            $width: 45px,
            $height: 44px,
            $line-height: 44px,
            $border-radius: 5px,
      )
  }
  .number-max{
      display: inline-block;
      background-color: #979797;
      @include res-size(
        $height: 44px,
        $margin-left:11px,
        $font-size: 30px,
        $line-height: 44px,
        $border-radius: 5px,
        $padding-left:10px,
        $padding-right:10px,
      )
        
  }
}
</style>
