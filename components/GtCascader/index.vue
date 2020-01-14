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
      console.log(this.calcOptions(122))      
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
        let had_found = false
        let default_options = []
        let read_index = []
        let read_column = 0
        let max_column = 0
        let self = this
        
        let calc = function (content, data) {      
          if (read_index[read_column] && read_column == 0 && read_index[read_column].index > default_options[0].length - 1) {
            return
          } 
          content.push([])
          let last_index = content.length - 1
          let found_index = read_index[read_column] ? read_index[read_column].index : 0
          data.forEach ((item, index) => {
            if (item.value == value) {
              found_index = index
              had_found = true
            }
            content[last_index].push({
              label: item.label,
              value: item.value
            })
          })

          if (read_index[read_column] == undefined) {
            read_index[read_column] = {
              index: 0,
              childrens: data[found_index].children ? data[found_index].children.length : 0
            } 
          } else {
            // if (read_column > 0 && read_index[read_column].index + 1 == read_index[read_column].childrens) {
            //   read_index[read_column - 1].index = 0
            // }
            if (max_column > 0 && read_column == max_column) {
              read_index[read_column].index++
            }
            
            if (read_column < max_column) {
              if (read_index[read_column].childrens == read_index[read_column + 1].index) {
                read_index[read_column].index++
                read_index[read_column + 1].index = 0
              }
            }
          }
          // console.log(JSON.stringify(read_index))
          if (data[found_index] && data[found_index].children) {
            data = data[found_index].children
            read_column++
            calc(content, data)
          } else {
            if (default_options.length == 0) {
              default_options = content
            }
            if (had_found) {              
              options = content
            } else {
              if (read_index[0].index <= default_options[0].length - 1) {
                data = self.deepCopy(origin_data)
                content = []
                max_column = read_column
                read_column = 0
                calc(content, data)
              }              
            }
          }
        }
        calc(options, data)
        if (!had_found) {
          return default_options
        }
        return options
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
