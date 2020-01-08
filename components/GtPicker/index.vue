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
    <picker mode="selector" :value="valueSet" :disabled="disabled" :fields="fields" @change="bindDateTimeChange" v-if="mode == 'selector'">
      <view class="uni-input">{{valueSet ? valueSet : placeholder}}</view>
    </picker>
  </view>	
</template>

<script>
	export default {
    name: 'gt-picker',
    props: {
      mode: {
        type: String,
        default: 'selector' // 可选值有 selector 单选择器，multiSelector 多选择器，time 时间选择器， date 日期选择器
      },
      value: {
        type: [String, Number],
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
    model: {
      prop: 'value',
      event: 'change'
    },
    data () {
      return {
        valueSet: ''
      }
    },
    created () {
      this.setData()
    },
    methods: {
      setData () {
        this.valueSet = this.value 
      },
      bindPickerChange () {

      },
      bindDateTimeChange (e) {
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
