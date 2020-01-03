/*
 * @Author: zhou
 * @Date: 2019-12-12
 * @Description: 问题审核列表
 */
import {
  Data
} from './Data'
class ClientApi {
  constructor () {
    this.mode = 'real'
    this.isToken = true
  }
  static getInstance () {
    if (!this.instance) this.instance = new ClientApi()
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
   * @description: 登录 获取token
   * @param {type}
   * @return:
   */
  async Login (param = {}) {
    let url = '/api/basic/user/login'
    let result = await this.getData(url, param, 'POST')
    return result
  }
  /**
   * @description: 获取客户列表
   * @param {type}
   * @return:
   */
  async getClientList (param = {}) {
    let url = '/api/sell/mclient/list'
    let result = await this.getData(url, param)
    return result
  }

}
export {
  ClientApi
}
