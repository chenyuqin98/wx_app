// pages/test/test.js
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
    wx.request({
      url: 'http://47.102.216.186/wx/search_detail/',
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      data: {
        id: that.data.pk
      },
      success: function (res) {
        console.log(res)
        var json = JSON.parse(res.data)
        console.log(json)
        that.setData({
          newsList: json
        })
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