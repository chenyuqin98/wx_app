//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    exp_get:2180,
    exp_need:2500,
    exp_pass:2000,
    percent:0,
    shell:15
  },

  //点击头像
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },

//页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
  onLoad: function (options) {
    this.setData({
      motto: app.globalData.classifyid
    })
    console.log(this.data.motto)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
    this.setData({
      percent: (this.data.exp_get - this.data.exp_pass) / (this.data.exp_need - this.data.exp_pass) * 100
    })
    console.log(this.data.percent)
  },

  //获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /** 去设置 */
  toSetting() {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },

  /** 关于 */
  toAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  /** 我的收藏 */
  toCollect() {
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },

  /** 我喜欢的卡片 */
  toHistory() {
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  toUpload() {
    wx.navigateTo({
      url: '/pages/upload/upload',
    })
  },
})
