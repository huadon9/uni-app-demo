/**
 * @author:POPE
 * @date:2019-05-31
 * @description: 通用类
 */
class Common {
  static getInstance () {
    if (!this.instance) this.instance = new Common()
    return this.instance
  }
  /**
   * @author:POPE
   * @date:2019-06-05
   * @description: 获取DPI
   */
  // eslint-disable-next-line
  conversion_getDPI () {
    let arrDPI = []
    if (window.screen.deviceXDPI) {
      arrDPI[0] = window.screen.deviceXDPI
      arrDPI[1] = window.screen.deviceYDPI
    } else {
      let tmpNode = document.createElement('DIV')
      tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
      document.body.appendChild(tmpNode)
      arrDPI[0] = parseInt(tmpNode.offsetWidth)
      arrDPI[1] = parseInt(tmpNode.offsetHeight)
      tmpNode.parentNode.removeChild(tmpNode)
    }
    return arrDPI
  }
  /**
   * @author:POPE
   * @date:2019-06-05
   * @description: px转换为mm
   */
  tpxConversionMm (value) {
    let inch = value / this.conversion_getDPI()[0]
    let result = inch * 25.4
    return result
  }
  /**
   * @author:POPE
   * @date:2019-06-05
   * @description: mm转换为px
   */
  mmConversionPx (value) {
    let inch = value / 25.4
    let result = inch * this.conversion_getDPI()[0]
    return result
  }
  /**
   * @author:POPE
   * @date:2019-06-05
   * @description: 格式化菜单项
   */
  formatMenuList (data) {
    let result = []
    let root = process.env.VUE_APP_ROOT
    let NODE_ENV = process.env.NODE_ENV
    if (NODE_ENV !== 'development') root = ''
    for (let item of data) {
      item.path = item.path || '/'
      let component = item.component || 'layout/Index.vue'
      item.icon = item.icon || 'el-icon-folder'
      item.leaf = false
      item.component = resolve => require([`components/${component}`], resolve) // 懒加载方式，当路由被访问的时候才加载对应组件
      if (item.children) {
        for (let child of item.children) {
          child.path = child.path || child._url
          let componentChild = child.component
          if (child._type === 'iframe') {
            componentChild = 'views/iframe/IframePage.vue'
            child._url = `${root}${child._url}`
          }
          child.component = resolve => require([`components/${componentChild}`], resolve)
          child.icon = 'el-icon-s-order'
        }
      }
      result.push(item)
    }
    return result
  }
  /**
   * @description: 生成GUID（全球唯一标识）
   * @param {type}
   * @return:
   */
  newGuid () {
    let guid = ''
    for (let i = 1; i <= 32; i++) {
      let n = Math.floor(Math.random() * 16.0).toString(16)
      guid += n
      if (i === 8 || i === 12 || i === 16 || i === 20) guid += '-'
    }
    return guid
  }
  /**
   * @description: 获取随机icon
   * @param {type}
   * @return:
   */
  getRandomIcon () {
    let icons = [
      'el-icon-star-off',
      'el-icon-goods',
      'el-icon-picture-outline',
      'el-icon-folder',
      'el-icon-folder-add',
      'el-icon-folder-checked',
      'el-icon-brush',
      'el-icon-reading',
      'el-icon-coordinate',
      'el-icon-coin',
      'el-icon-wallet',
      'el-icon-link',
      'el-icon-set-up',
      'el-icon-position',
      'el-icon-copy-document',
      'el-icon-map-location'
    ]
    let icon = icons[Math.floor(Math.random() * icons.length)]
    return icon
  }
  /**
   * @description: 对象转url参数
   * @param {type}
   * @return:
   */
  queryParams (data) {
    let _result = []
    for (let key in data) {
      let value = data[key]
      if (value && value.constructor === Array) {
        value.forEach(function (_value) {
          value = encodeURIComponent(value)
          _result.push(key + '=' + _value)
        })
      } else {
        value = encodeURIComponent(value)
        _result.push(key + '=' + value)
      }
    }
    return `?${_result.join('&')}`
  }
  /**
   * @description: 获取本地url上参数
   * @param {type}
   * @return:
   */
  getQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }
  /**
   * @author: POPE
   * @description: 数字转成百分比
   * @param {type}
   * @return:
   */
  toPercent (val) {
    return (Math.round(val * 10000) / 100).toFixed(2) + '%'
  }
  /**
   * @description: 导出文件
   * @param {type}
   * @return:
   */
  exportFile (url, param) {
    let NODE_ENV = process.env.NODE_ENV
    let root = ``
    if (NODE_ENV === 'development') root = process.env.VUE_APP_ROOT
    let src = `${root}${url}${this.queryParams(param)}`
    window.open(src, '_self')
  }
  /**
    * @author: POPE
    * @description: 下载文件
    * @return:
    * @param id
    */
  downloadFile (id) {
    let NODE_ENV = process.env.NODE_ENV
    let host = process.env.VUE_APP_ROOT
    if (NODE_ENV !== 'development') host = ''
    let url = `${host}/base/file/download?fileId=${id}&token=${JSON.parse(sessionStorage.getItem('user_info')).token}`
    window.open(url)
  }
}
export {
  Common
}
