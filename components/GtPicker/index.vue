<!--
 @author:
 @date:
 @description: 普通picker组件
-->
<template>
  <view>
    <picker mode="time" :value="valueSet" :disabled="disabled" @change="bindDateTimeChange" v-if="mode == 'time'">
      <view class="uni-input">{{valueSet ? valueSet : placeholder}}</view>
    </picker>
    <picker mode="date" :value="valueSet" :disabled="disabled" :fields="fields" @change="bindDateTimeChange" v-if="mode == 'date'">
      <view class="uni-input">{{valueSet ? valueSet : placeholder}}</view>
    </picker>
    <picker mode="selector" :value="valueSet" :disabled="disabled" :range="options" range-key="label"  @change="bindSelectChange"  v-if="mode == 'selector'">
      <view class="uni-input">{{selectorLabel}}</view>
    </picker>
    <picker mode="multiSelector" 
      :value="valueSet" 
      :disabled="disabled" 
      :range="options" 
      range-key="label"  
      @change="bindSelectChange"  
      v-if="mode == 'multiSelector'">
      <view class="uni-input">{{multiLabel}}</view>
    </picker>
  </view>	
</template>

<script>
  import utils from '@/mixin/utils'
	export default {
    name: 'gt-picker',
    props: {
      mode: {
        type: String,
        default: 'selector' // 可选值有 selector 单选择器，multiSelector 多选择器，time 时间选择器， date 日期选择器
      },
      value: {
        type: [String, Number, Array],
        default: function () {
          return ''
        }
      },     
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      options: { 
        type: Array,
        default: function () {
          return []
        }
      },
      fields: {
        type: String,
        default: 'day' // 日志选择的粒度 有效值 year,month,day 仅支持h5和小程序 https://uniapp.dcloud.io/component/picker
      }
    },	
    mixins: [utils],
    model: {
      prop: 'value',
      event: 'change'
    },
    computed: {
      selectorLabel () {
        let index = parseInt(this.valueSet)
        if (isNaN(index)) {
          return this.placeholder
        } 
        return this.options[index].label
      },
      multiLabel () {
        if (this.isArray(this.valueSet)) {
          if (this.valueSet.length === 0) {
            return this.placeholder
          }
          let str = ''
          this.valueSet.forEach( (item, index) => {
            str += this.options[index][item].label + ','
          })
          return str.slice(0, -1)
        } else {
          return this.placeholder
        }
      }
    },
    data () {
      return {
        valueSet: '',
        optionsSet: []
      }
    },
    created () {
      this.setData()
      
    },
    methods: {
      setData () {
        this.valueSet = this.value 
      },     
      bindDateTimeChange (e) {
        this.valueSet = e.detail.value
        this.$emit('change', e.detail.value)
      },
      bindSelectChange (e) {
        this.valueSet = e.detail.value
        this.$emit('change', e.detail.value)
      }
    }
	}
</script>

<style scoped lang="scss">
  .uni-list-cell-db{
		width: 120px;
		text-align: center;
		border: 1px solid #999;
		font-size: 15px;
		color: #3a3a3a;
		padding: 6px;
		border-radius: 5px;
	}
</style>
