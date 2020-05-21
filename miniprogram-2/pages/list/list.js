// pages/list/list.js
const app = getApp()
import request from '../../utils/network.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    series: [],
    leftDistance:0,
    newList:[],
  },

   /*生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showNewbook().then(res=>{
      this.showSeries();
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
      url: '/pages/series/series?id=' + e.currentTarget.dataset.pk + '&name='
        +e.currentTarget.dataset.name + '&src='+e.currentTarget.dataset.src,
    })
  },
  toBook: function (e) {
    wx.navigateTo({
      url: '/pages/recommand/recommand?pk=' + e.currentTarget.dataset.pk,
    })
  },
  showSeries:function(){
    let that =this
    request({
      url: 'http://47.102.216.186/wx/show_all_series/',
      header: {
        "Content-Type": "applciation/json"
      },
      data: {
        series_id: "1"
      },
      method: 'GET'
    }).then(res => {
      var json = JSON.parse(res.data)
      that.setData({
        series: json
      })
      console.log(that.data.series)
    }).catch(err => {
      console.log(err)
    })
  },
  showNewbook:function(){
    let that = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://47.102.216.186/wx/show_one_recommend/',
        header: {
          "Content-Type": "applciation/json"
        },
        data: {
          series_id: "1"
        },
        method: 'GET',
        success: function (res) {
          var json = JSON.parse(res.data)
          that.setData({
            newList: json
          })
          console.log(that.data.newList)
          resolve(res)
        },
        fail: function (err) {
          console.log(err)
          reject(err)
        }
      })
    })  
  }
}) 