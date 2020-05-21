// pages/recommand/recommand.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pk: '',
    author: '罗伯特.阿尔特',
    title: '七个疯子',
    progress:'',
    cover: 'https://img1.doubanio.com/view/subject/l/public/s33607648.jpg',
    publisher: '四川文艺出版社',
    pubdates: '',
    newsList: '',
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.pk = options.pk
    var that = this
    wx.request({
      url: 'http://47.102.216.186/wx/search_recommend_detail/',
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      data: {
        id: that.data.pk
      },
      success: function (res) {
        var json = JSON.parse(res.data)
        console.log(json)
        that.setData({
          newsList: json,
        })
        console.log(that.data.newsList[0].fields.bookname)
      },
      fail: function (err) {
        console.log('调用失败')
        wx.showToast({
          title: '无法获取终端数据！',
          icon: 'none',
          duration: 2000
        })
      }
    })

  },

  handleCollect: function () {
    console.log(this.data.newsList[0].fields.type)
    console.log(this.data.pk)
    wx.request({
      url: 'http://47.102.216.186/wx/add_favo/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        user_id: app.globalData.classifyid,
        book_id: this.data.pk,
        type: this.data.newsList[0].fields.type
      },
      success: function (res) {
        wx.showToast({
          title: '已收藏',
          icon: 'none',
          duration: 2000,
        })
        console.log(res)
      },
      fail: function (err) {
        console.log('调用失败')
        wx.showToast({
          title: '无法获取终端数据！',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  handleDownload: function (e) {
    console.log(e.currentTarget.dataset)
    let bookUrl = e.currentTarget.dataset.src
    // 下载监听进度
    var _this = this;
    const downloadTask = wx.downloadFile({
      url: bookUrl,
      filePath: wx.env.USER_DATA_PATH + '/' + e.currentTarget.dataset.name,//自定义文件地址
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res)
        if (res.statusCode === 200) {
          var filePath = res.filePath
          wx.openDocument({//打开
            filePath: filePath,
            success: function (res) { 
              console.log("书籍打开成功")
            }
          })
        }
      }
    })
    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      console.log('已经下载的数据长度', res.totalBytesWritten)
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })

  }
})