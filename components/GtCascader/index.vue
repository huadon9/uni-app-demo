<!--
 @author:
 @date:
 @description: 级联选择组件
-->
<template>
  <view>
    <picker mode="multiSelector" 
      :value="valueSet" 
      :disabled="disabled" 
      :range="optionsSet" 
      range-key="label"  
      @change="bindSelectChange"  
      @columnchange="columnChange">
      <view class="uni-input">122</view>
    </picker>
  </view>	
</template>

<script>
  import utils from '@/mixin/utils'
	export default {
    name: 'gt-cascader',
    props: {
      value: {
        type: Array,
        default: function () {
          return []
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
      }
    },	
    mixins: [utils],
    model: {
      prop: 'value',
      event: 'change'
    },
    computed: {
      
    },
    data () {
      return {
        valueSet: '',
        optionsSet: []
      }
    },
    created () {
      this.setData()
      this.setMultiOptions()
      this.calcOptions(21)
    },
    methods: {
      setData () {
        this.valueSet = this.value 
      },
      setMultiOptions () {
        let options = []
        let data = this.deepCopy(this.options)
        let calc = function (content, data) {
          content.push([])
          let last_index = content.length - 1
          data.forEach (item => {
            content[last_index].push({
              label: item.label,
              value: item.value
            })
          })
          if (data[0].children) {
            data = data[0].children
            calc(options, data)
          }
        }
        calc(options, data)
        this.optionsSet = options 
      },    
      calcOptions (value) {
        let options = []
        let data = this.deepCopy(this.options)
        let origin_data = this.deepCopy(this.options)
        
        let calc = function (content, data) {       
          content.push([])
          let last_index = content.length - 1
          let found_index = 0
          data.forEach ((item, index) => {
            if (item.value == value) {
              found_index = index
            }
            content[last_index].push({
              label: item.label,
              value: item.value
            })
          })
          if (data[found_index].children) {
            data = data[found_index].children
            calc(options, data)
          } else {

          }
        }
        calc(options, data)
        console.log(options)
      },  
      bindSelectChange (e) {
        this.valueSet = e.detail.value
        this.$emit('change', e.detail.value)
      },
      columnChange (e) {
        let column = e.detail.column // 代表滑动的第几列
        let index = e.detail.value // 代表滑动到了第几列的第几行 并不是对应的value值
        let level = this.optionsSet.length
        let value = this.optionsSet[column][index].value
        console.log(value)
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
