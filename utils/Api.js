/*
 * @Author: zhou
 * @Date: 2019-12-12
 * @Description: 问题审核列表
 */
import {
  Data
} from './Data'
class Api {
  constructor () {
    this.mode = 'real'
    this.isToken = true
  }
  static getInstance () {
    if (!this.instance) this.instance = new Api()
    return this.instance
  }
  /**
   * @description: 获取数据
   * @param {type}
   * @return:
   */
  async getData (url, param = {}, method = 'GET') {
    let params = {
      url: url,
      method: method,
      data: param,
      isToken: this.isToken,
      mode: this.mode
    }
    let result = await Data.getInstance().get(params)
    return result
  }
  /**
   * @description: 获取打包清单列表
   * @param {type}
   * @return:
   */
  async getPack (param = {}) {
    let url = ''
    let result = await this.getData(url, param)
    return result
  }

}
export {
  Api
}
