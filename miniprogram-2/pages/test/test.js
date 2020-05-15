// pages/test/test.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pk:3507,
    newsList:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    console.log(app.globalData.classifyid)
    wx.request({
      url: 'http://47.102.216.186/wx/show_favo/',
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      data: {
        user_id: app.globalData.classifyid,
      },
      success: function (res) {
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
    wx.request({
      url: 'http://47.102.216.186/wx/show_all_series/',
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success:function(res){
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})