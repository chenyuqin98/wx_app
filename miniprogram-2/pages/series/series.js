// pages/series/series.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:0,
    scrollViewHeight:0,
    headerHeight:0,
    series:"好望角书系",
    print:"浙江人民出版社",
    info: "打开一扇新窗,世界与你所知不一样。\n 非洲南部“好望角”本名“风暴角”，海浪汹涌，风暴不断。1488年2月，当葡萄牙航海家迪亚士的船队抵达这片海域时，恰风和日丽，船员们惊异地凝望着这个隐藏了许多个世纪的壮美岬角，随船历史学家巴若斯记录了这一时刻：“我们看见的不仅是一个海角，而是一个新的世界！”出版者以“好望角”命名这个书系，就是希望开一扇新窗，和读者们一起阅读一个不一样的世界。"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success:(res)=> {
        console.log(res)
        this.setData({
          windowHeight: res.windowHeight
        });
      }
    });

    // 然后取出series_top的高度
    // 根据文档，先创建一个SelectorQuery对象实例
    let query = wx.createSelectorQuery().in(this);
    // 然后逐个取出series_top的节点信息
    query.select('#header').boundingClientRect();

    // 执行上面所指定的请求，结果会按照顺序存放于一个数组中，在callback的第一个参数中返回
    query.exec((res) => {
      // 取出series_top的高度
      let headerHeight = res[0].height;

      // 然后就是做个减法
      let scrollViewHeight = this.data.windowHeight - headerHeight;

      // 算出来之后存到data对象里面
      this.setData({
        scrollViewHeight: scrollViewHeight
      });
    });
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