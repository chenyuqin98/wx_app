// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    series: [{ id: 1, image:"https://img1.doubanio.com/view/photo/l/public/p2600013009.webp"},
      { id: 2, image: "https://img3.doubanio.com/view/photo/l/public/p2600013011.webp" },
      { id: 3, image: "https://img9.doubanio.com/view/photo/l/public/p2600013006.webp" },
      { id: 4, image: "https://img9.doubanio.com/view/photo/l/public/p2600013004.webp"},
      { id: 5, image: "https://img3.doubanio.com/view/photo/l/public/p2600013003.webp" }],
    leftDistance:0,
  },

   /*生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  onShareAppMessage: function () {

  },
  handleSlide:function(event){
    console.log(event.target.dataset.index)
    this.setData({
      leftDistance: (event.target.dataset.index-1)*(-750)
    })
  },
  handlePrev:function(event){
    var that = this;
    if (this.data.leftDistance == 0) {
      that.setData({
        leftDistance:-2250
      })
      console.log(this.data.leftDistance)
    }else{
      this.setData({
      leftDistance:this.data.leftDistance+750
      }) 
      console.log(this.data.leftDistance)
    }
  },
  handleNext: function (event) {
    var that = this;
    if (this.data.leftDistance == -2250) {
      that.setData({
        leftDistance: 0
      })
      console.log(this.data.leftDistance)
    } else {
      this.setData({
        leftDistance: this.data.leftDistance - 750
      })
      console.log(this.data.leftDistance)
    }
  },
  toSeries:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/series/series?id='+this.data.series[0],
    })
  },
  toBook: function () {
    wx.navigateTo({
      url: '/pages/details/details',
    })
  },
}) 