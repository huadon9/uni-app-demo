// 上传相关的mixin
import SparkMD5 from 'spark-md5'
import Data from '@/utils/Data'

export default {
	data: function () {  
		return {
      baseUrl: 'localhost',
      chunkSize: 5 * 1024 * 1024,
      chunks: 0,
      currentChunk: 0,
      spark: null
		}
	},
	methods: {
    // 数据请求
    async getData (url, param = {}, method = 'GET') {
      let params = {
        url: url,
        method: method,
        data: param,
        isToken: true
      }
      let result = await Data.getInstance().get(params)
      return result
    },
	  // 0. 响应点击
    async responseChange(file) {
      // 第一步：按照 修改时间+文件名称+最后修改时间-->MD5
      // 显示文件校验进度
      // $("#process1").slideDown(200)
      // 开始校验
      let fileMd5Value = await this.md5File(file)
      // 第二步：校验文件的MD5
      let result = await this.checkFileMD5(file.name, fileMd5Value)
      // 如果文件已存在, 就秒传
      if (result.file) {
          console.log('文件已秒传')
          return
      }
      // let exit = false
      // 显示文件上传进度
      // $("#process2").slideDown(200)
      // 第三步：检查并上传MD5
      await this.checkAndUploadChunk(fileMd5Value, result.chunkList)
      // 第四步: 通知服务器所有分片已上传完成
      this.notifyServer(fileMd5Value)
    },
    // 1.修改时间+文件名称+最后修改时间-->MD5
    md5File(file) {
      let self = this
      return new Promise((resolve, reject) => {
          var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
          // var blobSlice = function (file, start, end) { 
          //   return file.path.slice(start, end)
          // }
              //this.chunkSize = 2097152, // Read in this.chunks of 2MB
              self.chunkSize = file.size / 100,
              //this.chunks = Math.ceil(file.size / this.chunkSize),
              self.chunks = 100,
              self.currentChunk = 0,
              self.spark = new SparkMD5.ArrayBuffer();
              var fileReader = new FileReader();

          fileReader.onload = function (e) {
              console.log('read chunk nr', self.currentChunk + 1, 'of', self.chunks);
              self.spark.append(e.target.result); // Append array buffer
              self.currentChunk++;

              if (self.currentChunk < self.chunks) {
                  loadNext();
              } else {
                  let cur = +(new Date())
                  console.log('finished loading');
                  // alert(this.spark.end() + '---' + (cur - pre)); // Compute hash
                  let result = self.spark.end()
                  resolve(result)
              }
          };

          fileReader.onerror = function () {
              console.warn('oops, something went wrong.');
          };

          function loadNext() {
              var start = self.currentChunk * self.chunkSize,
                  end = ((start + self.chunkSize) >= file.size) ? file.size : start + self.chunkSize;

              fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
              // $("#checkProcessStyle").css({
              //     width: (this.currentChunk + 1) + '%'
              // })
              // $("#checkProcessValue").html((this.currentChunk + 1) + '%')
              // $("#tip").html(this.currentChunk)
          }

          loadNext();
      })
  },
  // 2.校验文件的MD5
  checkFileMD5(fileName, fileMd5Value) {
      return new Promise((resolve, reject) => {
          let url = this.baseUrl + '/check/file?fileName=' + fileName + "&fileMd5Value=" + fileMd5Value
          // $.getJSON(url, function (data) {
          //     resolve(data)
          // })
          let res = this.getData(url)
          resolve(res)
      })
  },
  // 3.上传chunk
  async checkAndUploadChunk(fileMd5Value, chunkList) {
      this.chunks = Math.ceil(fileSize / this.chunkSize)
      hasUploaded = chunkList.length
      for (let i = 0; i < this.chunks; i++) {
          let exit = chunkList.indexOf(i + "") > -1
          // 如果已经存在, 则不用再上传当前块
          if (!exit) {
              let index = await this.upload(i, fileMd5Value, this.chunks)
              hasUploaded++
              // let radio = Math.floor((hasUploaded / this.chunks) * 100)
              // $("#uploadProcessStyle").css({
              //     width: radio + '%'
              // })
              // $("#uploadProcessValue").html(radio + '%')
          }
      }
  },

  // 3-2. 上传chunk
  upload(i, fileMd5Value, chunks) {
      return new Promise((resolve, reject) => {
          //构造一个表单，FormData是HTML5新增的
          let end = (i + 1) * this.chunkSize >= file.size ? file.size : (i + 1) * this.chunkSize
          let form = new FormData()
          form.append("data", file.slice(i * this.chunkSize, end)) //file对象的slice方法用于切出文件的一部分
          form.append("total", chunks) //总片数
          form.append("index", i) //当前是第几片     
          form.append("fileMd5Value", fileMd5Value)
          let url = this.baseUrl + "/upload"
          let res = this.getData(url, form, 'POST')
          resolve(res.data.desc)
          // $.ajax({
          //     url: this.baseUrl + "/upload",
          //     type: "POST",
          //     data: form, //刚刚构建的form数据对象
          //     async: true, //异步
          //     processData: false, //很重要，告诉jquery不要对form进行处理
          //     contentType: false, //很重要，指定为false才能形成正确的Content-Type
          //     success: function (data) {
          //         resolve(data.desc)
          //     }
          // })
      })

  },

  // 第四步: 通知服务器所有分片已上传完成
  notifyServer(fileMd5Value) {
    let url = this.baseUrl + '/merge?md5=' + fileMd5Value + "&fileName=" + file.name + "&size=" + file.size
    let res = this.getData(url)
      // $.getJSON(url, function (data) {
      //     alert('上传成功')
      // })
    }
	}
}