// pages/test/test.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pk:'',
    newsList:'',
    check: 0,
    url: 'http://47.102.216.186/wx/media/recommend_url/绕日飞行.epub',
    show_btn: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that =this
    // console.log(app.globalData.classifyid)
    // wx.request({
    //   url: 'http://47.102.216.186/wx/add_exp/',
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: 'POST',
    //   data:{
    //     user_id: app.globalData.classifyid,
    //     num:2
    //   },
    //   success:function(res){
    //     console.log(res)
    //   },
    //   fail:function(err){
    //     console.log(err)
    //   }
    // }),
    // wx.request({
    //   url: 'http://47.102.216.186/wx/add_scores/',
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: 'POST',
    //   data: {
    //     user_id: app.globalData.classifyid,
    //     num: 2
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  preview_img: function () {//图片预览函数
    wx.previewImage({
      current: this.data.newsList, // 当前显示图片的http链接
      urls: this.data.newsList // 需要预览的图片http链接列表
    })
  },
  down_file: function () {
    var _this = this;
    const downloadTask = wx.downloadFile({
      url: 'http://47.102.216.186/wx/media/recommend_url/绕日飞行.epub', 
      filePath: wx.env.USER_DATA_PATH + '/绕日飞行.epub',//自定义文件地址
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res)
        if (res.statusCode === 200) {
          var filePath = res.filePath
          wx.openDocument({//打开
            filePath: filePath,
            success: function (res) { }
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