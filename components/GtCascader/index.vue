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
      <view class="uni-input">{{select_label}}</view>
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
    computed: {
      select_label () {
        if (this.valueSet.length == 0 || this.optionsSet.length == 0) {
          return this.placeholder
        }
        let str = ''
        this.valueSet.forEach ((item, index) => {
          if (this.optionsSet[index][item]) {
            str += this.optionsSet[index][item].label + ','
          }          
        })
        return str.slice(0, -1)
      }
    },
    mixins: [utils],
    model: {
      prop: 'value',
      event: 'change'
    },
    data () {
      return {
        valueSet: [],
        optionsSet: []
      }
    },
    created () {
      this.setMultiOptions()    
    },
    methods: {
      setMultiOptions () {
        let value
        if (this.isArray(this.value)) {
          value = this.value[this.value.length - 1]
        } else {
          value = Number(this.value)
        }
        let calc = this.calcOptions(value)
        this.optionsSet = calc.options 
        this.valueSet = calc.index
      },    
      calcOptions (value) {
        let options = []
        let data = this.deepCopy(this.options) // 递归遍历的data
        let origin_data = this.deepCopy(this.options) // 原始未变动的data
        let had_found = false
        let default_options = [] // 未有匹配项的默认options
        let read_index = [] // 递归遍历的序号数据
        let read_column = 0 // 递归遍历的层级
        let max_column = 0 // 最大层级
        let self = this
        let value_array = [] // 根据级联的某一联选出的对应的数据
        let value_index = [] // picker组件的 传入值 value 每一项的值表示选择了 range 对应项中的第几个（下标从 0 开始）
        
        let calc = function (content, data) {
          if (read_index[read_column] 
              && read_column == 0 
              && read_index[read_column].index > default_options[0].length - 1
            ) {
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
          
          value_array.push(data[found_index].value)
          value_index.push(found_index)

          if (read_index[read_column] == undefined) {
            read_index[read_column] = {
              index: 0,
              childrens: data[found_index].children ? data[found_index].children.length : 0
            } 
          } else {
            if (max_column > 0 && read_column == max_column) {
              read_index[read_column].index++
            } else if (read_column < max_column) {
              if (read_index[read_column].childrens == read_index[read_column + 1].index) {
                read_index[read_column].index++
                read_index[read_column + 1].index = 0
              }
            }
          }
         
          if (data[found_index] && data[found_index].children) {
            data = data[found_index].children
            read_column++
            calc(content, data)
          } else {
            if (default_options.length == 0) { // 默认的options
              default_options = content 
            }
            if (had_found) {              
              options = content
            } else {
              if (read_index[0].index <= default_options[0].length - 1) { // 如果第一级的数据还没全部遍历完 继续遍历
                data = self.deepCopy(origin_data)
                content = []
                max_column = read_column
                read_column = 0
                value_array = []
                value_index = []
                calc(content, data)
              }              
            }
          }
        }
        calc(options, data)
        if (had_found) {
          return {
            options: options,
            value: value_array,
            index: value_index
          }         
        }
        return {
          options: default_options,
          value: value_array,
          index: value_index
        }
      },  
      bindSelectChange (e) {
        this.valueSet = e.detail.value
        let value = []
        this.valueSet.forEach ((item, index) => {
          if (this.optionsSet[index][item]) {
            value.push(this.optionsSet[index][item].value)
          }  
        })
        this.$emit('change', value)
      },
      columnChange (e) {
        let column = e.detail.column // 代表滑动的第几列
        let index = e.detail.value // 代表滑动到了第几列的第几行 并不是对应的value值
        let value = this.optionsSet[column][index].value
        let options = this.calcOptions(value).options
        for (let i = column + 1; i < options.length; i++) {
          this.$set(this.optionsSet, i, options[i])
          // this.$set(this.valueSet, i, 0) // TODO 在选择picker的时候 后级的选项应该归0
        }
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
